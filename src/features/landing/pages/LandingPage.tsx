import {
  ArrowLeftIcon,
  ArrowUpLeftIcon,
  MoonIcon,
  SunIcon,
  TruckIcon,
} from "lucide-react"
import { Link } from "react-router-dom"

import { BlurFade } from "@/components/ui/blur-fade"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { TextAnimate } from "@/components/ui/text-animate"
import { ROUTES } from "@/constants/routes"
import { useTheme } from "@/hooks/useTheme"

const taskScopeItems = [
  {
    num: "01",
    title: "قائمة الطلبات وحالاتها",
    detail:
      "عرض رقم الطلب، اسم الزبون، المبلغ، التاريخ، والحالة (جديد، في الطريق، تم التوصيل) لأكثر من 20 طلباً.",
  },
  {
    num: "02",
    title: "البحث والترتيب الفوري",
    detail:
      "البحث المباشر باسم الزبون مع إمكانية ترتيب الطلبات حسب التاريخ أو المبلغ لتسريع عمل موظفي المتابعة.",
  },
  {
    num: "03",
    title: "معالجة حالات الواجهة",
    detail:
      "رسائل واضحة أثناء التحميل، وعند حدوث خطأ مع زر إعادة المحاولة، وعند عدم تطابق البحث مع أي طلب.",
  },
  {
    num: "04",
    title: "تجربة عربية متجاوبة",
    detail:
      "بناء كامل من اليمين لليسار (RTL) يعمل بوضوح وسرعة على شاشات الجوال والكمبيوتر.",
  },
] as const

const developerLinks = [
  {
    label: "المعرض الشخصي",
    handle: "al9wel.netlify.app",
    href: "https://al9wel.netlify.app/",
  },
  {
    label: "GitHub",
    handle: "@al9wel",
    href: "https://github.com/al9wel",
  },
  {
    label: "LinkedIn",
    handle: "@al9wel",
    href: "https://www.linkedin.com/in/al9wel",
  },
  {
    label: "البريد الإلكتروني",
    handle: "sa.al9wel@gmail.com",
    href: "mailto:sa.al9wel@gmail.com",
  },
  {
    label: "واتساب",
    handle: "+967 736 584 524",
    href: "https://wa.me/967736584524",
  },
] as const

