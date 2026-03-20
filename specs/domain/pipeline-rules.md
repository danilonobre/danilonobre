<!-- mentor:file
The rules governing the AI pipeline — if the product has one. This file defines input format, system prompt, output format, parsing logic, and failure behavior. It is the contract between the product and the AI model. An incomplete pipeline spec causes the AI to make assumptions about prompt engineering and output parsing that may never be revisited.
priority: high
-->

# Pipeline Rules

<!-- Only include this file if the product has an AI pipeline -->

## Overview

<!-- mentor
Describe the pipeline flow from user input to structured output. What triggers the pipeline? What does it receive? What does it produce? How long does it take? What does the user see while it runs? This should be a 5-10 sentence summary that makes the rest of this file coherent.

quality signals:
- Trigger is explicit (user action, schedule, system event)
- Input and output types are described (not just "text in, text out")
- Latency expectations are noted (affects UX decisions)
- Concurrency behavior is described (one at a time? parallel? queued?)
-->

---

## Input Rules

<!-- mentor
What does the pipeline receive as input? What are the constraints, validations, and edge cases? If the input comes from user text, what happens with empty input, very long input, or input in an unexpected language? This section prevents silent failures.

quality signals:
- Input format is fully specified (type, shape, max length)
- Edge cases are listed with their handling
- Validation that happens before the API call is described
- What the user sees during invalid input is described
-->

---

## System Prompt

<!-- mentor
The exact AI instructions, or a link to the file where they live. If the prompt is dynamic (includes context from the product's data), the template and variable injection logic must be documented here. A vague prompt spec leads to inconsistent output that the product can't reliably parse.

quality signals:
- The system prompt is either written out or the file path is referenced
- Output format is specified in the prompt (JSON, markdown, specific structure)
- Any chain-of-thought or reasoning instructions are included
- Examples of good and bad output are included if the format is complex
-->

---

## Output Rules

<!-- mentor
How is the AI's response parsed, validated, and saved? What happens if the response is malformed? What is the retry strategy? This section is where most AI pipeline bugs originate — insufficient output validation causes bad data to silently enter the system.

quality signals:
- Parsing logic is described at the field level, not just "parse the JSON"
- Validation rules for each output field are listed
- What constitutes a valid vs invalid response is explicit
- The save strategy is described (optimistic? after validation? after user confirmation?)
-->

---

## Failure Handling

<!-- mentor
Every way the pipeline can fail, and what happens in each case. Network errors, rate limits, malformed output, timeout, empty response — each failure mode must have a defined behavior. "Show an error" is not sufficient — what error, where, with what recovery action?

quality signals:
- All failure modes are listed (at least: network error, timeout, malformed output, empty output, rate limit)
- Each failure has a user-facing behavior described
- Retry logic is specified where applicable
- Whether failures are logged is noted
-->

| Failure type | Behavior |
|-------------|----------|
| | |
