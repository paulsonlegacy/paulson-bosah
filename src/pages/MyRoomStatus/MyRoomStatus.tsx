import { Link } from 'react-router-dom'
import Header from '@/layouts/Header/Header'
import Footer from '@/layouts/Footer/Footer'
import ProjectCarousel from '@/components/ProjectCarousel/ProjectCarousel'
import projectsData from '@/assets/json/projects.json'
import '@/assets/css/detail.css'

const project = projectsData.find((p) => p.title === 'MyRoomStatus')!
const images: string[] = project.images ?? []
const video: string | null = project.video ?? null

const techStack = [
  ['HTTP Framework', 'GoFiber v2 (fasthttp)'],
  ['ORM', 'GORM — PostgreSQL (cloud) / SQLite (offline)'],
  ['Real-time', 'WebSockets (gofiber/websocket v2)'],
  ['Auth', 'golang-jwt/jwt v5 + bcrypt'],
  ['AI', 'Google Gemini 2.5 Flash Lite (Gemini API)'],
  ['Payment', 'Paystack — gateway + dedicated virtual accounts'],
  ['Storage', 'Cloudinary'],
  ['Logging', 'Uber zap + lumberjack (rotating files)'],
  ['Alerting', 'Telegram Bot API'],
  ['Offline Binary', 'go:embed + getlantern/systray (Windows tray)'],
  ['API Docs', 'Swagger (swaggo/swag) + ReDoc'],
  ['Frontend', 'React 19 + TypeScript + Vite + Zustand + React Router v7'],
]

