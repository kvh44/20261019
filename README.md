# React demo + TypeScript Playwright tests

The demo is a React application written in TypeScript (TSX), served by Vite. Browser tests remain in TypeScript.

Requires Node.js 24 with npm. Open this folder in VS Code and install the recommended Playwright extension.

## Setup

```powershell
npm install
npm run browsers
npm run typecheck
npm test
```

Keep package-lock.json in Git. After the initial install, use `npm ci` for reproducible installs.

The sample tests run against the included React task page. Playwright starts and stops the Vite server automatically. The default test command uses Chromium.

## React development

Run `npm run dev` (or `npm run demo`) and open http://127.0.0.1:3000. Vite updates the page as you edit the React components.

- `demo/src/App.tsx`: task form and list, managed with React state.
- `demo/src/main.tsx`: React entry point.
- `demo/src/styles.css`: application styles.
- `demo/vite.config.mts`: development and build settings.

Run `npm run build` to create a production bundle in `demo/dist`, then `npm run preview` to serve it locally. Stop the development server before previewing, since both use port 3000.

## Record a test with codegen

Start the demo in one terminal:

```powershell
npm run demo
```

In another terminal in the same folder:

```powershell
npm run codegen:demo -- --output=tests/recorded.spec.ts
```

Use the browser to add tasks. Use the recorder's assertion controls to verify task text, then close the recorder. The generated TypeScript file runs with `npm test`. Use a fresh output filename for each recording to avoid replacing existing tests.

To record your own website:

```powershell
npm run codegen -- --output=tests/my-site.spec.ts https://example.com
```

Codegen is Playwright's built-in recorder; no separate codegen dependency is required. Review generated locators and add assertions before keeping a recorded test. Do not commit passwords, tokens, or saved authentication state.

## Commands

| Command | Purpose |
| --- | --- |
| `npm test` | Run Chromium tests headlessly |
| `npm run test:headed` | Run tests with a visible browser |
| `npm run test:ui` | Open the interactive test runner |
| `npm run test:debug` | Run with Playwright Inspector |
| `npm run report` | Open the last HTML report |
| `npm run typecheck` | Check TypeScript |
| `npm run browsers:all` | Install Chromium, Firefox, and WebKit |
| `npm run test:all` | Run across all three browsers |

Failure screenshots and videos are written to test-results; HTML reports go to playwright-report. CI retries twice and captures a trace on the first retry.

## Continuous integration

`.github/workflows/demo-ci.yml` runs for pull requests targeting `master`, pushes to `master`, merge queues, and manual runs. It uses the Node version in `.nvmrc` and installs the locked dependencies with `npm ci`.

The workflow runs ESLint, TypeScript checks, a production build, and the Chromium Playwright tests. Playwright starts the React demo automatically. The `playwright-report` artifact contains the HTML report and test evidence, including failure traces after retries; it is uploaded even when tests fail and retained for 14 days. Download and extract it from the Actions run, then open `playwright-report/index.html`.

To enforce checks before merging, configure a GitHub branch protection rule or ruleset targeting `master`: require pull requests, require the `Demo checks` status check, and require branches to be up to date (or use a merge queue). Restrict bypass permissions as appropriate. The workflow file alone does not enforce branch protection. Select the check after the workflow has run once. These repository settings must be enabled on GitHub.

Run the same checks locally with `npm run lint`, `npm run typecheck`, `npm run build`, and `npm test`.

## Test tags

Tests use Playwright's `tag` metadata:

- `@tasks`: all task feature tests.
- `@smoke`: basic task creation and input clearing.
- `@regression`: blank input, keyboard submission, and multiple tasks.
- `@recorded`: the test recorded with codegen.

Run a selected group or exclude recorded tests:

```powershell
npm test -- --grep "@smoke"
npm test -- --grep "@regression"
npm test -- --grep-invert "@recorded"
```

## Test your application

Add tests under `tests/`, then set BASE_URL for the current PowerShell session:

```powershell
$env:BASE_URL = 'http://localhost:8080'
npm test -- tests/my-app.spec.ts
```

The demo server is disabled when BASE_URL is set. The sample tasks tests are specific to the included demo; select your own test file when targeting another application. Clear the setting with `Remove-Item Env:BASE_URL` to use the demo again.

Official references: https://playwright.dev/docs/intro and https://playwright.dev/docs/codegen


