<!-- mentor:file
The AI integration architecture. Defines which models are used, how AI calls are made, and the rules governing AI usage.
priority: high
-->

# AI Architecture

<!-- Only include this file if the product has AI features -->

## Model

<!-- mentor
Which AI model(s) the product uses and for what purpose.

quality signals:
- Model name is exact
- The purpose of each model is stated
- Reasoning for model choice is noted
-->

## Integration

<!-- mentor
How AI calls are made in the product.

quality signals:
- The integration pathway is described end-to-end
- It is explicit that API keys never touch the client
- Response handling is described
-->

## Rules

<!-- mentor
AI-specific constraints that govern all AI usage in the product.

quality signals:
- API key security is stated as an absolute rule
- Cost controls are documented
- Retry and fallback behavior is described
-->

- API key must never be exposed to the client.
