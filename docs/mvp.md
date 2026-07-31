# Minimum Viable Product

## Goal

Validate that owners value a fast, vehicle-specific way to find and understand information about the 2026 Mazda CX-5 Premium Plus.

## MVP experience

The first implementation is a responsive browser prototype. It uses local sample data and supports:

- a garage containing selected vehicles;
- a vehicle detail view;
- a browsable knowledge-topic list;
- a question-detail view with concise guidance and source metadata;
- a settings explorer organized by system and location.

## Initial content

The prototype should contain a small, carefully researched set of high-value questions, including:

- finding the odometer;
- understanding Occupant Comfort;
- configuring driver personalization;
- programming HomeLink without an existing handheld remote;
- understanding differences between apparently identical trims;
- determining the availability or behavior of illuminated sill plates;
- checking for vehicle software updates;
- discovering useful settings that are hidden or poorly explained.

These are backlog topics, not automatically verified claims. Each must be researched for model-year, trim, equipment, market, and software applicability before publication.

## Local-only data

The prototype will use bundled or locally persisted sample data. It may include sample vehicles for Chris and Jenny, but committed source must contain only masked, clearly non-sensitive VIN values.

## Delivery sequence

1. Validate the five-screen experience as a responsive web application.
2. Test the prototype with representative desktop and mobile browser sizes.
3. Research and verify the first publishable CX-5 guidance set.
4. Translate the validated experience into SwiftUI on macOS with Xcode.

## MVP exclusions

- backend services
- authentication and account recovery
- cloud synchronization
- subscriptions, purchases, or paywalls
- AI-generated answers
- photo recognition
- live VIN decoding
- dealer integration
- live recall or TSB feeds
- maintenance-service integrations
- production analytics

## Validation questions

The MVP should help answer:

- Do owners understand the vehicle-specific value immediately?
- Can an owner reach a useful answer faster than with the manual?
- Which question types recur most often?
- Does source visibility increase trust?
- Is browsing by vehicle system more useful than browsing by manual chapter?
- Which capabilities justify a paid product?

## Completion criteria

The MVP is ready for hands-on evaluation when:

- all five initial screens are navigable;
- sample data works entirely offline;
- no full VINs or secrets are committed;
- initial guidance clearly shows applicability and source status;
- web data-model and navigation tests pass;
- the responsive production build succeeds;
- build and test instructions are documented.
