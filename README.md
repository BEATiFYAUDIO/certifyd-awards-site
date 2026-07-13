# Certifyd Awards

Production frontend for `https://awards.certifyd.me`.

This site presents Certifyd Awards as a public, proof-backed awards experience for creators, works, contributors, receipts, voting previews, and transparent scoring.

## Development

```bash
npm install
npm run dev
```

## Validation

```bash
npm run lint
npm run test:scoring
npm run build
```

## Deployment

GitHub Pages deploys from `.github/workflows/deploy-pages.yml` on pushes to `main`.

Custom domain is configured with `public/CNAME`:

```text
awards.certifyd.me
```

DNS should point `awards.certifyd.me` to the GitHub Pages host for the owning organization.

## Disclosure

Seed data is realistic preview data. It does not claim live blockchain voting, production award results, or final winner credentials.
