import { AzureFunction, Context, HttpRequest } from '@azure/functions'
import { DefaultAzureCredential } from '@azure/identity'
import { KeyClient, CryptographyClient } from '@azure/keyvault-keys'

const KEYVAULT_URI = 'https://victor-dev.vault.azure.net'
const KEYVAULT_KEY_NAME = 'odis-circuit-breaker-protoype0'
const KEYVAULT_ALGORITHM = 'RSA-OAEP-256'

/* Encryption should be done locally by the client.
const crypto = require('crypto')
const circuitBreakerPublicKey = `
-----BEGIN PUBLIC KEY-----
MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAuvQvJsNGSdcp5Hbm8ifL4gf25R8askxmyhqE6yjJr534PaGLvQ+IaMWQoRfOMVf/+0Np2kwdE+NPLjU1AIkzYLO+brDgYREIqGam3qQMGkaJwSelk+yklS/jwr9LdJD8HC/VsR8dL5mUTebUG5i/fT+t0mKSwqM3Hrq1K0I0zqn2J1L0XMCOX2Iz2PdIiiKmd3Ss5shJxgF7v28yLxWgHsgUALFaqD5+XMK2lu2nABwNxXsXJ+00nvuiwcj4vybTjW7FnOv/cqJFKpkhNlXOivbrfeVJoOcq0ws1rGbOaW60NHfjPV7LMM6Rvz4usHbIz8P6nETZz0UpE2O0k8sT/QIDAQAB
-----END PUBLIC KEY-----`
const ciphertext = crypto.publicEncrypt(
  {
    key: circuitBreakerPublicKey,
    oaepHash: 'sha256',
    encoding: 'pem'
  },
  Buffer.from("Hello, circuit breaker")
)
const encoded = ciphertext.toString('base64')
*/

const httpTrigger: AzureFunction = async function (
  context: Context,
  req: HttpRequest
): Promise<void> {
  // Validate request parameters.
  const ciphertext = req.body?.ciphertext
  if (ciphertext === undefined) {
    context.res = {
      status: 400,
      body: JSON.stringify({
        error: 'ciphertext paramater must be provided',
      }),
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
      body: JSON.stringify({
        error: 'could not locate circuit-breaker key',
      }),
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
      body: JSON.stringify({
        error: 'failed to decrypt the given ciphertext',
      }),
    }
    return
  }

  console.log(`Decrypted ciphertext ${ciphertext} to "${plaintext}"`)
  context.res = {
    status: 200,
    body: JSON.stringify({ plaintext }),
  }
}

export default httpTrigger
