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
    links: [
      // { label: "Demo / 影片（可填）", href: "#" },
      // { label: "截圖集（可填）", href: "#" },
    ],
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
    // image: "/images/work2.png",
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
    <section id={id} className="mx-auto max-w-5xl px-6 py-14">
      <div className="mb-8">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        {subtitle ? <p className="mt-2 text-slate-600">{subtitle}</p> : null}
      </div>
      {children}
    </section>
  );
}

function Chip({ text }: { text: string }) {
  return (
    <span className="inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-sm text-slate-700">
      {text}
    </span>
  );
}

function ImageStrip({ images, title }: { images: string[]; title: string }) {
  const scrollerRef = React.useRef<HTMLDivElement | null>(null);
  const isDownRef = React.useRef(false);
  const startXRef = React.useRef(0);
  const scrollLeftRef = React.useRef(0);

  // 滑鼠拖曳（桌機很好用）
  const onMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    isDownRef.current = true;
    startXRef.current = e.pageX - el.offsetLeft;
    scrollLeftRef.current = el.scrollLeft;
  };

  const onMouseLeave = () => {
    isDownRef.current = false;
  };

  const onMouseUp = () => {
    isDownRef.current = false;
  };

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el || !isDownRef.current) return;
    e.preventDefault();
    const x = e.pageX - el.offsetLeft;
    const walk = (x - startXRef.current) * 1.2; // 拖曳速度係數
    el.scrollLeft = scrollLeftRef.current - walk;
  };

  // 箭頭按鈕：一次滑一張（依卡片寬估算）
  const scrollByCard = (dir: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 320; // 對應下面卡片寬 (w-80 = 20rem = 320px)
    el.scrollBy({ left: dir * (cardWidth + 16), behavior: "smooth" }); // + gap
  };

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between gap-3">
        <div className="text-sm font-medium text-slate-700">作品截圖</div>

        <div className="flex gap-2">
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
          "mt-3 flex gap-4 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-4",
          "scroll-smooth",
          "snap-x snap-mandatory",
          "cursor-grab active:cursor-grabbing",
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
            className="snap-start shrink-0"
            style={{ width: 320 }} // 中型卡片寬
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
      </div>
    </div>
  );
}

function BackToTopButton() {
  const [visible, setVisible] = React.useState(false);

  React.useEffect(() => {
    const onScroll = () => {
      // 滑超過 400px 才顯示
      setVisible(window.scrollY > 400);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="回到最上方"
      className={[
        "fixed bottom-6 right-6 z-50",
        "rounded-full border border-slate-200 bg-white p-3 shadow-lg",
        "hover:bg-slate-50 transition-all",
        "text-slate-700",
        visible ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
      ].join(" ")}
    >
      ↑ Top
    </button>
  );
}


export default function App() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      {/* Top Nav */}
      <header className="sticky top-0 z-10 border-b border-slate-200 bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
          <div className="font-semibold tracking-tight">Nick 作品集</div>
          <nav className="flex gap-5 text-sm text-slate-600">
            <a className="hover:text-slate-900" href="#works">
              作品
            </a>
            <a className="hover:text-slate-900" href="#architecture">
              架構
            </a>
            <a className="hover:text-slate-900" href="#stack">
              技術棧
            </a>
            <a className="hover:text-slate-900" href="#contact">
              聯絡
            </a>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <main>
        <section className="mx-auto max-w-5xl px-6 pb-10 pt-16">
          <div className="rounded-2xl border border-slate-200 bg-white p-10 shadow-sm">
            <h1 className="mt-3 text-4xl font-semibold tracking-tight">
              專案展示
            </h1>
            <p className="mt-4 max-w-2xl text-slate-600">
              我是 Nick，專注於商用播放系統與系統整合的軟體工程師，具備多年企業系統與實際商用部署經驗，
              涵蓋影音串流、醫療系統、ERP/WMS 與現場設備整合。主力開發 Android TV 公播與診所叫號系統，
              專注於長時間穩定運作、離線容錯與可維運架構設計。
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <a
                href="#works"
                className="rounded-xl bg-slate-900 px-5 py-3 text-sm font-medium text-white hover:bg-slate-800"
              >
                查看作品
              </a>
              <a
                href="#contact"
                className="rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-medium text-slate-900 hover:bg-slate-50"
              >
                聯絡我
              </a>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { k: "定位", v: "系統整合型工程" },
                { k: "強項", v: "24/7 播放穩定性與維運、可維運架構設計、跨平台整合" },
                { k: "場景", v: "診所、公播、數位看板、現場設備整合、app整合" },
              ].map((it) => (
                <div key={it.k} className="rounded-xl border border-slate-200 p-4">
                  <div className="text-xs font-medium text-slate-500">{it.k}</div>
                  <div className="mt-1 font-semibold">{it.v}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Works */}
        <Section
          id="works"
          title="作品"
        >
          <div className="grid gap-6">
            {works.map((w) => (
              <article key={w.title} className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
                  <div className="md:max-w-3xl">
                    <h3 className="text-xl font-semibold">{w.title}</h3>
                    <p className="mt-2 text-slate-600">{w.subtitle}</p>

                    <div className="mt-4 flex flex-wrap gap-2">
                      {w.tags.map((t) => (
                        <Chip key={t} text={t} />
                      ))}
                    </div>

                    <ul className="mt-5 list-disc space-y-2 pl-5 text-slate-700">
                      {w.bullets.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>

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
                  </div>

                  {/* Optional image placeholder */}
                </div>

                {w.images?.length ? <ImageStrip images={w.images} title={w.title} /> : null}


                <div className="mt-8 grid gap-4 sm:grid-cols-3">
                  {w.highlights.map((h) => (
                    <div key={h.label} className="rounded-xl border border-slate-200 p-4">
                      <div className="text-xs font-medium text-slate-500">{h.label}</div>
                      <div className="mt-1 font-semibold">{h.value}</div>
                    </div>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section id="stack" title="技術棧">
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="flex flex-wrap gap-2">
              {techStack.map((t) => (
                <Chip key={t} text={t} />
              ))}
            </div>
          </div>
        </Section>

        {/* Contact */}
        <Section
          id="contact"
          title="聯絡"
        >
          <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <div className="text-sm font-medium text-slate-600">姓名</div>
                <div className="mt-1 text-xl font-semibold">Nick Chen</div>
                <p className="mt-3 text-slate-600">
                  專注於商用 Android TV 播放系統、診所叫號系統與端到端系統整合解決方案，涵蓋從概念驗證（PoC）、
                  系統架構設計、現場導入到長期維運與功能擴充，協助客戶將構想落地為可長期穩定運作的商用系統。                </p>
              </div>
              <div className="flex flex-col gap-3 text-sm">
                <a className="rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50" href="mailto:nn840928@gmail.com">
                  Email：nn840928@gmail.com
                </a>
                <a className="rounded-xl border border-slate-200 px-4 py-3 hover:bg-slate-50" href="https://line.me/ti/p/VV3h7YjKu4" target="_blank" rel="noreferrer">
                  Line：@nick8409
                </a>
              </div>
            </div>
          </div>
        </Section>

        <footer className="border-t border-slate-200 bg-white py-8">
          <div className="mx-auto flex max-w-5xl items-center justify-between px-6 text-sm text-slate-500">
            <div>© {new Date().getFullYear()} Nick Chen</div>
            <div>Built with React · Hosted on Netlify</div>
          </div>
        </footer>
      </main>
      <BackToTopButton />
    </div>
  );
}
