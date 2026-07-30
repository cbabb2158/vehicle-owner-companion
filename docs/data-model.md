# Conceptual Data Model

This is a product-level model, not a final persistence schema. The first implementation should remain simple and local while preserving clear boundaries between vehicle identity, applicability, content, procedures, settings, and sources.

## VehicleIdentity

- `id`
- `ownerDisplayName`
- `year`
- `make`
- `model`
- `trim`
- `market`
- `maskedVIN`
- `nickname`

Do not store full VINs in committed sample data.

## VehicleConfiguration

- `vehicleID`
- `drivetrain`
- `packageCodes`
- `installedFeatureIDs`
- `accessoryIDs`
- `softwareVersions`
- `configurationConfidence`

Configuration may eventually be derived from a VIN, build data, owner confirmation, or observed equipment. Preserve the provenance and confidence of each value.

## KnowledgeTopic

- `id`
- `title`
- `summary`
- `system`
- `sortOrder`

## Question

- `id`
- `topicID`
- `title`
- `searchTerms`
- `shortAnswer`
- `applicabilityRuleID`
- `procedureID`
- `warningIDs`
- `sourceReferenceIDs`
- `verificationStatus`
- `lastReviewedAt`

## ApplicabilityRule

- `id`
- `makes`
- `models`
- `modelYears`
- `trims`
- `markets`
- `requiredFeatures`
- `excludedFeatures`
- `softwareConstraints`
- `notes`

The initial dataset may use direct CX-5 applicability. Avoid building a general rules engine until real content demonstrates the need.

## Procedure

- `id`
- `title`
- `prerequisites`
- `steps`
- `branchConditions`
- `completionCheck`
- `warningIDs`

## ProcedureStep

- `id`
- `sequence`
- `instruction`
- `controlReference`
- `expectedResult`
- `mediaReference`

## VehicleSetting

- `id`
- `name`
- `plainLanguageName`
- `description`
- `system`
- `locationPath`
- `defaultValue`
- `availableValues`
- `dependencies`
- `profileBehavior`
- `applicabilityRuleID`
- `sourceReferenceIDs`

## SourceReference

- `id`
- `sourceType`
- `publisher`
- `title`
- `modelYear`
- `market`
- `publicationDate`
- `version`
- `section`
- `page`
- `url`
- `retrievedAt`
- `notes`

Potential source types include owner manual, navigation or infotainment manual, accessory instructions, official service information, recall notice, TSB, regulatory record, and verified vehicle observation.

## VerificationStatus

Suggested initial values:

- `researchBacklog`
- `sourceLocated`
- `partiallyVerified`
- `verified`
- `superseded`

## Future entities

Add only when their corresponding product capability is scheduled:

- maintenance records and schedules;
- recalls and TSB applicability;
- software-release records;
- photo observations and control identifications;
- answer conversations and citations;
- user accounts and synchronization metadata.

## Design constraints

- A question is reusable only when its applicability is explicit.
- Sources are separate records so one source can support multiple answers.
- Content must retain verification status and review date.
- Owner-specific data must remain separate from shared vehicle knowledge.
- Manufacturer expansion should add data, not require rewriting CX-5 content.
