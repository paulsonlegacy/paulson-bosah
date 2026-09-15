import { Link } from 'react-router-dom'
import Header from '@/layouts/Header/Header'
import Footer from '@/layouts/Footer/Footer'
import ProjectCarousel from '@/components/ProjectCarousel/ProjectCarousel'
import projectsData from '@/assets/json/projects.json'
import '@/assets/css/detail.css'

const project = projectsData.find((p) => p.title === 'QuickAir')!
const images: string[] = project.images ?? []
const video: string | null = project.video ?? null

const techStack = [
  ['HTTP Framework', 'GoFiber v2 (fasthttp)'],
  ['Browser Automation', 'go-rod (Chrome DevTools Protocol)'],
  ['ORM', 'GORM — PostgreSQL (prod) / SQLite (dev)'],
  ['Auth', 'golang-jwt/jwt v5 + bcrypt'],
  ['Real-time', 'Server-Sent Events (SSE)'],
  ['Payment', 'Paystack — gateway + dedicated virtual accounts'],
  ['HTML Scraping', 'goquery + tidwall/gjson'],
  ['Logging', 'Uber zap + lumberjack (rotating files)'],
  ['Alerting', 'Telegram Bot API'],
  ['API Docs', 'Swagger (swaggo/swag)'],
  ['AI Integration', 'Claude AI'],
  ['Frontend', 'React 19 + TypeScript + Vite'],
]

const featureGroups = [
  {
    title: 'Search Engine',
    items: [
      'Fan-out search across 12 Nigerian carriers: Air Peace, Arik, FlyAero, IbomAir, MaxAir, ValueJet, RanoAir, XeJet, NGEagle, Overland, Enugu Air, Binani Air, FlyUnited, and UMZAir',
      'Wakanow fallback signal — direct scrapers yield to the aggregator and only run independently if Wakanow fails or times out',
      'Shared Crane.aero portal automation library reused across 8 airlines that share the same portal backend',
      'Real-time SSE streaming — results appear as each scraper finishes, not when all are done',
      'Cancellable search registry — any live fan-out can be aborted via a REST endpoint, cancelling all goroutines for that search',
      'V2 SSE job cache keeps results alive for price validation at checkout even after the client disconnects',
    ],
  },
  {
    title: 'Browser Automation',
    items: [
      'Global browser semaphore singleton (via sync.Once) capping concurrent Chrome instances to match available server RAM',
      'Per-airline Chrome profile pool — credential slots managed as a buffered-channel token bucket; borrowing a slot blocks until one is returned',
      'Stealth flags suppressing navigator.webdriver and automation signals; Cloudflare bypass helpers via MustEvalOnNewDocument',
      'SafeBrowser: pkill-based Close() that kills Chrome via the user-data-dir path rather than CDP — prevents orphaned processes after context expiry',
      'Daily 3 AM cron sweeps stale /tmp/rod-* profile directories older than 7 days',
      'DEBUG=true flips all browsers to headed mode for local scraper development',
    ],
  },
  {
    title: 'Ticket Issuance',
    items: [
      'Durable queue: TicketIssue written to Postgres first (durable), then pushed to an in-process buffered channel for delivery',
      'Atomic job claiming via conditional UPDATE (status = pending → running, checks RowsAffected) — concurrent workers cannot double-execute the same job',
      'Dependent-segment ordering: return flight issuance carries a DependsOn pointer to the outbound and stays in waiting state until the outbound PNR is confirmed',
      'Admin force-cancel (CancelIssuer cancels the browser context) and manual requeue (RequeueTicketIssue resets the DB record)',
      '5-step persistent job poller every 5 minutes: reset orphaned runners, fail exhausted records, cancel stale pending, recover orphaned waiting, re-queue valid pending',
      'Telegram alerts on every ticket failure, orphan recovery, and critical system event',
    ],
  },
  {
    title: 'Payments & Wallet',
    items: [
      'Paystack gateway with dedicated virtual accounts (DVA) — bank transfer deposits fund the wallet automatically via signed webhook',
      'Pay-as-you-go model: no minimum deposit required; agencies fund exactly what they need per booking',
      'Wallet stored in Kobo (int64, no float rounding errors); checkout supports wallet payment or Paystack gateway',
      'Super-admin manual credit/debit endpoints for wallet adjustments',
    ],
  },
  {
    title: 'Agency & Admin',
    items: [
      'Agency self-registration with email OTP verification; admin approve, reject, or suspend flow',
      'Three actor types: agency owner, staff sub-users (with per-permission flags), admin/superadmin',
      'Granular per-staff permission flags enforced at middleware level: search flights, issue tickets, view bookings, view balance',
      'Admin scraper health dashboard: per-airline consecutive error counts, last-scraped timestamps, and live status',
      'Curated trips: admin manually creates flight bundles targetable to all agencies or one specific agency; rows expire after 24 hours, swept by a 30-minute cron',
      'Bulk announcement endpoint that notifies all agencies by email',
    ],
  },
  {
    title: 'Integration & Security',
    items: [
      'HMAC-SHA256 partner API with 5-minute timestamp window replay-attack protection for external system integrations',
      'JWT access tokens + rotating refresh tokens (3-token-per-actor limit enforced by nightly cron); bcrypt passwords',
      'Role/permission middleware chain: JWT auth → ActorTypeRequired → RequirePermission',
      'Swagger API docs auto-generated from handler annotations, served at /swagger/*',
      'SQLite in dev, PostgreSQL in prod — same migrations run on both drivers',
      'GitHub Actions CI workflow with Air (air.toml) for live reload in development',
    ],
  },
]

