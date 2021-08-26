import { sleep } from '@celo/base'
import { createBucketIfNotExists, createClient } from 'src/lib/cloud-storage'
import { execCmd, execCmdWithExitOnFailure } from 'src/lib/cmd-utils'
import { outputIncludes } from './utils'

export enum DataflowTemplate {
  Cloud_PubSub_to_GCS_Text = 'Cloud_PubSub_to_GCS_Text',
}

// To simplify some things all dataflow jobs will be created in us-central1
// This also helps with some limitations on BigQuery external tables:
// https://cloud.google.com/bigquery/docs/external-tables#external_table_limitations
// Which allow buckets that are only in us-central1
const REGION = 'us-central1'

export interface BaseDataflowJobConfig {
  template: DataflowTemplate
  bucketName: string
}

export interface PubSubToGCSTextConfig extends BaseDataflowJobConfig {
  template: DataflowTemplate.Cloud_PubSub_to_GCS_Text
  topicId: string
  projectId: string
}

interface JobDetails {
  creationTime: string
  id: string
  location: string
  name: string
  state: string
  stateTime: string
  type: string
}

// If the need for other job types show up we can have a union here
export type DataflowJobConfig = PubSubToGCSTextConfig

export async function createDataflowJobIfNotExists(jobName: string, config: DataflowJobConfig) {
  const jobExists = await outputIncludes(
    `gcloud dataflow jobs list | grep Running`,
    jobName,
    `Dataflow job exists, skipping crate`
  )
  if (!jobExists) {
    console.info('Creating Dataflow job')
    await createDataflowJob(jobName, config)
  }
}

export async function getDataflowJobDetails(jobName: string): Promise<JobDetails> {
  const [output] = await execCmd(`gcloud dataflow jobs list --format json --region ${REGION}`)

  const jobList = JSON.parse(output)
  const job = jobList.find((j: any) => j.name === jobName)
  if (job === undefined) {
    throw new Error(`Could not find ${jobName} in jobs list`)
  }

  // XXX: This will break when the command output format changes
  return job as JobDetails
}

export async function waitForDataflowJobToBeRunning(jobName: string) {
  let steps = 0
  while ((await getDataflowJobDetails(jobName)).state !== 'Running') {
    await sleep(500)
    steps += 1
    if (steps > 100) {
      throw new Error(`Timeout waiting for dataflow job ${jobName} to be in Running state (50s)`)
    }
  }
}

function stagingLocation(config: DataflowJobConfig): string {
  return `gs://${config.bucketName}/temp`
}

async function createDataflowJob(jobName: string, config: DataflowJobConfig) {
  const storageClient = createClient()
  await createBucketIfNotExists(storageClient, config.bucketName, REGION)

  await execCmdWithExitOnFailure(
    `gcloud dataflow jobs run ${jobName} \
    --gcs-location gs://dataflow-templates/latest/${config.template} \
    --region ${REGION} \
    --staging-location ${stagingLocation(config)} \
    --parameters ${parametersForJob(jobName, config)}`
  )
}

export async function cancelDataFlowJob(jobName: string) {
  const job = await getDataflowJobDetails(jobName)
  await execCmdWithExitOnFailure(`gcloud dataflow jobs cancel ${job.id}`)
}

function parametersForJob(jobName: string, config: DataflowJobConfig) {
  if (config.template === DataflowTemplate.Cloud_PubSub_to_GCS_Text) {
    return [
      `inputTopic=projects/${config.projectId}/topics/${config.topicId}`,
      `outputDirectory=gs://${config.bucketName}/${jobName}`,
      `outputFilenamePrefix=output-`,
      `outputFilenameSuffix=.txt`,
    ].join(',')
  } else {
    throw new Error(`parametersForConfig not implemented for ${config.template}`)
  }
}
