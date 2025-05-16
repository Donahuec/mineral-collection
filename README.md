# CrystalDB - Mineral Collection Catalog

![Website](https://img.shields.io/website?url=https%3A%2F%2Fmineral-collection.vercel.app%2F)
![GitHub Actions Workflow Status](https://img.shields.io/github/actions/workflow/status/donahuec/mineral-collection/playwright-pr.yaml?branch=main&label=Playwright%20Tests)

A NextJS and Sanity CMS based website for sharing and cataloging my crystal and mineral collection.

## Tech Stack

- React + NextJS
- Vercel Deployments
- Sanity CMS and Studio for data
- React ARIA for headless UI components
- Storybook for component testing and documentation
- Playwright for E2E testing
- Prettier and ESLint for code styling

## Mineral Collection Site

NextJS and React Site deployed to Vercel.

Located under `/mineral-collection-site`

```
cd mineral-collection-site
npm install
```

### Build and Run

```
// dev build and run
npm run dev

// build only
npm run build

// run production build
npm run start
```

Open in http://localhost:3000

### Testing

#### Storybook

Storybook story files are stored alongside their related components.

```
npm run storybook
```

Open in http://localhost:6006

#### Playwright

Playwright tests are saved under the `mineral-collection-site/tests` folder.

If a local server is currently running, the tests will run against that. Otherwise they will start their own server, but require an existing build.

```
// create build
npm run build

// run tests
npm run test

// open playwright UI
npm run playwright:open

// run playwright codegen
npm run playwright:codegen
```

#### Automation

- Tests are run in a container on PR or push into main branch via Github Action
- Tests are run against Vercel preview environment on successful deploy via Github Action

### Other Utilities

Use `npm run lint` to make sure the build passes linting for the Vercel deployment.

## Sanity Studio

Sanity Studio code, located under `/studio`

```
cd studio
npm install
```

### Build and Run

```
// build and run dev server
npm run dev

// preview static build
npm run start
```

View at http://localhost:3333/

### Typegen

To update typescript types based on query or schema changes run the following:

```
npm run update-types
```

### Deploy

Deploy updates to Sanity Studio with the following:

```
npm run sanity deploy
```
