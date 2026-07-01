# Playwright E2E + API Test Automation Framework

A test automation framework built with **Playwright** and **TypeScript**, covering both **UI** and **API** testing, structured with the **Page Object Model (POM)**, and wired into **GitHub Actions CI/CD**.

- **UI under test:** [SauceDemo](https://www.saucedemo.com) — a public demo e-commerce site
- **API under test:** [ReqRes](https://reqres.in) — a free public REST API for practicing test automation

## Why this project

This repo demonstrates:
- ✅ Page Object Model design for maintainable UI tests
- ✅ Custom Playwright fixtures for clean, DRY test code
- ✅ Both **UI** and **API** test coverage in one framework
- ✅ Cross-browser testing (Chromium, Firefox, WebKit)
- ✅ CI/CD pipeline that runs the full suite on every push (GitHub Actions)
- ✅ Automatic HTML reports, screenshots, and video on failure

## Project structure

```
playwright-ecommerce-framework/
├── .github/workflows/playwright.yml   # CI pipeline
├── pages/                             # Page Object classes (UI)
│   ├── LoginPage.ts
│   ├── ProductsPage.ts
│   └── CartPage.ts                    # includes CheckoutPage
├── tests/
│   ├── fixtures.ts                    # injects page objects into tests
│   ├── ui/
│   │   ├── login.spec.ts
│   │   ├── cart.spec.ts
│   │   └── checkout.spec.ts
│   └── api/
│       └── users.spec.ts
├── playwright.config.ts
├── package.json
└── tsconfig.json
```

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Install the browsers Playwright needs
npx playwright install

# 3. Run every test (UI + API, all browsers)
npm test

# Run only UI tests
npm run test:ui

# Run only API tests
npm run test:api

# Run tests with a visible browser window
npm run test:headed

# Open the last HTML report
npm run report
```

## Continuous Integration

Every push or pull request to `main` triggers `.github/workflows/playwright.yml`, which:
1. Installs dependencies and browsers
2. Runs the full test suite
3. Uploads the HTML report as a downloadable artifact

## What each test suite covers

| Suite | File | Covers |
|---|---|---|
| Login | `tests/ui/login.spec.ts` | Valid login, locked-out user, validation error |
| Cart | `tests/ui/cart.spec.ts` | Adding items, cart badge count, cart contents |
| Checkout | `tests/ui/checkout.spec.ts` | Full end-to-end purchase flow |
| Users API | `tests/api/users.spec.ts` | GET, POST, PUT, DELETE, 404 handling |

## Possible next steps

- [ ] Add visual regression testing with `toHaveScreenshot()`
- [ ] Add accessibility checks with `@axe-core/playwright`
- [ ] Parameterize test data with fixtures/JSON files
- [ ] Add Allure reporting for richer CI reports
- [ ] Dockerize the test run

---

### For your CV

Something like this works well as a bullet point:

> Built an end-to-end test automation framework (Playwright + TypeScript) covering UI and API testing with the Page Object Model, integrated into a GitHub Actions CI/CD pipeline with automated HTML reporting.
