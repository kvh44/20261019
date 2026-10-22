# TypeScript + Playwright Test + Codegen

Requires Node.js 24 with npm. Open this folder in VS Code and install the recommended Playwright extension.

## Setup

```powershell
npm install
npm run browsers
npm run typecheck
npm test
```

Keep the generated package-lock.json in Git. After the initial install, use `npm ci` for reproducible installs. Dependencies could not be downloaded in the creation environment, so a lockfile is not included.

The two sample tests run against the included local task page. Playwright starts and stops its server automatically. The default test command uses Chromium.

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

## Test your application

Add tests under `tests/`, then set BASE_URL for the current PowerShell session:

```powershell
$env:BASE_URL = 'http://localhost:8080'
npm test -- tests/my-app.spec.ts
```

The demo server is disabled when BASE_URL is set. The sample tasks tests are specific to the included demo; select your own test file when targeting another application. Clear the setting with `Remove-Item Env:BASE_URL` to use the demo again.

Official references: https://playwright.dev/docs/intro and https://playwright.dev/docs/codegen
