import { reportASTIncompatibilities } from '@celo/protocol/lib/compatibility/ast-code'
import { reportLayoutIncompatibilities } from '@celo/protocol/lib/compatibility/ast-layout'
import { Categorizer } from '@celo/protocol/lib/compatibility/categorizer'
import { reportLibraryLinkingIncompatibilities } from '@celo/protocol/lib/compatibility/library-linking'
import { ASTDetailedVersionedReport, ASTReports } from '@celo/protocol/lib/compatibility/report'
import { linkedLibraries } from '@celo/protocol/migrationsConfig'

import { validateArtifacts } from '@openzeppelin/truffle-upgrades/dist/validate'
import { ValidationRunData } from '@openzeppelin/upgrades-core'

/**
 * Backward compatibility report, based on both the abstract syntax tree analysis of
 * both the storage layout, and code API.
 */
export class ASTBackwardReport {
  static create = (
    oldArtifactsFolder: string,
    newArtifactsFolder: string,
    oldArtifacts: ValidationRunData,
    newArtifacts: ValidationRunData,
    exclude: RegExp,
    categorizer: Categorizer,
    logFunction: (msg: string) => void
  ): ASTBackwardReport => {
    // Run reports
    logFunction('Running storage report...')
    const storage = reportLayoutIncompatibilities(oldArtifacts, newArtifacts)
    logFunction('Done\n')

    logFunction('Running code report...')
    const code = reportASTIncompatibilities(oldArtifacts, newArtifacts)
    logFunction('Done\n')

    logFunction('Running library linking...')
    const libraryLinking = reportLibraryLinkingIncompatibilities(linkedLibraries, code)
    logFunction('Done\n')

    const fullReports = new ASTReports(code, storage, libraryLinking).excluding(exclude)

    logFunction('Generating backward report...')
    const versionedReport = ASTDetailedVersionedReport.create(
      fullReports,
      newArtifacts,
      categorizer
    )
    logFunction('Done\n')

    return new ASTBackwardReport(
      oldArtifactsFolder,
      newArtifactsFolder,
      exclude.toString(),
      versionedReport
    )
  }

  constructor(
    public readonly oldArtifactsFolder: string,
    public readonly newArtifactsFolder: string,
    public readonly exclude: string,
    public readonly report: ASTDetailedVersionedReport
  ) {}
}

export const instantiateArtifacts = (buildDirectory: string) =>
  validateArtifacts(buildDirectory, './contracts')
