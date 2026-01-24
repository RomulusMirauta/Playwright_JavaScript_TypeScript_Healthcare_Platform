<h1 align="center">
Sample Test Automation<br>Playwright + JavaScript/TypeScript + SQL
</h1>


<p align="center">
A sample healthcare test automation project using Playwright for End-to-End, API and multi-browser Compatibility testing, with SQL Server integration.<br>This project demonstrates automated UI and API tests for a healthcare platform with user authentication, role-based access, and management of patients and drugs.
</p>

<br>

<h2 align="left">
Table of Contents
</h2>

I. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Project Overview](#i-project-overview) <br>
II. &nbsp;&nbsp;&nbsp;&nbsp; [Main Features](#ii-main-features) <br>
III. &nbsp;&nbsp;&nbsp; [Prerequisites](#iii-prerequisites) <br>
IV. &nbsp;&nbsp;&nbsp; [Setup](#iv-setup) <br>
V. &nbsp;&nbsp;&nbsp;&nbsp; [Running Tests](#v-running-tests) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; V. a. &nbsp; [Tests directory](#v-a-tests-directory) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; V. b. &nbsp; [Preflight (first run)](#v-b-preflight-first-run) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; V. c. &nbsp; [Test structure (where to put code)](#v-c-test-structure-where-to-put-code) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; V. d. &nbsp; [Artifacts & debugging](#v-d-artifacts--debugging) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; V. e. &nbsp; [Useful npm scripts (add if desired)](#v-e-useful-npm-scripts-add-if-desired) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; V. f. &nbsp;&nbsp; [CI notes](#v-f-ci-notes) <br>
VI. &nbsp;&nbsp;&nbsp;[Notes](#vi-notes) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. a. &nbsp; [Playwright configuration](#vi-a-playwright-configuration-playwrightconfigts) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. b. &nbsp; [Environment variables / secrets](#vi-b-environment-variables--secrets) <br>
VII. &nbsp;&nbsp; [CI Integration](#vii-ci-integration) <br>
VIII. &nbsp; [Main Technologies Used](#viii-main-technologies-used) <br>
IX. &nbsp;&nbsp; [SW Info](#ix-sw-info) <br>
X. &nbsp;&nbsp;&nbsp; [Screenshots](#x-screenshots) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; X. a. &nbsp;[Playwright in Visual Studio Code](#playwright-in-visual-studio-code) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; X. b. &nbsp;[Playwright HTML Report](#playwright-html-report) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; X. c. &nbsp;[GitHub Actions - CI Integration - Workflow Example](#github-actions---ci-integration---workflow-example) <br>

<br>

## I. Project Overview

This repository contains Playwright-based test automation for a sample healthcare platform. The platform includes:

- User authentication (login/logout)
- Role-based dashboards (admin, patients, drugs)
- Patients and drugs management (CRUD)
- Modern, responsive UI
- REST API endpoints for all main entities

The tests cover both UI and API functionality, and include database validation using direct SQL queries.

The Test Object is available here: [SampleTestObject1](https://github.com/RomulusMirauta/SampleTestObject1).

This project was developed as a sample for healthcare platform test automation. It was inspired by full-stack healthcare platform projects and built with the help of GitHub Copilot  (model GPT-4.1).

<br>

## II. Main Features

- **End-to-End Testing:** Automated UI tests for login, dashboard, patients, and drugs pages, simulating real user interactions.
- **API Testing:** Automated tests for all main API endpoints (patients, drugs) to ensure backend reliability.
- **Compatibility Testing:** Tests can be run across multiple browsers and browser engines (Chromium, Firefox, WebKit) for maximum compatibility. Playwright supports running the same tests on different browsers to ensure cross-browser reliability.
- **Database Validation:** Direct SQL Server queries to validate data integrity after UI/API actions.
- **Role-Based Access Checks:** Ensures users only see and interact with features allowed by their role.
- **Parallel Execution:** Playwright can run tests in parallel using multiple workers, significantly speeding up test execution. The number of workers can be configured in `playwright.config.ts` (e.g., `workers: 4`).
- **Modern Test Structure:** Uses Playwright fixtures and page objects for maintainable, scalable tests.
- **CI Integration:** Automated test runs with GitHub Actions.

<br>

## III. Prerequisites

- Node.js (v16+ recommended)
- npm
- Microsoft SQL Server (or compatible)

<br>

## IV. Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Configure your database connection in `tests/utils/db-utils.ts` (update user, password, server, and database as needed).

<br>

## V. Running Tests

- Run all tests (unheaded - default):

  ```sh
  npx playwright test
  ```

- Run all tests (headed - visible browsers):

  ```sh
  npx playwright test --headed
  ```

- Run a specific test file:

  ```sh
  npx playwright test tests/end-to-end/e2e-drugs.spec.ts
  ```

- Run a specific test file in headed mode:

  ```sh
  npx playwright test tests/end-to-end/e2e-drugs.spec.ts --headed
  ```

    - ***OR***

  ```sh
  npx playwright test e2e-drugs.spec.ts --headed
  ```

- Run a single test by test name (title / pattern):

  ```sh
  npx playwright test -g "add, check, and remove drug"
  ```

- Run a single test by line number (runs the test at that file line):

  ```sh
  npx playwright test tests/api/api-drugs.spec.ts:12
  ```

- Debugging & interactive mode:

  ```sh
  npx playwright test --debug
  ```

> Tip: you can also use `test.only(...)` in a spec to run a single test during development.

## V. a. Tests directory

For details about the test structure, fixtures and helper utilities see `tests/README.md`.

### V. b. Preflight (first run)
- Install Playwright browser binaries (required once):

  ```sh
  npx playwright install
  ```

- Ensure the application under test is running at `BASE_URL` (default `http://localhost:3001/`) or set `BASE_URL` env var before running tests.

### V. c. Test structure (where to put code)

- `tests/common/` — shared config and constants (auth, config).
- `tests/fixtures/` — custom Playwright fixtures and test data.
- `tests/page-objects/` — UI page objects (POM classes).
- `tests/services/` — API client helpers (service classes).
- `tests/utils/` — misc helpers (DB query helpers, etc.).

### V. d. Artifacts & debugging

- HTML report: `npx playwright show-report` (the HTML reporter opens after `npx playwright test` if configured).
- Collect trace/screenshot/video on failures using config or CLI flags, e.g. `--trace=on`, inspect traces with Playwright Trace Viewer.

### V. e. Useful npm scripts (add if desired)

```json
{ "test:ui": "npx playwright test && npx playwright show-report",
  "test:headed": "npx playwright test --headed",
  "test:chrome": "npx playwright test --project=chromium",
  "typecheck": "npx tsc --noEmit" }
```

### V. f. CI notes

- Use the `.github/workflows/playwright.yml` example for GitHub Actions. Configure required secrets and pass env vars (DB, test creds) via repository secrets.
- For CI, run `npx playwright install --with-deps` on the job runner before tests.

## VI. Notes

### VI. a. Playwright configuration (`playwright.config.ts`) 

- **Global timeout** — set with `timeout: 30000` (milliseconds). The global config timeout has higher priority than per-test timeouts set inside individual spec files, so configure it carefully when debugging or running long-running tests.
- **Retries** — control with `retries: <n>` to re-run flaky tests automatically.
- **Reporter** — configure reporters (e.g., HTML) via the `reporter` option, e.g. `reporter: [['html', { open: 'always' }]]`.
- **Parallel execution** — control with `workers: <n>` to run tests in parallel across multiple workers.
- **Browsers / projects** — define which browser engines to run using the `projects` array (e.g., `chromium`, `firefox`, `webkit`).

These options are defined in `playwright.config.ts` and affect test runs globally.

- Use `tests/utils/db-utils.ts` to query your SQL database in tests.
- Add more `.spec.ts` files in the `tests/` folder for additional test cases.
- Test data and credentials are for demonstration only. Do not use in production!

### VI. b. Environment variables / secrets

The tests read sensitive values from environment variables. Set these in your shell or CI secrets before running tests.

- DB: `DB_USER`, `DB_PASSWORD`, `DB_SERVER`, `DB_NAME`
- Test credentials: `TEST_ADMIN_USERNAME`, `TEST_ADMIN_PASSWORD`, `TEST_USER_DRUGS_USERNAME`, `TEST_USER_DRUGS_PASSWORD`, `TEST_USER_PATIENTS_USERNAME`, `TEST_USER_PATIENTS_PASSWORD`
- Optional: `BASE_URL`, `PW_WORKERS`

Example (PowerShell):

```powershell
$env:DB_PASSWORD = 'your-db-password';
$env:TEST_ADMIN_PASSWORD = 'your-admin-password';
npx playwright test
```

<br>

## VII. CI Integration

This project includes GitHub Actions integration for automated test runs. See the `.github/workflows/playwright.yml` file for details.

<br>

## VIII. Main Technologies Used

- **Playwright**: Test runner and automation framework for UI, API, and compatibility testing (see all test files in `tests/` and config in `playwright.config.ts`).
- **Node.js**: JavaScript runtime environment for running Playwright tests and scripts (project root, all test execution).
- **TypeScript**: Main language for test code, providing type safety and modern JavaScript features (all `.ts` files in `tests/`).
- **Microsoft SQL Server**: Database used for backend data storage and validation in tests (queried directly in test files like `db-utils.ts` and end-to-end specs).

<br>

## IX. SW Info

- **Platform:** Runs locally on Windows (tested with PowerShell and Node.js)
- **Database:** MS SQL Server, SQL Server 2022 Configuration Manager, SQL Server Management Studio 21, Azure Data Studio
- **Code Editor:** Visual Studio Code
- **Browsers:** Google Chrome (Chromium), Mozilla Firefox (Firefox), Safari (WebKit)

<br>

## X. Screenshots

### X. a. Playwright in Visual Studio Code

![Azure](screenshots/Playwright-VS-Code.png)

### X. b. Playwright HTML Report

![Azure](screenshots/Playwright-HTML-Report.png)

### X. c. GitHub Actions - CI Integration - Workflow Example

![Azure](screenshots/GitHub-Actions.png)