function QuickAir() {
  return (
    <>
      <Header />

      <main>
        <section className="detail__hero">
          <div className="container">
            <Link to="/" className="detail__back">← back to portfolio</Link>
            <h1 className="detail__title">QuickAir</h1>
            <p className="detail__tagline">
              Nigeria's B2B flight aggregation platform for travel agencies — concurrent real-time
              search across 12 airline portals, automated ticket issuance, and a pay-as-you-go wallet.
            </p>
            <div className="detail__actions">
              <a
                href="https://quickair.app"
                className="detail__link"
                target="_blank"
                rel="noopener noreferrer"
              >
                live platform →
              </a>
            </div>
          </div>
        </section>

        <section className="section" id="overview">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Overview</h2>
            </div>
            <div className="detail__prose">
              <p>
                QuickAir is a B2B flight aggregation and booking platform built for Nigerian travel agencies.
                Instead of logging into multiple airline portals separately, agencies log in once, fund a wallet,
                and search across 12 Nigerian carriers simultaneously — getting results in real time as each source
                responds. They pay the exact same price as booking directly, or cheaper, with no mandatory minimum
                deposit.
              </p>
              <p>
                The core engineering challenge was building a reliable scraper fleet that could fan out across
                a mix of aggregator APIs, headless-browser portals, and lightweight HTTP endpoints — all concurrently —
                without overwhelming the server, leaking Chrome processes, or returning stale prices. A 3-tier
                architecture with a global browser semaphore, per-airline profile pools, and a Wakanow fallback
                signal solves all three.
              </p>
              <p>
                Beyond search, the platform automates the entire post-payment pipeline: a durable worker queue
                issues PNRs directly on the airline portal without any manual step. Multi-segment bookings handle
                dependent issuance ordering, and a 5-step persistent poller recovers failed or orphaned jobs
                across server restarts.
              </p>
            </div>
          </div>
        </section>

        {(video || images.length > 0) && (
          <section className="section" id="media">
            <div className="container">
              <div className="section__header">
                <h2 className="section__title">Media</h2>
              </div>
              <div className={`detail__media${!video || images.length === 0 ? ' detail__media--full' : ''}`}>
                {video && (
                  <div className="detail__video">
                    <video src={video} controls preload="metadata" />
                  </div>
                )}
                {images.length > 0 && (
                  <ProjectCarousel images={images} alt="QuickAir" />
                )}
              </div>
            </div>
          </section>
        )}

        <section className="section" id="architecture">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Architecture</h2>
              <p className="section__description">How the search and ticketing pipeline works</p>
            </div>
            <div className="detail__arch">
              <div className="arch__block">
                <h3 className="arch__label">Tier 1 — Wakanow Aggregator API</h3>
                <p className="arch__text">
                  A single HTTP call to Wakanow returns results for up to 6 airlines at once. It fires first.
                  Direct scrapers for those airlines monitor a shared WakanowSignal and yield if Wakanow succeeds —
                  falling back to their own scraper only on timeout or failure. This avoids duplicate work while
                  guaranteeing full coverage.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">Tier 2 — Headless Browser Scrapers</h3>
                <p className="arch__text">
                  go-rod drives headless Chrome instances against airline web portals via CDP. A global browser
                  semaphore (singleton via sync.Once) caps concurrent instances to match server RAM. Each airline
                  gets a profile pool — a buffered-channel token bucket of credential slots — so overlapping
                  searches don't collide on the same account. Eight airlines sharing the Crane.aero portal backend
                  use a single shared automation library.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">Tier 3 — Lightweight HTTP Scrapers</h3>
                <p className="arch__text">
                  Airlines with accessible HTML or JSON endpoints are scraped with plain HTTP + goquery/gjson —
                  no browser required. These delay-start by 5 seconds to give browser scrapers priority, then
                  run concurrently alongside them.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">SSE Streaming</h3>
                <p className="arch__text">
                  Results don't wait for all scrapers to finish. Each scraper writes to an in-process job cache
                  the moment it returns; the SSE stream pushes them to the client incrementally. The cache keeps
                  the result bundle alive after the stream closes so prices can be validated at checkout.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">Durable Ticket Issuance Queue</h3>
                <p className="arch__text">
                  On payment confirmation, a TicketIssue record is written to Postgres (durable) before being
                  pushed to the in-process worker queue. Workers claim jobs with a conditional UPDATE — atomic,
                  no double-execution. Return segments carry a DependsOn pointer and wait in holding state until
                  the outbound PNR confirms. A 5-step persistent poller runs every 5 minutes to recover any
                  jobs dropped across server restarts.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">HMAC Partner API</h3>
                <p className="arch__text">
                  External systems (such as the FareCrasher rebooking integration) authenticate via HMAC-SHA256
                  with a 5-minute timestamp window for replay-attack protection. Partner routes bypass JWT entirely
                  and use a separate middleware chain. Partner bookings draw from the agency wallet the same way
                  direct bookings do.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section" id="features">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Features</h2>
            </div>
            <div className="detail__feature-groups">
              {featureGroups.map((group) => (
                <div className="feature-group" key={group.title}>
                  <h3 className="feature-group__title">{group.title}</h3>
                  <ul className="feature-group__list">
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section" id="tech">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Tech Stack</h2>
            </div>
            <div className="detail__tech-table">
              {techStack.map(([concern, tech]) => (
                <div className="tech-row" key={concern}>
                  <span className="tech-row__concern">{concern}</span>
                  <span className="tech-row__tech">{tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default QuickAir
