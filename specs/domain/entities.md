<!-- mentor:file
The data model. This file defines what exists in the product — its entities, their fields, their relationships, and the rules that govern them. The AI uses this file to generate database schemas, TypeScript types, API contracts, and validation logic. Incomplete or inconsistent entity definitions cause cascading errors across the entire codebase.
priority: critical
-->

# Domain Entities

## Entity Map

<!-- mentor
A structural diagram showing how entities relate to each other. This should be readable at a glance — parent-child relationships, cardinality (1..1, 1..n, 0..n), and ownership. If the product's data model can't be drawn as a tree or graph in 10 lines, it may be over-complicated for a solo-built v1.

quality signals:
- Every entity in the product is represented in the map
- Cardinality is explicit (0..n not just "many")
- Ownership is clear (who belongs to whom)
-->

```
[User]
└── [Entity] (1..n)
    └── [Entity] (0..n)
```

---

<!-- mentor
For each entity: a table of fields with type, description, and constraints. Include all fields that will exist in the database. Note which fields are required, which have defaults, which are user-editable, and which are system-managed. The quality of this section directly determines the quality of AI-generated code.

quality signals:
- Every field has a type, not just a name
- Required vs optional is marked for each field
- System-managed fields (created_at, updated_at) are listed separately from user-editable fields
- Foreign keys reference the parent entity explicitly
- Any field with a constrained value set lists the allowed values (or references the Glossary status table)
- If the product has soft deletes, the mechanism is documented
-->
