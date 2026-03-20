<!-- mentor:file
Template for individual user flow spec files. Copy this file and rename it to [flow-name].md when documenting a new flow.
priority: medium
-->

# [Flow Name]

## Trigger

<!-- mentor
What starts this flow?

quality signals:
- Trigger is a specific user action or system event
- Context in which the trigger occurs is described
- Conditional triggers have their conditions stated
-->

## Steps

<!-- mentor
The sequence of steps from trigger to completion.

quality signals:
- Steps alternate between user actions and system responses
- Happy path is complete from start to finish
- Branch points are identified
-->

## Edge cases

<!-- mentor
What happens if the user takes an unexpected path?

quality signals:
- At least 2-3 edge cases are identified
- Each edge case has a defined system behavior
-->

## Empty states

<!-- mentor
What does the user see when a step encounters no data?

quality signals:
- Empty state is defined for every step that fetches data
- Empty state includes what the user sees and the action available
-->

## Error states

<!-- mentor
What does the user see when something fails?

quality signals:
- Every network-dependent step has an error state
- Recovery actions are defined
-->
