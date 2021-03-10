import {
  ContractValidation,
  getStorageLayout,
  ValidationRunData,
} from '@openzeppelin/upgrades-core'
import { StorageLayoutComparator } from '@openzeppelin/upgrades-core/dist/storage/compare'
import { getDetailedLayout } from '@openzeppelin/upgrades-core/dist/storage/layout'

export const getLayout = (artifact: ContractValidation, artifacts: ValidationRunData) =>
  getDetailedLayout(getStorageLayout(artifacts, artifact.version))

export interface ASTStorageCompatibilityReport {
  contract: string
  compatible: boolean
  errors: string
}

export const generateCompatibilityReport = (
  contractName: string,
  oldArtifact: ContractValidation,
  oldArtifacts: ValidationRunData,
  newArtifact: ContractValidation,
  newArtifacts: ValidationRunData
): ASTStorageCompatibilityReport => {
  const oldLayout = getLayout(oldArtifact, oldArtifacts)
  const newLayout = getLayout(newArtifact, newArtifacts)
  const comparator = new StorageLayoutComparator()
  const diff = comparator.compareLayouts(oldLayout, newLayout)
  return {
    contract: contractName,
    compatible: diff.pass,
    errors: diff.explain(),
  }
}

export const reportLayoutIncompatibilities = (
  oldArtifacts: ValidationRunData,
  newArtifacts: ValidationRunData
): ASTStorageCompatibilityReport[] => {
  return Object.entries(newArtifacts).map(([newArtifactName, newArtifact]) => {
    const oldArtifact = oldArtifacts[newArtifactName]
    if (oldArtifact !== undefined) {
      return generateCompatibilityReport(
        newArtifactName,
        oldArtifact,
        oldArtifacts,
        newArtifact,
        newArtifacts
      )
    } else {
      // Generate an empty report for new contracts, which are, by definition, backwards
      // compatible.
      return {
        contract: newArtifactName,
        compatible: true,
        errors: '',
      }
    }
  })
}
