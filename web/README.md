# Akiba Technologies — Next.js app

The App Router rebuild of the site: TypeScript, React Server Components by
default, client components only where a page is actually interactive. Same
five routes, same design system, same copy.

```
web/
  app/
    layout.tsx          Shared shell: fonts, <Nav>, <Rail>, <Env>, <Footer>
    globals.css          The whole design system (tokens, components, motion)
    icon.png              Real brand mark — Next.js serves it as the favicon
    page.tsx              Home
    solutions/page.tsx     Capabilities and delivery
    portfolio/page.tsx     Case studies (features Akiba ERP)
    about/page.tsx         Philosophy, lifecycle, team, compliance
    contact/page.tsx       Technical brief intake
  components/            One file per UI piece — see "Components" below
  lib/                   Typed content: nav links, IDE terminal lines, case
                          studies and testimonials
  public/brand/logo.png   The same brand mark, used in the nav and footer
```

## Running it

```
npm install
npm run dev       # http://localhost:3000
npm run build     # production build
npm run typecheck # tsc --noEmit
```

Requires Node 18.18+ (the project was built and typechecked against Node 22).

## Before this goes live

The same three things flagged in the previous static build still apply here,
just in their new home:

1. **Replace the placeholder content.** `lib/case-studies.ts` holds the case
   studies and testimonials as typed data — replace the entries, not the
   markup. `app/about/page.tsx` has a `TEAM` array with the same kind of
   placeholder. Get written sign-off before naming a real client.
2. **Point the contact form somewhere real.** Open `components/ContactForm.tsx`
   and read the comment above `FORM_ENDPOINT`. Empty means it opens the
   visitor's mail app addressed to `engineering@akiba.tech` (set in
   `lib/nav-links.ts`); a form-service URL posts it straight to an inbox. The
   next real step up from either is a route handler at `app/api/brief/route.ts`
   that emails or stores the brief server-side — the form already POSTs JSON,
   so wiring a route handler in is a small change.
3. **Make the booking card real** if you want it. `components/BookingCard.tsx`
   is a designed placeholder — swap its body for a Cal.com or Calendly embed,
   or point the button at your booking URL.

## Deploying

Set `NEXT_PUBLIC_SITE_URL` to the real domain at build time (Vercel, or
whatever host you use) — `app/layout.tsx` uses it as `metadataBase`, so every
page's Open Graph URL resolves to an absolute one automatically. Nothing to
patch by hand after deploy.

## Components

- **Nav** — sticky glass header. Active link comes from `usePathname()`, not
  a prop, so a new page lights up correctly with zero per-page wiring.
- **Rail** — the signature telemetry rail. Writes scroll progress straight to
  a ref on every frame instead of round-tripping through React state, since
  it repaints on every scroll tick.
- **Reveal** — a polymorphic fade-and-lift-in-on-scroll wrapper (`as="h1"`,
  `as={Link}`, and so on) built on one `IntersectionObserver` hook, replacing
  the old `data-rv` DOM-query pattern with real component state.
- **IdeWindow** — the hero's live terminal. Content lives in
  `lib/ide-content.ts` as typed tokens (method/key/string/number/comment/...),
  rendered to spans rather than injected as HTML strings. The line-by-line
  reveal is pure CSS (`transition-delay: calc(var(--i) * 70ms)`), so
  switching tabs needs no per-line timers.
- **Dashboard** — the ERP dual-pane mock, parameterized by columns/rows/kvs
  so the home page and portfolio's featured case share one implementation.
- **CapabilityMatrix** — the solutions page's tab list, with roving tabindex
  and arrow-key navigation per the WAI-ARIA tabs pattern.
- **PortfolioBrowser** — filter state and the case grid, filtering
  `lib/case-studies.ts` client-side instead of toggling a `hidden` attribute.
- **ContactForm** — fully controlled inputs, mailto/fetch submit, and an
  in-place success state with a generated reference code.

## Verified

- `npx tsc --noEmit` — see note below.
- Every internal `<Link>` target resolves to a real route or in-page anchor.
- Heading hierarchy: one `h1` per page, no skipped levels, traced across
  page + the components each page renders.
- Contrast, reduced motion, focus-visible and touch targets are unchanged
  from the static build (see `app/globals.css`) — nothing in that floor was
  touched during the port.

Note on `npm install`: the sandbox this was built in killed `npm`/`node`
child processes outright and repeatedly while installing dependencies —
confirmed down to `npm cache verify` (a local-only command with no network
call at all) failing the same way. That rules out this project's dependency
list or network conditions as the cause; it is specific to this session's
sandbox. Run `npm install` yourself in a normal terminal before `npm run
dev`/`build` — it should install the same as any other Next.js project.
Every file here has been hand-audited in its absence for import resolution,
brace/paren/bracket balance, JSX structure, heading hierarchy, effect-cleanup
correctness, and className-to-CSS-selector coverage.
