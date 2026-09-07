"use client";
import {
  AnimatePresence,
  motion,
  useInView,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  ChevronDown,
  Download,
  Menu,
  Phone,
  ShieldCheck,
  X,
  CheckCircle2,
  ArrowUp,
} from "lucide-react";
import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import {
  articles,
  articlesEn,
  news,
  newsEn,
  serviceGroups,
  serviceGroupsEn,
} from "@/data/content";
import { HeroArt, ShieldArt } from "./Illustrations";

type Language = "ja" | "en";

const nav: Record<Language, [string, string][]> = {
  ja: [
    ["選ばれる理由", "#strength"],
    ["導入事例", "#cases"],
    ["料金", "#contact"],
    ["私たちについて", "#about"],
    ["コラム", "#column"],
    ["ニュース", "#news"],
  ],
  en: [
    ["Why us", "#strength"],
    ["Case studies", "#cases"],
    ["Contact", "#contact"],
    ["About us", "#about"],
    ["Insights", "#column"],
    ["News", "#news"],
  ],
};

const LanguageContext = createContext<{
  language: Language;
  setLanguage: (language: Language) => void;
}>({ language: "ja", setLanguage: () => undefined });

const useLanguage = () => useContext(LanguageContext);

function LanguageToggle({ dark = false }: { dark?: boolean }) {
  const { language, setLanguage } = useLanguage();
  const base = dark ? "border-white/25 text-white" : "border-ink/15 text-ink";
  return (
    <div
      className={`inline-flex rounded-full border p-1 text-[11px] font-black tracking-wide ${base}`}
      aria-label="Language selector"
    >
      {(["ja", "en"] as Language[]).map((item) => (
        <button
          key={item}
          type="button"
          onClick={() => setLanguage(item)}
          aria-pressed={language === item}
          className={`min-h-8 rounded-full px-3 transition ${language === item ? "bg-primary text-white" : (dark ? "hover:text-primary-light" : "hover:text-primary")}`}
        >
          {item === "ja" ? "JP" : "EN"}
        </button>
      ))}
    </div>
  );
}
function Logo({ light = false }: { light?: boolean }) {
  const { language } = useLanguage();
  return (
    <a
      href="#top"
      className="flex items-center gap-2 font-black leading-none"
      aria-label={language === "en" ? "Back to top" : "トップへ"}
    >
      <span className="grid h-9 w-9 place-items-center rounded-xl bg-primary text-white">
        <ShieldCheck size={23} />
      </span>
      <span className={light ? "text-white" : ""}>
        REPUTATION
        <br />
        <span className={`text-[10px] tracking-[.18em] ${light ? "text-primary-light" : "text-primary"}`}>
          GUARD CLOUD
        </span>
      </span>
    </a>
  );
}
export function Header() {
  const { language } = useLanguage();
  const groups = language === "en" ? serviceGroupsEn : serviceGroups;
  const navigation = nav[language];
  const [menu, setMenu] = useState(false),
    [mega, setMega] = useState(false),
    [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const f = () => setScrolled(scrollY > 20);
    f();
    addEventListener("scroll", f, { passive: true });
    return () => removeEventListener("scroll", f);
  }, []);
  useEffect(() => {
    if (!menu) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const desktop = matchMedia("(min-width: 1280px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenu(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.body.style.overflow = previousOverflow;
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [menu]);
  useEffect(() => {
    if (!menu && !mega) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenu(false);
        setMega(false);
      }
    };
    addEventListener("keydown", closeOnEscape);
    return () => removeEventListener("keydown", closeOnEscape);
  }, [menu, mega]);
  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 bg-white/95 backdrop-blur transition-shadow ${scrolled ? "shadow-md" : ""}`}
      >
        <div className="container-wide flex h-[76px] max-w-[1536px] items-center justify-between gap-4 whitespace-nowrap">
          <div className="shrink-0">
            <Logo />
          </div>
          <nav
            className="hidden h-full items-center gap-4 xl:flex 2xl:gap-6"
            aria-label={
              language === "en" ? "Main navigation" : "メインナビゲーション"
            }
          >
            <div
              className="flex h-full items-center"
              onMouseEnter={() => setMega(true)}
              onMouseLeave={() => setMega(false)}
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setMega(false);
                }
              }}
            >
              <button
                onClick={() => setMega(!mega)}
                aria-expanded={mega}
                aria-controls="service-menu"
                className="flex min-h-11 items-center gap-1 text-sm font-bold"
              >
                {language === "en" ? "Services" : "サービス"}
                <ChevronDown size={15} />
              </button>
              <AnimatePresence>
                {mega && (
                  <motion.div
                    id="service-menu"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute inset-x-0 top-full mx-auto w-[900px] whitespace-normal rounded-3xl border bg-white p-8 shadow-soft"
                  >
                    <p className="mb-5 text-xs font-bold tracking-widest text-primary">
                      SERVICE MENU
                    </p>
                    <div className="grid grid-cols-3 gap-6">
                      {groups.map((g) => (
                        <div key={g.id}>
                          <a
                            href={`#${g.id}`}
                            onClick={() => setMega(false)}
                            className="mb-3 block border-b pb-3 font-bold hover:text-primary"
                          >
                            {g.title}
                          </a>
                          {g.services.map((s) => (
                            <a
                              key={s[0]}
                              href={`#${g.id}`}
                              onClick={() => setMega(false)}
                              className="block py-1.5 text-sm text-slate-600 hover:text-primary"
                            >
                              {s[0]}
                            </a>
                          ))}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
            {navigation.map((n) => (
              <a
                key={n[0]}
                href={n[1]}
                className="text-sm font-bold hover:text-primary"
              >
                {n[0]}
              </a>
            ))}
          </nav>
          <div className="hidden shrink-0 xl:block">
            <LanguageToggle />
          </div>
          <div className="hidden shrink-0 gap-2 xl:flex">
            <button
              type="button"
              onClick={() => dispatchEvent(new Event("openResource"))}
              className="btn border border-primary bg-white px-4 text-primary hover:bg-primary/5 2xl:px-6"
            >
              {language === "en" ? "Download guide" : "資料ダウンロード"}
            </button>
            <a className="btn-primary" href="#contact">
              {language === "en" ? "Contact us" : "お問い合わせ"}
            </a>
          </div>
          <button
            className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-ink text-white xl:hidden"
            onClick={() => setMenu(true)}
            aria-expanded={menu}
            aria-controls="mobile-menu"
            aria-label={language === "en" ? "Open menu" : "メニューを開く"}
          >
            <Menu />
          </button>
        </div>
      </header>
      <AnimatePresence>
        {menu && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            className="fixed inset-x-0 top-0 z-[60] h-[100dvh] overflow-y-auto overscroll-contain bg-ink p-6 text-white xl:hidden"
          >
            <div className="flex items-center justify-between">
              <div onClick={() => setMenu(false)}>
                <Logo light />
              </div>
              <button
                className="grid h-12 w-12 place-items-center rounded-full border border-white/30"
                onClick={() => setMenu(false)}
                aria-label={
                  language === "en" ? "Close menu" : "メニューを閉じる"
                }
              >
                <X />
              </button>
            </div>
            <div className="mt-8">
              <LanguageToggle dark />
            </div>
            <nav
              className="mt-8"
              aria-label={
                language === "en"
                  ? "Mobile navigation"
                  : "モバイルナビゲーション"
              }
            >
              <p className="mb-4 text-xs text-primary-light">SERVICES</p>
              {groups.map((g) => (
                <a
                  onClick={() => setMenu(false)}
                  className="block border-b border-white/15 py-4 text-lg font-bold"
                  href={`#${g.id}`}
                  key={g.id}
                >
                  {g.title}
                </a>
              ))}
              {navigation.map((n) => (
                <a
                  onClick={() => setMenu(false)}
                  className="block border-b border-white/15 py-4 text-lg"
                  href={n[1]}
                  key={n[0]}
                >
                  {n[0]}
                </a>
              ))}
            </nav>
            <a
              onClick={() => setMenu(false)}
              className="btn-primary mt-8 w-full"
              href="#contact"
            >
              {language === "en"
                ? "Book a free consultation"
                : "無料で相談する"}
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
const Reveal = ({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.65 }}
    >
      {children}
    </motion.div>
  );
};
function Heading({
  en,
  children,
  center = false,
  light = false,
}: {
  en: string;
  children: React.ReactNode;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={center ? "text-center" : ""}>
      <p className={`eyebrow ${light ? "eyebrow-light" : ""}`}>{en}</p>
      <h2 className="section-title">{children}</h2>
    </div>
  );
}
function Hero() {
  const { language } = useLanguage();
  const english = language === "en";
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-cream pt-28 md:pt-40"
    >
      <div className="dot-grid absolute right-0 top-20 h-48 w-1/3 opacity-50" />
      <div className="container-wide relative grid min-h-[700px] items-center gap-8 pb-16 lg:grid-cols-[1.08fr_.92fr]">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="eyebrow">
            {english
              ? "Protection is only the beginning."
              : "守るだけでは、終わらない。"}
          </p>
          <h1 className="text-[clamp(2.65rem,5.3vw,5.4rem)] font-black leading-[1.14] tracking-[-.06em]">
            {english ? (
              <>
                Trust takes
                <br />
                time to build.
                <br />
              </>
            ) : (
              <>
                信頼を築くには
                <br />
                時間がかかる。
                <br />
              </>
            )}
            <span className="relative text-primary">
              {english
                ? "It can be lost in an instant."
                : "失うのは、ほんの一瞬。"}
              <svg
                className="absolute -bottom-3 left-0 w-full"
                viewBox="0 0 400 16"
              >
                <path
                  d="M4 10c105-9 253 5 392-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="6"
                  strokeLinecap="round"
                />
              </svg>
            </span>
          </h1>
          <p className="mt-10 max-w-xl text-base font-medium leading-8 text-slate-600 md:text-lg">
            {english ? (
              <>
                We combine data and human expertise to spot online risk early.
                <br className="hidden md:block" /> Protect the trust you have
                built and turn it into your next stage of growth.
              </>
            ) : (
              <>
                データと人の知見で、オンライン上のリスクをいち早く発見。
                <br className="hidden md:block" />
                企業の大切な信頼を守り、次の成長へつなげます。
              </>
            )}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a href="#contact" className="btn-primary">
              {english
                ? "Start with a free consultation"
                : "まずは無料で相談する"}
              <ArrowRight size={18} />
            </a>
            <button
              onClick={() => dispatchEvent(new Event("openResource"))}
              className="btn border border-ink bg-white"
            >
              {english ? "Download the guide" : "資料をダウンロード"}
              <Download size={18} />
            </button>
          </div>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative mx-auto max-w-[550px]"
        >
          <HeroArt />
          <span className="absolute -left-3 top-10 rotate-[-7deg] rounded-full bg-white px-5 py-3 text-sm font-black shadow-soft">
            24H MONITORING
          </span>
          <span className="absolute bottom-12 right-0 rotate-3 rounded-full bg-ink px-5 py-3 text-sm font-black text-white">
            TRUST × TECHNOLOGY
          </span>
        </motion.div>
      </div>
      <div className="border-y border-ink/10 bg-white py-4">
        <p className="whitespace-nowrap text-center text-xs font-bold tracking-[.28em] text-slate-500">
          MONITORING　/　ANALYSIS　/　STRATEGY　/　RESPONSE　/　GROWTH
        </p>
      </div>
    </section>
  );
}
function Services() {
  const { language } = useLanguage();
  const english = language === "en";
  const groups = english ? serviceGroupsEn : serviceGroups;
  return (
    <section className="py-24 md:py-36">
      <div className="container-wide">
        <Reveal>
          <div className="mx-auto max-w-3xl text-center">
            <Heading en="OUR SERVICES" center>
              {english ? (
                <>
                  Protect trust.
                  <br />
                  Grow what comes next.
                </>
              ) : (
                <>
                  信頼を守り、育てる。
                  <br />
                  すべてをひとつのチームで。
                </>
              )}
            </Heading>
            <p className="mt-7 leading-8 text-slate-600">
              {english
                ? "From prevention and response to growth, we design the right answer for the challenge in front of you."
                : "予防・対策・成長の3つの視点から、企業ごとの課題に最適な答えを設計します。"}
            </p>
          </div>
        </Reveal>
      </div>
      <div className="mt-24 space-y-8 md:space-y-16">
        {groups.map((g, i) => (
          <section id={g.id} key={g.id} className={`${g.tone} py-20`}>
            <div className="container-wide">
              <Reveal
                className={`grid items-end gap-8 lg:grid-cols-2 ${i % 2 ? "lg:[&>*:first-child]:order-2" : ""}`}
              >
                <div>
                  <span className="text-xs font-black tracking-[.22em] text-primary">
                    0{i + 1} / {g.en}
                  </span>
                  <h3 className="mt-4 text-3xl font-black md:text-5xl">
                    {g.title}
                  </h3>
                  <p className="mt-6 max-w-xl leading-8 text-slate-600">
                    {g.desc}
                  </p>
                </div>
                <div className="mx-auto w-56">
                  <ShieldArt index={i} />
                </div>
              </Reveal>
              <div className="mt-12 grid gap-5 md:grid-cols-3">
                {g.services.map((s, j) => (
                  <Reveal key={s[0]}>
                    <a
                      href="#contact"
                      className="group flex h-full min-h-[260px] flex-col rounded-[28px] border border-black/5 bg-white p-7 shadow-sm transition duration-300 hover:-translate-y-2 hover:shadow-soft"
                    >
                      <span className="text-xs font-black text-primary">
                        SERVICE {s[2]}
                      </span>
                      <h4 className="mt-10 text-xl font-black">{s[0]}</h4>
                      <p className="mt-4 text-sm leading-7 text-slate-600">
                        {s[1]}
                      </p>
                      <span className="mt-auto flex items-center justify-between pt-7 text-sm font-bold">
                        {english ? "Explore service" : "詳しく見る"}{" "}
                        <i className="grid h-10 w-10 place-items-center rounded-full bg-ink text-white transition group-hover:bg-primary">
                          <ArrowRight size={16} />
                        </i>
                      </span>
                    </a>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
    </section>
  );
}
function Count({ value, suffix }: { value: number; suffix: string | number }) {
  const ref = useRef(null),
    on = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!on) return;
    let start = 0;
    const id = setInterval(() => {
      start += Math.ceil(value / 35);
      setN(Math.min(start, value));
      if (start >= value) clearInterval(id);
    }, 28);
    return () => clearInterval(id);
  }, [on, value]);
  return (
    <span ref={ref}>
      {n}
      <small className="text-2xl text-primary-light md:text-3xl">{suffix}</small>
    </span>
  );
}
function Statistics() {
  const { language } = useLanguage();
  const english = language === "en";
  const stats: [number, string, string][] = english
    ? [
        [500, "+", "Businesses supported"],
        [94, "%", "Successful risk responses"],
        [10, "+ years", "Specialist experience"],
      ]
    : [
        [500, "社+", "支援企業数"],
        [94, "%", "リスク対応成功率"],
        [10, "年+", "専門領域での経験"],
      ];
  return (
    <section id="strength" className="overflow-hidden bg-ink py-24 text-white">
      <div className="container-wide">
        <Heading en="WHY CHOOSE US" light>
          {english
            ? "The numbers behind our partnership."
            : "数字で見る、選ばれる理由。"}
        </Heading>
        <div className="mt-16 grid gap-px overflow-hidden rounded-3xl bg-white/20 md:grid-cols-3">
          {stats.map((x) => (
            <div key={x[2]} className="bg-ink p-8 text-center md:p-12">
              <div className="text-6xl font-black tracking-tighter md:text-7xl">
                <Count value={x[0] as number} suffix={x[1]} />
              </div>
              <p className="mt-5 text-sm font-bold tracking-widest">{x[2]}</p>
            </div>
          ))}
        </div>
        <p className="mt-5 text-right text-xs text-white/50">
          {english
            ? "Figures as of July 2026; compiled by our team."
            : "※ 2026年7月時点・当社集計による"}
        </p>
      </div>
    </section>
  );
}
function Cases() {
  const { language } = useLanguage();
  const english = language === "en";
  const cases = english
    ? [
        {
          badge: "Food manufacturer",
          name: "Kitahama Foods (name changed)",
          metric: "68",
          unit: "%",
          metricLabel: "Fewer negative mentions",
          result: "A clear response plan replaced uncertainty with focus.",
          problem:
            "Unfounded posts spread quickly, bringing a surge of enquiries. The team had no established response process.",
          quote:
            "We could finally see the situation clearly and make decisions with confidence. Having a partner beside us made all the difference.",
          tone: "bg-[linear-gradient(135deg,#fff8f2_0%,#fee0cc_100%)]",
        },
        {
          badge: "Talent services",
          name: "Atlas Career (name changed)",
          metric: "41",
          unit: "%",
          metricLabel: "Higher application conversion",
          result:
            "A more accurate company story now reaches the right candidates.",
          problem:
            "Outdated search results were affecting recruitment, so candidates could not see the organization as it is today.",
          quote:
            "We gained more than a defensive response. Building our communications foundation together led directly to better results.",
          tone: "bg-[linear-gradient(135deg,#f6f9fc_0%,#dce7f0_100%)]",
        },
      ]
    : [
        {
          badge: "食品メーカー",
          name: "北浜フーズ株式会社（仮名）",
          metric: "68",
          unit: "%",
          metricLabel: "ネガティブ言及を改善",
          result: "混乱した状況を整理し、対応の優先順位を明確に。",
          problem:
            "根拠のない投稿が拡散し、問い合わせが急増。社内に対応ノウハウがありませんでした。",
          quote:
            "状況が整理され、迷わず判断できるようになりました。伴走してくれる安心感が大きいです。",
          tone: "bg-[linear-gradient(135deg,#fff8f2_0%,#fee0cc_100%)]",
        },
        {
          badge: "人材サービス",
          name: "アトラスキャリア株式会社（仮名）",
          metric: "41",
          unit: "%",
          metricLabel: "応募転換率が向上",
          result: "現在の企業像を、候補者へ的確に届けられる状態へ。",
          problem:
            "検索時の古い情報が採用活動に影響。会社の現在の姿が候補者に伝わっていませんでした。",
          quote:
            "守りの対策だけでなく、発信の軸まで一緒につくれたことが成果につながりました。",
          tone: "bg-[linear-gradient(135deg,#f6f9fc_0%,#dce7f0_100%)]",
        },
      ];
  return (
    <section
      id="cases"
      className="relative overflow-hidden bg-cream py-24 md:py-36"
    >
      <div className="dot-grid absolute -left-16 top-36 h-72 w-72 opacity-50" />
      <div className="container-wide relative">
        <Reveal>
          <div className="grid items-end gap-7 lg:grid-cols-[1fr_.72fr]">
            <Heading en="SUCCESS STORIES">
              {english ? (
                <>
                  When trust changes,
                  <br />
                  business changes.
                </>
              ) : (
                <>
                  信頼が変わると、
                  <br />
                  ビジネスが変わる。
                </>
              )}
            </Heading>
            <p className="max-w-md border-l-2 border-primary pl-5 leading-8 text-slate-600 lg:mb-1 lg:justify-self-end">
              {english
                ? "Beyond the numbers, these stories show the change teams feel every day when we take on the challenge together."
                : "数字だけでは測れない、現場の変化まで。課題に向き合い、ともに前へ進んだお客様の声をご紹介します。"}
            </p>
          </div>
        </Reveal>
        <div className="mt-14 grid grid-cols-1 gap-7 lg:grid-cols-2">
          {cases.map((c, i) => (
            <Reveal key={c.name}>
              <article className="group h-full overflow-hidden rounded-[32px] border border-ink/10 bg-white p-2 shadow-soft transition duration-500 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(23,32,51,.15)]">
                <div
                  className={`relative min-h-[270px] overflow-hidden rounded-[25px] p-7 md:p-9 ${c.tone}`}
                >
                  <span className="absolute -bottom-12 -right-2 text-[11rem] font-black leading-none tracking-tighter text-ink/[.05]">
                    0{i + 1}
                  </span>
                  <div className="relative flex flex-wrap items-center justify-between gap-3">
                    <span className="rounded-full border border-ink/10 bg-white/80 px-4 py-2 text-[10px] font-black tracking-[.16em] text-ink">
                      CASE STUDY 0{i + 1}
                    </span>
                    <span className="rounded-full bg-ink px-4 py-2 text-xs font-bold text-white">
                      {c.badge}
                    </span>
                  </div>
                  <div className="relative mt-10 grid grid-cols-[minmax(0,1fr)_80px] items-end gap-4 sm:grid-cols-[1fr_auto]">
                    <div>
                      <p className="text-sm font-bold text-slate-600">
                        {c.metricLabel}
                      </p>
                      <p className="mt-1 text-[clamp(4.5rem,10vw,6.5rem)] font-black leading-none tracking-[-.08em] text-ink">
                        {c.metric}
                        <span className="ml-1 text-3xl tracking-normal text-primary md:text-4xl">
                          {c.unit}
                        </span>
                      </p>
                    </div>
                    <div className="w-20 rotate-[-5deg] transition duration-500 group-hover:rotate-0 sm:w-28 md:w-36">
                      <ShieldArt index={i} />
                    </div>
                  </div>
                </div>
                <div className="p-6 pb-7 md:p-8 md:pb-8">
                  <p className="text-sm font-bold text-slate-500">{c.name}</p>
                  <h3 className="mt-3 text-xl font-black leading-8 text-ink md:text-2xl">
                    {c.result}
                  </h3>
                  <div className="mt-6 grid gap-5 border-y border-ink/10 py-5">
                    <div>
                      <p className="text-[10px] font-black tracking-[.18em] text-primary">
                        CHALLENGE
                      </p>
                      <p className="mt-2 text-sm leading-7 text-slate-600">
                        {c.problem}
                      </p>
                    </div>
                    <blockquote className="relative border-l-2 border-ink pl-4 text-sm font-bold leading-7 text-ink">
                      <span className="absolute -top-3 left-3 text-4xl leading-none text-primary">
                        “
                      </span>
                      <span className="block pt-3">{c.quote}</span>
                    </blockquote>
                  </div>
                  <button
                    onClick={() => dispatchEvent(new Event("openContact"))}
                    className="mt-6 inline-flex min-h-11 items-center gap-2 text-sm font-black transition hover:gap-3 hover:text-primary"
                  >
                    {english
                      ? "Discuss a similar challenge"
                      : "同様の課題を相談する"}{" "}
                    <span className="grid h-8 w-8 place-items-center rounded-full bg-ink text-white transition group-hover:bg-primary">
                      <ArrowRight size={15} />
                    </span>
                  </button>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
function ContactCTA() {
  const { language } = useLanguage();
  const english = language === "en";
  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-primary py-20 text-white md:py-28"
    >
      <div className="absolute -right-16 -top-24 h-80 w-80 rounded-full border-[55px] border-white/10" />
      <div className="container-wide relative grid items-center gap-10 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="text-xs font-black tracking-[.22em]">
            FREE RISK ASSESSMENT
          </p>
          <h2 className="mt-5 text-4xl font-black leading-tight md:text-6xl">
            {english ? (
              <>
                You do not have to
                <br />
                carry that concern alone.
              </>
            ) : (
              <>
                その不安、
                <br />
                ひとりで抱えないでください。
              </>
            )}
          </h2>
          <p className="mt-6 max-w-2xl leading-8">
            {english
              ? "Our specialists will assess where you are today and make the next steps clear—with no cost or obligation."
              : "現状を無料で診断し、いま取るべきアクションを専門家がわかりやすくご案内します。"}
          </p>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => dispatchEvent(new Event("openContact"))}
              className="btn bg-white text-primary hover:bg-ink hover:text-white"
            >
              {english
                ? "Request a free risk assessment"
                : "無料リスク診断を申し込む"}
              <ArrowRight size={18} />
            </button>
            <a
              href="tel:0312345678"
              className="flex items-center gap-3 font-black"
            >
              <Phone />
              03-1234-5678{" "}
              <small className="font-medium">
                {english ? "Weekdays 9:00–18:00 JST" : "平日 9:00–18:00"}
              </small>
            </a>
          </div>
        </div>
        <div className="hidden lg:block">
          <HeroArt />
        </div>
      </div>
    </section>
  );
}
function Resource() {
  const { language } = useLanguage();
  const english = language === "en";
  return (
    <section className="bg-cream py-24">
      <div className="container-wide">
        <Reveal>
          <div className="grid grid-cols-1 overflow-hidden rounded-[36px] bg-white shadow-soft md:grid-cols-[minmax(0,.8fr)_minmax(0,1.2fr)]">
            <div className="grid min-h-[380px] place-items-center bg-ink p-6 sm:p-10">
              <div className="w-56 max-w-full rotate-[-5deg] rounded-lg bg-white p-7 shadow-2xl">
                <p className="text-xs font-black text-primary">SPECIAL GUIDE</p>
                <div className="my-8 h-1 w-12 bg-primary" />
                <p className="text-2xl font-black leading-tight">
                  {english ? (
                    <>
                      Protecting business trust
                      <br />A practical guide to
                      <br />
                      online risk
                    </>
                  ) : (
                    <>
                      企業の信頼を守る
                      <br />
                      リスク対策
                      <br />
                      実践ガイド
                    </>
                  )}
                </p>
                <ShieldArt />
              </div>
            </div>
            <div className="flex flex-col justify-center p-6 sm:p-8 md:p-14">
              <p className="eyebrow">FREE DOWNLOAD</p>
              <h2 className="text-3xl font-black md:text-4xl">
                {english ? (
                  <>
                    Your first guide to
                    <br />
                    online reputation risk
                  </>
                ) : (
                  <>
                    はじめての
                    <br />
                    オンライン風評対策ガイド
                  </>
                )}
              </h2>
              <p className="mt-6 leading-8 text-slate-600">
                {english
                  ? "From finding early warning signs to building an internal response system, this guide covers the essentials your team needs."
                  : "リスクの見つけ方から社内体制づくりまで、担当者が知っておきたい基礎を一冊にまとめました。"}
              </p>
              <button
                onClick={() => dispatchEvent(new Event("openResource"))}
                className="btn-primary mt-8 self-start"
              >
                {english ? "Download for free" : "無料でダウンロード"}
                <Download size={18} />
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
function Content() {
  const { language } = useLanguage();
  const english = language === "en";
  const localizedArticles = english ? articlesEn : articles;
  const localizedNews = english ? newsEn : news;
  return (
    <>
      <section id="column" className="py-24 md:py-32">
        <div className="container-wide">
          <div className="flex items-end justify-between">
            <Heading en="KNOWLEDGE COLUMN">
              {english ? "Ideas for earning trust." : "信頼を育てるヒント。"}
            </Heading>
            <a
              className="hidden font-bold md:flex items-center gap-2"
              href="#column"
            >
              {english ? "All insights" : "記事一覧"} <ArrowRight size={16} />
            </a>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {localizedArticles.map((a, i) => (
              <Reveal key={a.title}>
                <article className="group">
                  <a href="#column">
                    <div
                      className={`dot-grid relative h-52 overflow-hidden rounded-3xl ${a.color}`}
                    >
                      <span className="absolute bottom-5 right-6 text-7xl font-black text-ink/10">
                        0{i + 1}
                      </span>
                      <ShieldArt index={i} />
                    </div>
                    <div className="pt-5">
                      <p className="text-xs font-bold text-primary">
                        {a.category}　
                        <span className="text-slate-400">{a.date}</span>
                      </p>
                      <h3 className="mt-3 text-xl font-black leading-8 group-hover:text-primary">
                        {a.title}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-slate-500">
                        {a.excerpt}
                      </p>
                    </div>
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <section id="news" className="bg-mist py-24">
        <div className="container-wide grid gap-12 lg:grid-cols-[.35fr_.65fr]">
          <Heading en="LATEST NEWS">
            {english ? "Latest news" : "新着情報"}
          </Heading>
          <div>
            {localizedNews.map((n) => (
              <a
                key={n[2]}
                href="#news"
                className="group grid gap-2 border-b border-ink/15 py-6 md:grid-cols-[110px_100px_1fr_30px]"
              >
                <time className="text-sm text-slate-500">{n[0]}</time>
                <span className="text-xs font-bold text-primary">{n[1]}</span>
                <span className="font-bold group-hover:text-primary">
                  {n[2]}
                </span>
                <ArrowRight
                  className="transition group-hover:translate-x-1"
                  size={18}
                />
              </a>
            ))}
            <a
              className="mt-8 inline-flex items-center gap-2 font-bold"
              href="#news"
            >
              {english ? "All news" : "ニュース一覧へ"} <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
function Modal({
  type,
  onClose,
}: {
  type: "contact" | "resource";
  onClose: () => void;
}) {
  const { language } = useLanguage();
  const english = language === "en";
  const [done, setDone] = useState(false),
    ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const opener = document.activeElement instanceof HTMLElement
      ? document.activeElement
      : null;
    const key = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Tab") {
        const els = ref.current?.querySelectorAll<HTMLElement>(
          "button,input,textarea",
        );
        if (!els?.length) return;
        const first = els[0],
          last = els[els.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    addEventListener("keydown", key);
    ref.current?.querySelector<HTMLElement>("button")?.focus();
    return () => {
      removeEventListener("keydown", key);
      opener?.focus({ preventScroll: true });
    };
  }, [onClose]);
  useEffect(() => {
    if (done) ref.current?.querySelector<HTMLElement>("button")?.focus();
  }, [done]);
  return (
    <motion.div
      className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-ink/70 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <motion.div
        ref={ref}
        initial={{ scale: 0.95, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        className="my-auto w-full max-w-xl shrink-0 rounded-3xl bg-white p-6 md:p-10"
      >
        <button
          onClick={onClose}
          className="float-right grid h-11 w-11 place-items-center rounded-full bg-mist"
          aria-label={english ? "Close" : "閉じる"}
        >
          <X />
        </button>
        {done ? (
          <div className="py-16 text-center">
            <CheckCircle2 className="mx-auto text-primary" size={60} />
            <h2 id="modal-title" className="mt-6 text-2xl font-black">
              {english
                ? "Thank you for your enquiry"
                : "送信ありがとうございました"}
            </h2>
            <p className="mt-4 text-slate-600">
              {english
                ? "A member of our team will be in touch. (Demo form)"
                : "担当者よりご案内いたします。（デモ送信）"}
            </p>
            <button className="btn-dark mt-8" onClick={onClose}>
              {english ? "Close" : "閉じる"}
            </button>
          </div>
        ) : (
          <>
            <p className="eyebrow">
              {type === "contact" ? "CONTACT" : "DOWNLOAD"}
            </p>
            <h2 id="modal-title" className="text-2xl font-black">
              {type === "contact"
                ? english
                  ? "Request a free risk assessment"
                  : "無料リスク診断のお申し込み"
                : english
                  ? "Download the guide"
                  : "資料ダウンロード"}
            </h2>
            <form
              className="mt-8 space-y-5"
              onSubmit={(e) => {
                e.preventDefault();
                setDone(true);
              }}
            >
              <label className="block text-sm font-bold">
                {english ? "Company name" : "会社名"}
                <span className="text-primary"> *</span>
                <input
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border px-4 font-normal"
                  placeholder={english ? "Acme Inc." : "株式会社〇〇"}
                />
              </label>
              <label className="block text-sm font-bold">
                {english ? "Email address" : "メールアドレス"}
                <span className="text-primary"> *</span>
                <input
                  required
                  type="email"
                  className="mt-2 min-h-12 w-full rounded-xl border px-4 font-normal"
                  placeholder="name@example.com"
                />
              </label>
              <label className="block text-sm font-bold">
                {english ? "Your name" : "お名前"}
                <span className="text-primary"> *</span>
                <input
                  required
                  className="mt-2 min-h-12 w-full rounded-xl border px-4 font-normal"
                />
              </label>
              {type === "contact" && (
                <label className="block text-sm font-bold">
                  {english ? "How can we help?" : "ご相談内容"}
                  <textarea
                    required
                    className="mt-2 min-h-28 w-full rounded-xl border p-4 font-normal"
                  />
                </label>
              )}
              <label className="flex items-start gap-3 text-sm font-normal">
                <input required type="checkbox" className="mt-1 h-5 w-5" />
                {english
                  ? "I agree to the privacy policy"
                  : "プライバシーポリシーに同意します"}
              </label>
              <button className="btn-primary w-full" type="submit">
                {english ? "Send enquiry" : "送信する"}
                <ArrowRight size={18} />
              </button>
            </form>
          </>
        )}
      </motion.div>
    </motion.div>
  );
}
function Footer() {
  const { language } = useLanguage();
  const english = language === "en";
  const groups = english ? serviceGroupsEn : serviceGroups;
  const navigation = nav[language];
  return (
    <footer id="about" className="bg-[#101725] pb-24 pt-20 text-white md:pb-10">
      <div className="container-wide">
        <div className="grid gap-12 border-b border-white/15 pb-16 lg:grid-cols-[1.2fr_2fr]">
          <div>
            <Logo light />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/60">
              {english
                ? "We unite data and human expertise to protect the trust your organization has earned and support sustainable growth."
                : "データと人の知見をひとつに。企業の信頼を守り、持続的な成長を支えるレピュテーションパートナーです。"}
            </p>
            <p className="mt-6 text-sm">
              <Phone className="mr-2 inline" size={16} />
              03-1234-5678
              <br />
              <span className="ml-7 text-white/50">
                {english ? "Weekdays 9:00–18:00 JST" : "平日 9:00–18:00"}
              </span>
            </p>
          </div>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3">
            <div>
              <p className="mb-4 text-xs font-bold text-primary-light">SERVICES</p>
              {groups.map((g) => (
                <a
                  className="block py-2 text-sm text-white/70 hover:text-white"
                  href={`#${g.id}`}
                  key={g.id}
                >
                  {g.title}
                </a>
              ))}
            </div>
            <div>
              <p className="mb-4 text-xs font-bold text-primary-light">COMPANY</p>
              {navigation.slice(0, 4).map((n) => (
                <a
                  className="block py-2 text-sm text-white/70 hover:text-white"
                  href={n[1]}
                  key={n[0]}
                >
                  {n[0]}
                </a>
              ))}
            </div>
            <div>
              <p className="mb-4 text-xs font-bold text-primary-light">CONTENTS</p>
              {navigation.slice(4).map((n) => (
                <a
                  className="block py-2 text-sm text-white/70 hover:text-white"
                  href={n[1]}
                  key={n[0]}
                >
                  {n[0]}
                </a>
              ))}
              <a className="block py-2 text-sm text-white/70" href="#">
                {english ? "Privacy policy" : "プライバシーポリシー"}
              </a>
              <a className="block py-2 text-sm text-white/70" href="#">
                {english ? "Terms of use" : "利用規約"}
              </a>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5 pt-8 text-xs text-white/40 md:flex-row md:justify-between">
          <p>© 2026 Reputation Guard Cloud Inc.</p>
          <p>
            {english
              ? "This is a demonstration website for a fictional company."
              : "このサイトは架空の企業によるデモサイトです。"}
          </p>
        </div>
      </div>
    </footer>
  );
}
function Floating() {
  const { language } = useLanguage();
  const english = language === "en";
  const [show, setShow] = useState(false);
  useEffect(() => {
    const f = () => setShow(scrollY > 500);
    addEventListener("scroll", f);
    return () => removeEventListener("scroll", f);
  }, []);
  return (
    <>
      {show && (
        <button
          onClick={() => scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-24 right-5 z-40 grid h-12 w-12 place-items-center rounded-full bg-white text-ink shadow-soft md:bottom-6"
          aria-label={english ? "Back to top" : "ページ上部へ"}
        >
          <ArrowUp />
        </button>
      )}
      <div className="fixed bottom-0 inset-x-0 z-30 grid grid-cols-2 border-t bg-white p-2 md:hidden">
        <button
          onClick={() => dispatchEvent(new Event("openResource"))}
          className="btn-dark rounded-r-none"
        >
          <Download size={16} />
          {english ? "Guide" : "資料請求"}
        </button>
        <button
          onClick={() => dispatchEvent(new Event("openContact"))}
          className="btn-primary rounded-l-none"
        >
          {english ? "Free consultation" : "無料相談"}
          <ArrowRight size={16} />
        </button>
      </div>
      <div className="fixed right-0 top-1/2 z-30 hidden -translate-y-1/2 overflow-hidden rounded-l-2xl shadow-soft xl:block">
        <button
          onClick={() => dispatchEvent(new Event("openContact"))}
          className="vertical min-h-40 bg-primary px-4 py-5 text-sm font-bold text-white"
        >
          {english ? "Free consultation" : "無料相談はこちら"}
        </button>
        <button
          onClick={() => dispatchEvent(new Event("openResource"))}
          className="vertical min-h-40 bg-white px-4 py-5 text-sm font-bold"
        >
          {english ? "Download guide" : "資料ダウンロード"}
        </button>
      </div>
    </>
  );
}
export default function Site() {
  const [modal, setModal] = useState<null | "contact" | "resource">(null);
  const [language, setLanguage] = useState<Language>("ja");
  const closeModal = useCallback(() => setModal(null), []);
  useEffect(() => {
    const c = () => setModal("contact"),
      r = () => setModal("resource");
    addEventListener("openContact", c);
    addEventListener("openResource", r);
    return () => {
      removeEventListener("openContact", c);
      removeEventListener("openResource", r);
    };
  }, []);
  useEffect(() => {
    document.body.style.overflow = modal ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [modal]);
  useEffect(() => {
    const saved = localStorage.getItem("reputation-guard-language");
    if (saved === "ja" || saved === "en") setLanguage(saved);
  }, []);
  useEffect(() => {
    document.documentElement.lang = language;
    localStorage.setItem("reputation-guard-language", language);
  }, [language]);
  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      <Header />
      <main>
        <Hero />
        <Services />
        <Statistics />
        <Cases />
        <ContactCTA />
        <Resource />
        <Content />
      </main>
      <Footer />
      <Floating />
      <AnimatePresence>
        {modal && <Modal type={modal} onClose={closeModal} />}
      </AnimatePresence>
    </LanguageContext.Provider>
  );
}