const featureGroups = [
  {
    title: 'Deployment & Offline Mode',
    items: [
      'Dual deployment: cloud SaaS on PostgreSQL and a standalone offline binary (SQLite) — same codebase, single compiler flag',
      'React SPA embedded in the Go binary via go:embed — the offline executable serves the entire frontend with no external web server',
      'Offline provisioning via a signed ProvisioningBundle: complete hotel config (rooms, staff, catalog, license) exported in one HTTP response and applied to local SQLite via GORM upsert transactions',
      'HMAC-signed periodic SyncUploadBundle pushing offline records (bookings, sales, guests, visitors, hall bookings, vouchers) back to cloud PostgreSQL',
      'Windows system tray icon (systray) for the offline binary; other platforms poll the HTTP server then auto-launch the browser',
      'Mode-gate middleware (RequireLocalMode, RequireCloudMode, BlockCloudMutationsIfOfflineMode) enforces which endpoints are available in each mode',
    ],
  },
  {
    title: 'Real-time & WebSockets',
    items: [
      'Dashboard WebSocket hub broadcasting selective refresh signals scoped per hotel and affected data section — targeted refetches instead of full reloads',
      'Smart TV WebSocket hub with per-TV connection tracking and custom event template rendering (variable substitution for guest name, room number, hotel name, etc.)',
      'Pending TV message queue: messages persisted to DB when a TV is offline at event time and flushed automatically on WebSocket reconnect',
      'Hourly cron cleans expired pending TV messages',
      'Real-time visitor arrival events can trigger a Smart TV welcome notification',
    ],
  },
  {
    title: 'Smart Lock Integration',
    items: [
      'Five lock vendors behind a single Provider interface: TTLock (cloud REST + OAuth), Tuya IoT (cloud REST), Salto KS (cloud REST + site_admin OAuth), ASSA ABLOY Vostio (AWS Cognito, reserved), DouWin RFID (bridge relay)',
      'Adding a new vendor only requires implementing the Provider interface and adding a factory case — zero changes to the booking or usecase layer',
      'DouWin bridge agent: a separate Go Windows service that loads RFV2007NETHOTEL.dll via CGo, connects to the cloud API via a persistent WebSocket, and relays card-issue and cancel commands',
      'SQLite-backed command queue in the bridge agent for command durability across disconnects',
      'Bridge agent installable as a Windows system service with install/uninstall/setup/run CLI commands',
      'Issued keys tracked in the issued_keys table; remote open, reissue, and lock status polling exposed as REST endpoints',
    ],
  },
  {
    title: 'Booking & Room Management',
    items: [
      'Full room booking lifecycle: reserved → paid → checked_in → checked_out / cancelled',
      'Bulk group bookings across multiple rooms with proportional payment splitting',
      'Hall (event space) booking system with date-range overlap detection to prevent double-booking',
      'Corporate customer credit accounts — deposit requirements waived, total billed to account',
      'Vouchers: flat or percentage, single-use or multi-use, optionally scoped to a room category or customer',
      'Discount agreements: manager-issued short-lived codes redeemable at booking time; amount and approver auto-filled from the code',
    ],
  },
  {
    title: 'POS & Storefront',
    items: [
      'POS/F&B module with revenue heads (categories), revenue items, optional inventory tracking, and reorder alerts',
      'Partial sales, refunds, and cost/selling price separation for margin tracking',
      'Public storefront at /store/{hotel_code}: hotel info, menu, available rooms, and order submission — no authentication required',
      'QR codes at /qr/{short_code} redirecting to the storefront with optional room pre-selection and category filter',
      'Scan count tracking per QR code',
      'PDF export of reports via jsPDF + jsPDF-autotable on the frontend',
    ],
  },
  {
    title: 'Integrations & AI',
    items: [
      'QuickAir HMAC partner API integration — hotel staff can search and book flights directly from inside the PMS',
      'Google Gemini AI support chatbot (gemini-2.5-flash-lite) with hotel-specific markdown knowledge base compiled into the system prompt at startup',
      'AI chatbot can respond with a tour_id field to trigger a driver.js guided onboarding tour on the frontend',
      'Gracefully degrades to 503 when GEMINI_API_KEY is not set',
      'Cloudinary adapter for hotel image uploads',
      'SMTP multi-provider mailer with HTML templates for transactional emails',
    ],
  },
  {
    title: 'SaaS Billing & Multi-Property',
    items: [
      'Two-tier SaaS billing: License base plans (Starter, Growth, Pro, Elite with room tier limits) + optional add-ons (smart_tv, fnb, key_control, multi_property_reports)',
      'Paystack DVA webhooks handle bank transfer deposits automatically; online card/bank transfer also supported',
      'Daily billing expiry sweep marking expired licenses and subscriptions (also runs immediately on startup)',
      'Hotel groups: hotels invite others into a shared group for cross-property reporting',
      'Multi-property group reports: revenue, occupancy, expense, P&L, and guest manifests aggregated across all properties',
      'Add-on gating at middleware level — feature access blocked at the API layer if the add-on is not active',
    ],
  },
  {
    title: 'Staff, Roles & Operations',
    items: [
      'Role-based access control with SystemRole and HotelRole separation; SuperAdmin role has wildcard all permission bypassing individual checks',
      'Granular permissions (rooms.book, staff.manage, keycard.manage, etc.) checked by RequirePermission middleware on specific endpoints',
      'Expense management with approval and disbursement workflow: create → approve → disburse',
      'Visitor log with timestamp, purpose tracking, and Smart TV arrival notifications',
      'Staff payroll records',
      'Reporting suite: revenue, occupancy, guest manifest, P&L, front-desk disbursements, breakfast list, payroll, visitor report, staff sales',
    ],
  },
]

