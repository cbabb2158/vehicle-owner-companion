# AGENTS.md

## Project identity

Vehicle Owner Companion is a personal commercial project owned by GitHub user `cbabb2158`.

It is completely separate from Optimal Pipeline Solutions. Do not use or reference any company:

- repositories or source code;
- accounts, credentials, tokens, or services;
- branding, logos, templates, or design systems;
- databases, infrastructure, internal documentation, or intellectual property;
- email addresses or Git identities.

Use repository-local Git configuration. Do not change the user's global Git configuration.

## Working directory

All project files belong inside this repository.

Planning documents belong in `Plans/`.

Do not create project files in unrelated personal, company, or global configuration directories.

## Current scope

The first supported vehicle is the 2026 Mazda CX-5 Premium Plus.

Until explicitly requested:

- do not add a backend;
- do not add authentication or user accounts;
- do not add subscriptions or payment processing;
- do not add AI or external model integrations;
- do not add analytics or tracking;
- do not scaffold placeholder application frameworks.

## Development rules

- Make the smallest change that satisfies the current task.
- Do not add dependencies without approval.
- Keep vehicle content separate from presentation and application logic.
- Do not commit full VINs, credentials, secrets, personal addresses, or other sensitive data.
- Use masked VINs and clearly fictional sample identifiers.
- Preserve a future path to multiple makes and models without over-engineering the CX-5 implementation.
- Prefer accessible, plain-language guidance over automotive jargon.

## Vehicle-content rules

- Verify procedures and feature claims against authoritative sources before treating them as confirmed.
- Record the source, publication date or version, applicable model year, trim, market, and page or section when available.
- Clearly distinguish verified facts, reasonable inferences, and unresolved research questions.
- Never invent safety instructions, maintenance intervals, recall status, TSB applicability, or software-update procedures.
- Safety-critical guidance must retain the manufacturer's warnings and limitations.

## Git workflow

- Use `main` as the primary branch.
- Keep commits focused and use clear imperative commit messages.
- Review staged changes before every commit.
- Do not force-push or rewrite shared history without explicit approval.
- Confirm the repository owner is `cbabb2158` before pushing.

## Mobile application

The planned client is an iPhone application using SwiftUI. SwiftData may be used where it provides a clear benefit.

When mobile development begins:

- document the required Xcode and iOS versions;
- keep initial data local;
- add tests for pure data-model logic and important navigation behavior;
- run builds and tests on macOS with Xcode before declaring mobile work complete.
