<!-- mentor:file
The database architecture spec. Defines the database platform, schema conventions, access patterns, and security rules.
priority: high
-->

# Database Architecture

<!-- Only include this file if the product has a database -->

## Platform

<!-- mentor
The database platform and any relevant configuration.

quality signals:
- Platform name is exact
- Region or hosting configuration is noted
- Any platform-specific features in use are listed
-->

## Schema conventions

<!-- mentor
How the database schema is organized: naming conventions, primary key strategy, timestamp conventions.

quality signals:
- Table naming convention is stated
- Primary key type is specified
- All tables have created_at/updated_at or the absence is explained
- Soft delete approach is described if applicable
-->

## Access patterns

<!-- mentor
How the application reads and writes to the database.

quality signals:
- Client vs server access is explicitly defined
- RLS policy approach is described if using Supabase or similar
-->

## Rules

<!-- mentor
Database-specific constraints and conventions.

quality signals:
- RLS policy requirement is stated as a rule
- Migration approach is described
- Any query performance rules are stated
-->