function MyRoomStatus() {
  return (
    <>
      <Header />

      <main>
        <section className="detail__hero">
          <div className="container">
            <Link to="/" className="detail__back">← back to portfolio</Link>
            <h1 className="detail__title">MyRoomStatus</h1>
            <p className="detail__tagline">
              Full-stack hotel property management system for the West African market — cloud SaaS or
              self-contained offline binary, smart lock integration across five vendors, real-time WebSocket
              dashboards, and an AI support chatbot.
            </p>
            <div className="detail__actions">
              <a
                href="https://myroomstatus.com"
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
                MyRoomStatus is a hotel property management system built for the West African market. It handles
                the full hotel operations stack — room and hall bookings, POS/F&B, smart lock key issuance, Smart TV
                notifications, expense management, visitor tracking, and SaaS billing — served through a single
                Go backend and a React frontend.
              </p>
              <p>
                A defining feature is dual deployment: the same codebase runs as a cloud SaaS on PostgreSQL
                or as a completely self-contained offline binary with SQLite embedded. The offline binary
                embeds the entire React SPA via go:embed — a hotel PC runs a single executable with no external
                dependencies. Hotels provision offline mode from the cloud (one signed HTTP bundle sets up everything
                locally) and sync records back on a schedule.
              </p>
              <p>
                The smart lock layer supports five vendors behind a single Provider interface. The most technically
                involved is DouWin — a Chinese OEM RFID system with no cloud API. A separate Go Windows service
                (the bridge agent) loads the vendor DLL via CGo, connects to the cloud via a persistent WebSocket,
                and relays card-issue commands with a local SQLite queue for durability across disconnects.
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
                  <ProjectCarousel images={images} alt="MyRoomStatus" />
                )}
              </div>
            </div>
          </section>
        )}

        <section className="section" id="architecture">
          <div className="container">
            <div className="section__header">
              <h2 className="section__title">Architecture</h2>
              <p className="section__description">Key system design decisions</p>
            </div>
            <div className="detail__arch">
              <div className="arch__block">
                <h3 className="arch__label">Clean Layered Architecture</h3>
                <p className="arch__text">
                  Strict dependency direction: handler → usecase → repo → DB. Handlers are thin — parse
                  request, call one usecase method, map response. All business logic lives in usecases. Repos
                  expose exactly four read methods per entity (FindOne, FindAll, with/without preloads), all
                  keyed by map[string]any conditions. Response DTOs live in their own package; usecases never
                  import them.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">Dual Database Driver</h3>
                <p className="arch__text">
                  The same GORM models and migrations run against PostgreSQL in cloud mode and SQLite in offline
                  mode. Driver selection is config-driven at startup. All monetary values use entity.Money (int64) —
                  the stored integer is the display value, no subunit conversion anywhere.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">Offline Binary & SPA Embedding</h3>
                <p className="arch__text">
                  Built with -ldflags "-X main.IsOfflineBuild=true". The compiled React SPA is embedded via
                  go:embed and served from the binary's HTTP server — no separate web server or installation needed
                  on hotel PCs. On Windows it shows a system tray icon; on other platforms it polls until ready
                  and opens the browser automatically.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">WebSocket Hubs</h3>
                <p className="arch__text">
                  Two separate hubs run concurrently: a DashboardHub that broadcasts selective refresh signals
                  to all connected hotel staff (so the frontend only refetches affected sections), and a TV hub
                  that maintains per-TV WebSocket connections. Missed TV events are persisted to DB and flushed
                  on reconnect.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">DouWin RFID Bridge Agent</h3>
                <p className="arch__text">
                  DouWin locks have no cloud API — they're programmed via a Windows DLL. The bridge agent is a
                  separate Go binary that loads the DLL via CGo, connects to the cloud API over a persistent
                  WebSocket, and relays commands. A SQLite-backed queue inside the agent provides durability:
                  commands survive disconnects and are retried on reconnect.
                </p>
              </div>
              <div className="arch__block">
                <h3 className="arch__label">Typed-Nil Trap (Documented Production Incident)</h3>
                <p className="arch__text">
                  A nil *apperror.AppError escaping as a non-nil error interface caused silent GORM transaction
                  rollbacks in production. The pattern and its fix are documented in CLAUDE.md and
                  docs/GO_ERROR_TRAP.md with explicit guards at every transaction boundary — a real example of
                  how production incidents shape architecture decisions.
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

export default MyRoomStatus
