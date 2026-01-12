import React from "react";

type LinkItem = { label: string; href: string };
type Work = {
  title: string;
  subtitle: string;
  tags: string[];
  bullets: string[];
  highlights: { label: string; value: string }[];
  links: LinkItem[];
  images?: string[];
};

const works: Work[] = [
  {
    title: "作品一：Android TV 商用公播系統",
    subtitle:
      "整合直播、廣告排程、跑馬燈、叫號與遠端維運能力，支援 24/7 長時間穩定播放。",
    tags: ["Flutter", "Android TV", "ExoPlayer/Video", "WebSocket", "Sentry", "GCP"],
    bullets: [
      "多來源播放：YouTube / 串流 / 本地影片快取",
      "廣告排程與輪播策略（離線可播放）",
      "播放 watchdog / 記憶體與 MediaCodec 容錯",
      "遠端裝置管理（更新、監控、維運）",
      "叫號資訊即時推播與多診間顯示",
    ],
    highlights: [
      { label: "運行型態", value: "商用部署 / 24×7" },
      { label: "核心價值", value: "穩定播放 + 可維運" },
      { label: "關鍵能力", value: "離線快取 / 防卡死 / 監控" },
    ],
    links: [],
    images: ["/images/home.png", "/images/googlePage.png"],
  },
  {
    title: "作品二：叫號系統 / 中介服務（Bridge）與設備整合",
    subtitle:
      "串接診所端設備或輸出檔案，透過本地中介服務安全上傳至雲端，再以 WebSocket 推播至電視牆與後台，完成端到端資料流。",
    tags: ["Node.js", "File Watcher", "Webhook", "WebSocket", "Security", "Edge"],
    bullets: [
      "本地中介服務（Bridge）監聽資料來源（檔案或設備輸出）",
      "Debounce / Retry / 斷線恢復機制，降低現場不穩定風險",
      "安全簽章 / 驗證流程（避免資料偽造）",
      "雲端 API + WebSocket 推播至多裝置同步",
      "可擴充至讀卡或其他院所端整合需求",
    ],
    highlights: [
      { label: "運行環境", value: "院所端本機 + 雲端" },
      { label: "核心價值", value: "系統整合能力" },
      { label: "資料流", value: "設備/檔案 → Bridge → Cloud → TV/後台" },
    ],
    links: [],
    images: [],
  },
];

const techStack = [
  "Flutter / Dart",
  "React / TypeScript",
  "Android TV / ExoPlayer",
  "Node.js",
  "WebSocket",
  "GCP (Cloud Run / Cloud SQL / Storage)",
  "PostgreSQL / Redis",
  "Sentry Observability",
];

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      id={id}
      className="mx-auto w-full max-w-5xl px-3 py-8 sm:px-6 sm:py-12"
    >
      <div className="mb-5 sm:mb-8">
        <h2 className="text-lg font-semibold tracking-tight sm:text-2xl">
          {title}
        </h2>
        {subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex max-w-full items-center rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] leading-4 text-slate-700 sm:px-3 sm:text-sm">
      <span className="max-w-full break-words">{text}</span>
    </span>
  );
}

