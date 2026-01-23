# tests/ — structure and conventions

This document explains the purpose of the folders under `tests/` and how to use the shared fixtures.

Folders
- `common/` — shared constants and configuration (e.g., `auth.ts`, `config.ts`).
- `fixtures/` — Playwright fixtures and test-data (e.g., `test-fixtures.ts`). Import `test` from this module to use the shared fixtures.
- `page-objects/` — Page Object Model (POM) classes for UI tests (`LoginPage`, `PatientsPage`, `DrugsPage`).
- `services/` — API client classes (e.g., `DrugsService`, `PatientsService`) used by API specs.
- `utils/` — generic helpers (DB helpers, small utilities).

Fixtures usage
- Import the shared fixtures in a spec instead of the plain Playwright `test`:

```ts
import { test, expect } from '../fixtures/test-fixtures';
```

- Available fixtures include `apiContext`, `loginPage`, `patientsPage`, `drugsPage` (see `test-fixtures.ts`).

Recommendations
- Prefer fixtures for shared setup/teardown and dependency injection.
- Keep secrets and environment-specific values out of source code; use env vars configured in CI or a local `.env` for development (loaded automatically by fixtures when present).
- Use `tests/README.md` as the canonical place to document test-level conventions and any helper utilities you add.
