import PubSub from '@google-cloud/pubsub'
import { execCmdWithExitOnFailure } from './cmd-utils'
import { outputIncludes, switchToGCPProject, switchToProjectFromEnv } from './utils'

export const createClient = (credentials?: any) => {
  // @ts-ignore-next-line
  return new PubSub.v1.SubscriberClient({ credentials })
}

export const buildSubscriptionName = (envName: string, purpose: string) => {
  return `${envName}-${purpose}`
}

export const createTopicIfNotExists = async (topic: string, projectID?: string) => {
  if (projectID !== undefined) {
    await switchToGCPProject(projectID)
  } else {
    await switchToProjectFromEnv()
  }

  const topicExists = await outputIncludes(
    `gcloud pubsub topics list`,
    topic,
    `GCP PubSub topic ${topic} exists, skipping creation`
  )

  if (!topicExists) {
    await execCmdWithExitOnFailure(`gcloud pubsub topics create ${topic}`)
  }

  return !topicExists
}

export const deleteTopic = async (topic: string, projectID?: string) => {
  if (projectID !== undefined) {
    await switchToGCPProject(projectID)
  } else {
    await switchToProjectFromEnv()
  }

  await execCmdWithExitOnFailure(`gcloud pubsub topics delete ${topic}`)
}

export const allowServiceAccountToPublishToTopic = async (
  topic: string,
  serviceAccountEmail: string
) => {
  await execCmdWithExitOnFailure(
    `gcloud pubsub topics add-iam-policy-binding \
      --member=serviceAccount:${serviceAccountEmail} \
      --role=roles/pubsub.publisher \
      ${topic}`
  )
}

export const createSubscription = async (
  client: any,
  projectID: string,
  topic: string,
  subscriptionName: string
) => {
  const formattedName = client.subscriptionPath(projectID, subscriptionName)
  const formattedTopic = client.topicPath(projectID, topic)

  const request = {
    name: formattedName,
    topic: formattedTopic,
  }
  const [subscriptionInfo] = await client.createSubscription(request)

  return subscriptionInfo
}

export const deleteSubscription = async (
  client: any,
  projectID: string,
  subscriptionName: string
) => {
  const formattedName = client.subscriptionPath(projectID, subscriptionName)

  await client.deleteSubscription({ subscription: formattedName })

  return true
}

export const createStreamingPull = (
  client: any,
  projectID: string,
  subscriptionName: string,
  // tslint:disable-next-line: ban-types
  handler: Function
) => {
  const stream = client.streamingPull().on('data', handler)
  const formattedName = client.subscriptionPath(projectID, subscriptionName)
  const request = {
    subscription: formattedName,
    streamAckDeadlineSeconds: 10,
  }
  stream.write(request)
}