function ImageStrip({ images, title }: { images: string[]; title: string }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const isDownRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };
  const onMouseLeave = () => (isDownRef.current = false);
  const onMouseUp = () => (isDownRef.current = false);
  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.2;
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = window.matchMedia("(min-width: 640px)").matches ? 280 : 220;
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" });
  };

  if (!images?.length) return null;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-700">作品截圖</div>

        <div className="hidden gap-2 sm:flex">
          <button
            type="button"
            onClick={() => scrollByCard(-1)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            aria-label="向左滑"
          >
            ←
          </button>
          <button
            type="button"
            onClick={() => scrollByCard(1)}
            className="rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
            aria-label="向右滑"
          >
            →
          </button>
        </div>
      </div>

      <div
        ref={scrollerRef}
        className={[
          "mt-3 flex gap-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-3 sm:p-4",
          "scroll-smooth snap-x snap-mandatory",
          "touch-pan-x",
          "cursor-grab active:cursor-grabbing",
          "hide-scrollbar",
          "[scrollbar-width:none]",
          "[-ms-overflow-style:none]",
        ].join(" ")}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
        role="region"
        aria-label={`${title} screenshots`}
      >
        {images.map((src, i) => (
          <div
            key={`${src}-${i}`}
            className="snap-start shrink-0 w-[220px] sm:w-[280px] md:w-[320px]"
          >
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">
              <div className="aspect-video w-full bg-slate-100">
                <img
                  src={src}
                  alt={`${title} screenshot ${i + 1}`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                  draggable={false}
                />
              </div>
            </div>
          </div>
        ))}

        <div className="shrink-0" style={{ width: 1 }} />
      </div>

      <div className="mt-2 text-xs text-slate-500 sm:hidden">
        小提示：可左右滑動查看截圖
      </div>
    </div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="回到最上方"
      className={[
        "fixed bottom-4 right-4 z-50",
        "rounded-full border border-slate-200 bg-white px-3 py-2 text-sm shadow-lg",
        "sm:bottom-6 sm:right-6 sm:px-4 sm:py-3",
        "hover:bg-slate-50 transition-all text-slate-700",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      ↑ Top
    </button>
  );
}

function MobileNav() {
  const [open, setOpen] = React.useState(false);
  const close = () => setOpen(false);

  return (
    <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-3 py-3 sm:px-6 sm:py-4">
        <a href="#top" className="font-semibold tracking-tight">
          Nick 作品集
        </a>

        <nav className="hidden gap-5 text-sm text-slate-600 sm:flex">
          <a className="hover:text-slate-900" href="#works">
            作品
          </a>
          <a className="hover:text-slate-900" href="#stack">
            技術棧
          </a>
          <a className="hover:text-slate-900" href="#contact">
            聯絡
          </a>
        </nav>

        <button
          type="button"
          className="sm:hidden rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm hover:bg-slate-50"
          onClick={() => setOpen((v) => !v)}
          aria-label="開啟選單"
          aria-expanded={open}
        >
          ☰
        </button>
      </div>

      {open ? (
        <div className="sm:hidden border-t border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl flex-col px-3 py-3 text-sm text-slate-700">
            <a
              className="rounded-lg px-3 py-2 hover:bg-slate-50"
              href="#works"
              onClick={close}
            >
              作品
            </a>
            <a
              className="rounded-lg px-3 py-2 hover:bg-slate-50"
              href="#stack"
              onClick={close}
            >
              技術棧
            </a>
            <a
              className="rounded-lg px-3 py-2 hover:bg-slate-50"
              href="#contact"
              onClick={close}
            >
              聯絡
            </a>
          </div>
        </div>
      ) : null}
    </header>
  );
}

export default function App() {
  return (
    <div id="top" className="min-h-screen bg-slate-50 text-slate-900">
      <MobileNav />

      <main className="min-w-0">
        {/* Hero */}
        <section className="mx-auto w-full max-w-5xl px-3 pb-7 pt-8 sm:px-6 sm:pb-10 sm:pt-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-10">
            <h1 className="mt-1 text-2xl font-semibold tracking-tight sm:mt-3 sm:text-4xl">
              專案展示
            </h1>
            <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-600 sm:mt-4 sm:text-base">
              我是 Nick，專注於商用播放系統與系統整合的軟體工程師，具備多年企業系統與實際商用部署經驗，
              涵蓋影音串流、醫療系統、ERP/WMS 與現場設備整合。主力開發 Android TV 公播與診所叫號系統，
              專注於長時間穩定運作、離線容錯與可維運架構設計。
            </p>

            <div className="mt-5 flex flex-wrap gap-2 sm:mt-6 sm:gap-3">
              <a
                href="#works"
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-slate-800 sm:px-5 sm:py-3"
              >
                查看作品
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-900 hover:bg-slate-50 sm:px-5 sm:py-3"
              >
                聯絡我
              </a>
            </div>

            <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
              {[
                { k: "定位", v: "系統整合型工程" },
                { k: "強項", v: "24/7 播放穩定性與維運、可維運架構設計、跨平台整合" },
                { k: "場景", v: "診所、公播、數位看板、現場設備整合、App 整合" },
              ].map((it) => (
                <div
                  key={it.k}
                  className="min-w-0 rounded-xl border border-slate-200 p-3 sm:p-4"
                >
                  <div className="text-xs font-medium text-slate-500">{it.k}</div>
                  <div className="mt-1 break-words font-semibold">{it.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Works */}
        <Section id="works" title="作品">
          <div className="grid gap-5 sm:gap-6">
            {works.map((w) => (
              <article
                key={w.title}
                className="min-w-0 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-6 md:p-8"
              >
                <div className="flex min-w-0 flex-col gap-5 md:flex-row md:items-start md:justify-between">
                  <div className="min-w-0 md:max-w-3xl">
                    <h3 className="text-base font-semibold sm:text-xl">{w.title}</h3>
                    <p className="mt-2 text-sm leading-6 text-slate-600 sm:text-base">
                      {w.subtitle}
                    </p>

                    <div className="mt-4 flex min-w-0 flex-wrap gap-2">
                      {w.tags.map((t) => (
                        <Chip key={t} text={t} />
                      ))}
                    </div>

                    <ul className="mt-5 list-disc space-y-2 pl-5 text-sm text-slate-700 sm:text-base">
                      {w.bullets.map((b) => (
                        <li key={b} className="break-words">
                          {b}
                        </li>
                      ))}
                    </ul>

                    {w.links.length ? (
                      <div className="mt-6 flex flex-wrap gap-3 text-sm">
                        {w.links.map((l) => (
                          <a
                            key={l.label}
                            href={l.href}
                            className="rounded-xl border border-slate-200 bg-white px-4 py-2 hover:bg-slate-50"
                          >
                            {l.label}
                          </a>
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>

                <ImageStrip images={w.images ?? []} title={w.title} />

                <div className="mt-6 grid gap-3 sm:mt-8 sm:grid-cols-3 sm:gap-4">
                  {w.highlights.map((h) => (
                    <div
                      key={h.label}
                      className="min-w-0 rounded-xl border border-slate-200 p-3 sm:p-4"
                    >
                      <div className="text-xs font-medium text-slate-500">{h.label}</div>
                      <div className="mt-1 break-words font-semibold">{h.value}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section id="stack" title="技術棧">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <Chip key={t} text={t} />
              ))}
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section id="contact" title="聯絡">
          <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-8">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="min-w-0">
                <div className="text-sm font-medium text-slate-600">姓名</div>
                <div className="mt-1 text-lg font-semibold sm:text-xl">Nick Chen</div>
                <p className="mt-3 text-sm leading-6 text-slate-600 sm:text-base">
                  專注於商用 Android TV 播放系統、診所叫號系統與端到端系統整合解決方案，涵蓋從概念驗證（PoC）、
                  系統架構設計、現場導入到長期維運與功能擴充，協助客戶將構想落地為可長期穩定運作的商用系統。
                </p>
              </div>

              <div className="flex min-w-0 flex-col gap-3 text-sm">
                <a
                  className="rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
                  href="mailto:nn840928@gmail.com"
                >
                  Email：nn840928@gmail.com
                </a>
                <a
                  className="rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50"
                  href="https://line.me/ti/p/VV3h7YjKu4"
                  target="_blank"
                  rel="noreferrer"
                >
                  Line：@nick8409
                </a>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto flex w-full max-w-5xl flex-col gap-2 px-3 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between sm:px-6">
            <div>© {new Date().getFullYear()} Nick Chen</div>
            <div>Built with React · Hosted on Netlify</div>
          </div>
        </footer>
      </main>

      <BackToTopButton />
    </div>
  );
}
