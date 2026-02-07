<h1 align="center">
Sample Test Automation<br>Playwright + JavaScript/TypeScript + SQL
</h1>

<br>

<p align="center"><i>
A sample healthcare test automation project using Playwright for End-to-End, API and multi-browser Compatibility testing, with SQL Server integration.<br><br>
This project demonstrates automated UI and API tests for a healthcare platform with user authentication, role-based access, and management of patients and drugs.
</i></p>

<br>

<h2 align="left">
Table of Contents
</h2>

I. &nbsp;&nbsp;&nbsp;&nbsp;&nbsp; [Demos](#i-demos) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I. a. &nbsp; [Automated Tests - Playwright](#i-a-automated-tests---playwright) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; I. b. &nbsp; [Visual Studio Code - UI & CLI](#i-b-visual-studio-code---ui--cli) <br>
II. &nbsp;&nbsp;&nbsp;&nbsp; [Project Overview](#ii-project-overview) <br>
III. &nbsp;&nbsp;&nbsp; [Main Features](#iii-main-features) <br>
IV. &nbsp;&nbsp;&nbsp; [Prerequisites](#iv-prerequisites) <br>
V. &nbsp;&nbsp;&nbsp;&nbsp; [Setup](#v-setup) <br>
VI. &nbsp;&nbsp;&nbsp; [Running Tests](#vi-running-tests) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. a. &nbsp; [Tests directory](#vi-a-tests-directory) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. b. &nbsp; [Preflight (first run)](#vi-b-preflight-first-run) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. c. &nbsp; [Test structure](#vi-c-test-structure-where-to-insert-the-code) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. d. &nbsp; [Artifacts & debugging](#vi-d-artifacts--debugging) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. e. &nbsp; [Useful npm scripts](#vi-e-useful-npm-scripts-add-if-desired) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VI. f. &nbsp;&nbsp; [CI Info](#vi-f-ci-notes) <br>
VII. &nbsp;&nbsp; [Notes](#vii-notes) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VII. a. &nbsp; [Playwright configuration](#vii-a-playwright-configuration-playwrightconfigts) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; VII. b. &nbsp; [Environment variables / secrets](#vii-b-environment-variables--secrets) <br>
VIII. &nbsp; [CI Integration](#viii-ci-integration) <br>
IX. &nbsp;&nbsp;&nbsp; [Main Technologies Used](#ix-main-technologies-used) <br>
X. &nbsp;&nbsp;&nbsp;&nbsp; [SW Info](#x-sw-info) <br>
XI. &nbsp;&nbsp;&nbsp; [Screenshots](#xi-screenshots) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; XI. a. &nbsp;[Playwright in Visual Studio Code](#xi-a-playwright-in-visual-studio-code) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; XI. b. &nbsp;[Playwright HTML Report](#xi-b-playwright-html-report) <br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; XI. c. &nbsp;[GitHub Actions - CI Integration - Workflow Example](#xi-c-github-actions---ci-integration---workflow-example) <br>

<br>

## I. Demos

Demo recordings of Playwright test runs can be found in the `media/demos/` folder.

- These demos showcase:
  - Test execution with UI visibility (headed mode)
  - Delayed actions for clear step-by-step visibility
  - Example flows for login, CRUD operations, and role-based access

> Tip: You can record your own demos by running tests in headed mode with slow motion enabled (see the Playwright config and [README instructions](#how-to-enable-slow-motion)).


<br>


### I. a. Automated Tests - Playwright

#### ***Test execution using Playwright Test Runner in headed mode, slowed down for clear visibility of test execution steps - 19 tests, on Chromium, using only 1 worker to show sequential (serial) execution (meaning no parallel execution)*** <br>
![DemoPlaywrightChromiumSlow_orig.gif](media/demos/DemoPlaywrightChromiumSlow_orig.gif) <br><br>


#### ***Headed Testing, showcasing the tremendous speed of test execution - 19 tests, on Chromium, with 12 workers (parallel execution)*** <br>
![DemoPlaywrightChromiumFast_orig.gif](media/demos/DemoPlaywrightChromiumFast_orig.gif) <br><br>


#### ***Running tests using Playwright Test Runner in headed mode, showcasing the tremendous speed of test execution - 57 tests, on Chromium, Firefox and Webkit, with 12 workers (parallel execution)*** <br>
![DemoPlaywrightChromiumFirefoxWebkitFast_orig.gif](media/demos/DemoPlaywrightChromiumFirefoxWebkitFast_orig.gif) <br><br>


### I. b. Visual Studio Code - UI & CLI

#### ***Visual Studio Code - UI & CLI - Behind-logic example, structure and running tests from the CLI*** <br>
![DemoVSCodeChromiumFirefoxWebkitFast_orig.gif](media/demos/DemoVSCodeChromiumFirefoxWebkitFast_orig.gif) <br><br>



## II. Project Overview

This repository contains Playwright-based test automation for a sample healthcare platform. The platform includes:

- User authentication (login/logout)
- Role-based dashboards (admin, patients, drugs)
- Patients and drugs management (CRUD)
- Modern, responsive UI
- REST API endpoints for all main entities

The tests cover both UI and API functionality, and include database validation using direct SQL queries.

The Test Object is available here: [Healthcare_Platform_SampleTestObject1](https://github.com/RomulusMirauta/Healthcare_Platform_SampleTestObject1).

This project was developed as a sample for healthcare platform test automation. It was inspired by full-stack healthcare platform projects and built with the help of GitHub Copilot  (model GPT-4.1).

<br>

## III. Main Features

- **End-to-End Testing:** Automated UI tests for login, dashboard, patients, and drugs pages, simulating real user interactions.
- **API Testing:** Automated tests for all main API endpoints (patients, drugs) to ensure backend reliability.
- **Compatibility Testing:** Tests can be run across multiple browsers and browser engines (Chromium, Firefox, WebKit) for maximum compatibility. Playwright supports running the same tests on different browsers to ensure cross-browser reliability.
- **Database Validation:** Direct SQL Server queries to validate data integrity after UI/API actions.
- **Role-Based Access Checks:** Ensures users only see and interact with features allowed by their role.
- **Parallel Execution:** Playwright can run tests in parallel using multiple workers, significantly speeding up test execution. The number of workers can be configured in `playwright.config.ts` (e.g., `workers: 4`).
- **Modern Test Structure:** Uses Playwright fixtures and page objects for maintainable, scalable tests.
- **CI Integration:** Automated test runs with GitHub Actions.

<br>

## IV. Prerequisites

- Node.js (v16+ recommended)
- npm
- Microsoft SQL Server (or compatible)

<br>

## V. Setup

1. Install dependencies:

   ```sh
   npm install
   ```

2. Configure your database connection in `tests/utils/db-utils.ts` (update user, password, server, and database as needed).

<br>

## VI. Running Tests

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

## VI. a. Tests directory

For details about the test structure, fixtures and helper utilities see `tests/README.md`.

### VI. b. Preflight (first run)
- Install Playwright browser binaries (required once):

  ```sh
  npx playwright install
  ```

- Ensure the application under test is running at `BASE_URL` (default `http://localhost:3001/`) or set `BASE_URL` env var before running tests.

### VI. c. Test structure (where to insert the code)

- `tests/common/` — shared config and constants (auth, config).
- `tests/fixtures/` — custom Playwright fixtures and test data.
- `tests/page-objects/` — UI page objects (POM classes).
- `tests/services/` — API client helpers (service classes).
- `tests/utils/` — misc helpers (DB query helpers, etc.).

### VI. d. Artifacts & debugging

- HTML report: `npx playwright show-report` (the HTML reporter opens after `npx playwright test` if configured).
- Collect trace/screenshot/video on failures using config or CLI flags, e.g. `--trace=on`, inspect traces with Playwright Trace Viewer.

### VI. e. Useful npm scripts (add if desired)

```json
{ "test:ui": "npx playwright test && npx playwright show-report",
  "test:headed": "npx playwright test --headed",
  "test:chrome": "npx playwright test --project=chromium",
  "typecheck": "npx tsc --noEmit" }
```

### VI. f. CI Info

- Use the `.github/workflows/playwright.yml` example for GitHub Actions. Configure required secrets and pass env vars (DB, test creds) via repository secrets.
- For CI, run `npx playwright install --with-deps` on the job runner before tests.

## VII. Notes

### VII. a. Playwright configuration (`playwright.config.ts`) 

- **Global timeout** — set with `timeout: 30000` (milliseconds). The global config timeout has higher priority than per-test timeouts set inside individual spec files, so configure it carefully when debugging or running long-running tests.
- **Retries** — control with `retries: <n>` to re-run flaky tests automatically.
- **Reporter** — configure reporters (e.g., HTML) via the `reporter` option, e.g. `reporter: [['html', { open: 'always' }]]`.
- **Parallel execution** — control with `workers: <n>` to run tests in parallel across multiple workers.
- **Browsers / projects** — define which browser engines to run using the `projects` array (e.g., `chromium`, `firefox`, `webkit`).

These options are defined in `playwright.config.ts` and affect test runs globally.

- Use `tests/utils/db-utils.ts` to query your SQL database in tests.
- Add more `.spec.ts` files in the `tests/` folder for additional test cases.
- Test data and credentials are for demonstration only. Do not use in production!

#### How to enable slow motion

- Edit `playwright.config.ts` and add a `slowMo` value to the `use.launchOptions` block (milliseconds). Example:

```typescript
use: {
  viewport: null,
  launchOptions: {
    args: ['--start-maximized'],
    slowMo: 500, // slow actions by 500ms for demo recording
  },
},
```

- Run tests in headed mode to see the browser UI and the slowed actions - *default command*:

```bash
npx playwright test --headed
```

- Notes:
  - `slowMo` delays Playwright's automation actions (clicks, navigation, typing), making recordings clearer.
  - For one-off pauses inside tests use `await page.waitForTimeout(ms)`.

### VII. b. Environment variables / secrets

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

## VIII. CI Integration

This project includes GitHub Actions integration for automated test runs. See the `.github/workflows/playwright.yml` file for details.

<br>

## IX. Main Technologies Used

- **Playwright**: Test runner and automation framework for UI, API, and compatibility testing (see all test files in `tests/` and config in `playwright.config.ts`).
- **Node.js**: JavaScript runtime environment for running Playwright tests and scripts (project root, all test execution).
- **TypeScript**: Main language for test code, providing type safety and modern JavaScript features (all `.ts` files in `tests/`).
- **Microsoft SQL Server**: Database used for backend data storage and validation in tests (queried directly in test files like `db-utils.ts` and end-to-end specs).

<br>

## X. SW Info

- **Platform:** Runs locally on Windows (tested with PowerShell and Node.js)
- **Database:** MS SQL Server, SQL Server 2022 Configuration Manager, SQL Server Management Studio 21, Azure Data Studio
- **Code Editor:** Visual Studio Code
- **Browsers:** Google Chrome (Chromium), Mozilla Firefox (Firefox), Safari (WebKit)

<br>

## XI. Screenshots

### XI. a. Playwright in Visual Studio Code

![Azure](media/screenshots/Playwright-VS-Code.png)

### XI. b. Playwright HTML Report
![Azure](media/screenshots/Playwright-HTML-Report.png)

### XI. c. GitHub Actions - CI Integration - Workflow Example

![Azure](media/screenshots/GitHub-Actions.png)
