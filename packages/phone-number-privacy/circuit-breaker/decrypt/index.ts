import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { DefaultAzureCredential } from '@azure/identity'
import { KeyClient, CryptographyClient } from '@azure/keyvault-keys'

const KEYVAULT_URI = 'https://victor-dev.vault.azure.net'
const KEYVAULT_KEY_NAME = 'odis-circuit-breaker-protoype0'
const KEYVAULT_ALGORITHM = 'RSA-OAEP-256'

// test value: npl8zAwuglEm3y4CVy4XD0SaI4rCxzdRk88b/WPvPcxmP6PCh1SnMVVY/ATt0DQssDLNpbS4UkNqhZhNo7Go75xLEN1oT4w19PEXyoMnv6VaAhgnmY2l07Ds4yYCyVjObC2bLnhJ8UVfn/aDByD/js0Qx4/6CNUtydGLNI3q+fdt1Jti9z1YfSFUC9RRSVVTZx4UXXpynlIomhCIjOJKgZ1riioXCUIpWmeg5DtWXtxDj6Ut95A1C4NHwIg0nxS3QgVQaM6FI/7cqLNtPk6pTU6oOhWqap1r+a6fOeardw+4M2r3UA+oE84HPmEz5Vie+m+dSoo90y8cUqssdIa4AA==

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Validate request parameters.
  const ciphertext = req.body?.ciphertext
  if (ciphertext === undefined) {
    context.res = {
      status: 400,
      body: 'ciphertext paramater must be provided',
    }
    return
  }

  // Get credentials currently in use. Either developer credentials locally, or managed identity
  // crednetials when running in Azure Functions.
  const credential = new DefaultAzureCredential()

  // Retreive the wrapping key identifier by name from the Key Vault.
  const keyClient = new KeyClient(KEYVAULT_URI, credential)
  const key = await keyClient.getKey(KEYVAULT_KEY_NAME)
  if (key?.id === undefined) {
    console.error(`Failed to get key ${KEYVAULT_KEY_NAME} from ${KEYVAULT_URI}`)
    context.res = {
      status: 500,
    }
    return
  }
  console.log(`Using key id ${key.id} as ${KEYVAULT_KEY_NAME} from ${KEYVAULT_URI}`)

  const cryptoClient = new CryptographyClient(key.id, credential)

  let plaintext: string
  try {
    const { result } = await cryptoClient.decrypt({
      algorithm: KEYVAULT_ALGORITHM,
      ciphertext: Buffer.from(ciphertext, 'base64'),
    })
    plaintext = result.toString()
  } catch (error) {
    console.error(`Failed to decrypt the given ciphertext: ${error}`)
    context.res = {
      status: 500,
    }
    return
  }

  console.log(`Decrypted ciphertext ${ciphertext} to "${plaintext}"`)
  context.res = {
    status: 200,
    body: plaintext,
  }
}

export default httpTrigger