const LandingPage = () => {
  const { theme, toggleTheme } = useTheme()

  return (
    <div className="flex min-h-svh flex-col bg-sidebar text-foreground">
      {/* Top Bar (matches outer frame) */}
      <header className="bg-sidebar">
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-4 sm:px-6">
          <Link className="flex items-center gap-3" to={ROUTES.PUBLIC.HOME}>
            <span className="flex size-9 items-center justify-center rounded-lg bg-brand-lime text-brand-lime-foreground">
              <TruckIcon className="size-5" />
            </span>
            <span className="font-bold text-xl tracking-tight">وصّل</span>
            <span className="hidden rounded-md border border-sidebar-border bg-card/80 px-2.5 py-0.5 font-mono text-muted-foreground text-xs sm:inline-block">
              #56
            </span>
          </Link>

          <div className="flex items-center gap-2.5">
            <Button
              aria-label={
                theme === "light" ? "تفعيل الوضع الداكن" : "تفعيل الوضع الفاتح"
              }
              className="border-sidebar-border bg-card/80 hover:bg-card"
              onClick={toggleTheme}
              size="icon"
              variant="outline"
            >
              {theme === "light" ? <MoonIcon /> : <SunIcon />}
            </Button>
            <Button asChild size="default">
              <Link to={ROUTES.DASHBOARD.MAIN}>
                لوحة التحكم
                <ArrowLeftIcon aria-hidden="true" data-icon="inline-end" />
              </Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Framed Rounded Card Surface */}
      <div className="mx-2.5 mb-2.5 flex flex-1 flex-col rounded-2xl border border-sidebar-border/90 bg-background shadow-xs sm:mx-4 sm:mb-4">
        <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-between px-5 py-12 sm:px-8 sm:py-16">
          {/* Section 01 — Editorial Hero */}
          <section className="flex flex-col items-start gap-7 pb-14 sm:pb-16">
            <BlurFade blur="5px" delay={0.1} duration={0.65} offset={8}>
              <div className="flex flex-wrap items-center gap-2.5 text-sm">
                <span className="rounded-md bg-brand-lime px-2.5 py-0.5 font-bold font-mono text-brand-lime-foreground text-xs">
                  01
                </span>
                <span className="font-medium text-muted-foreground">
                  مهمة عملية · قسم البرمجة · الواجهات الأمامية
                </span>
              </div>
            </BlurFade>

            <TextAnimate
              animation="blurInUp"
              as="h1"
              by="word"
              className="max-w-3xl font-bold text-4xl text-foreground leading-[1.25] tracking-tight sm:text-6xl"
              delay={0.22}
              duration={0.9}
              once
              startOnView={false}
            >
              صفحة طلبات «وصّل» للتوصيل
            </TextAnimate>

            <BlurFade blur="5px" delay={0.48} duration={0.7} offset={8}>
              <p className="max-w-2xl text-lg text-muted-foreground leading-relaxed sm:text-xl">
                واجهة ويب مبنية لموظفي شركة «وصّل» للتوصيل في صنعاء لمتابعة
                عشرات الطلبات اليومية في مكان واحد منظم — تتيح البحث الفوري باسم
                الزبون وترتيب الطلبات بمرونة على الجوال والكمبيوتر بدلاً من
                ملفات Excel.
              </p>
            </BlurFade>

            <BlurFade blur="5px" delay={0.68} duration={0.7} offset={8}>
              <div className="flex flex-wrap items-center gap-3.5 pt-2">
                <Button asChild size="lg">
                  <Link to={ROUTES.DASHBOARD.ORDERS}>
                    فتح صفحة الطلبات
                    <ArrowLeftIcon aria-hidden="true" data-icon="inline-end" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to={ROUTES.DASHBOARD.MAIN}>استعراض لوحة التحكم</Link>
                </Button>
              </div>
            </BlurFade>
          </section>

          <Separator />

          {/* Section 02 & 03 — Asymmetric Editorial Grid */}
          <BlurFade blur="5px" delay={0.86} duration={0.75} offset={10}>
            <section className="grid grid-cols-1 gap-10 py-12 lg:grid-cols-[0.88fr_1.12fr] lg:gap-12">
              {/* Developer Column */}
              <div className="flex flex-col justify-between gap-7 lg:border-border lg:border-e lg:pe-10">
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-2.5 text-sm">
                    <span className="rounded-md bg-brand-lime px-2.5 py-0.5 font-bold font-mono text-brand-lime-foreground text-xs">
                      02
                    </span>
                    <span className="font-semibold text-muted-foreground">
                      مقدّم المهمة
                    </span>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <h2 className="font-bold text-2xl text-foreground sm:text-3xl">
                      سالم أحمد سعيد الصويل
                    </h2>
                    <p className="font-medium text-base text-muted-foreground">
                      Frontend Developer · مطوّر واجهات أمامية
                    </p>
                  </div>

                  <p className="text-base text-muted-foreground leading-relaxed">
                    هذا المشروع مُنجز كحل للمهمة العملية رقم{" "}
                    <span className="font-mono font-semibold text-foreground">
                      #56
                    </span>{" "}
                    الخاصة بفريق التوظيف في إيفان كود، مع التركيز على نظافة
                    المعمارية، تقسيم الميزات، وبساطة تجربة المستخدم.
                  </p>
                </div>

                <div className="flex flex-col divide-y divide-border rounded-xl border bg-card">
                  {developerLinks.map((item) => {
                    const isMail = item.href.startsWith("mailto:")
                    return (
                      <a
                        className="group flex items-center justify-between px-4 py-3 text-base transition-colors hover:bg-muted/60"
                        href={item.href}
                        key={item.label}
                        rel={isMail ? undefined : "noreferrer"}
                        target={isMail ? undefined : "_blank"}
                      >
                        <span className="font-semibold text-foreground">
                          {item.label}
                        </span>
                        <span className="inline-flex items-center gap-1.5 font-mono text-muted-foreground text-sm group-hover:text-foreground">
                          <span dir="ltr">{item.handle}</span>
                          <ArrowUpLeftIcon className="size-4 transition-transform group-hover:-translate-x-0.5 group-hover:-translate-y-0.5" />
                        </span>
                      </a>
                    )
                  })}
                </div>
              </div>

              {/* Scope Column */}
              <div className="flex flex-col gap-5">
                <div className="flex items-center gap-2.5 text-sm">
                  <span className="rounded-md bg-brand-lime px-2.5 py-0.5 font-bold font-mono text-brand-lime-foreground text-xs">
                    03
                  </span>
                  <span className="font-semibold text-muted-foreground">
                    نطاق المهمة المنفّذ
                  </span>
                </div>

                <div className="flex flex-col divide-y divide-border border-t">
                  {taskScopeItems.map((item) => (
                    <div
                      className="grid grid-cols-[2.5rem_1fr] items-baseline gap-3 py-4"
                      key={item.num}
                    >
                      <span className="font-mono text-muted-foreground text-sm">
                        {item.num}
                      </span>
                      <div className="flex flex-col gap-1">
                        <h3 className="font-bold text-base text-foreground">
                          {item.title}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed sm:text-base">
                          {item.detail}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </BlurFade>
        </main>

        {/* Minimal Footer inside card */}
        <footer className="border-t">
          <div className="mx-auto flex w-full max-w-5xl flex-col items-start justify-between gap-2 px-5 py-5 text-muted-foreground text-sm sm:flex-row sm:items-center sm:px-8">
            <span>صفحة طلبات «وصّل» للتوصيل — مهمة إيفان كود #56</span>
            <span className="font-mono" dir="ltr">
              Salem Alsawil · @al9wel
            </span>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default LandingPage
