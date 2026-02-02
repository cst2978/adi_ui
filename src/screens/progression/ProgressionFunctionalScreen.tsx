"use client";

import Link from "next/link";

const imgAlirezaAttariSbIak0PKuieUnsplash3 = "https://www.figma.com/api/mcp/asset/416c4fc2-5749-4fb1-bcc2-f723683c96e4";
const img = "https://www.figma.com/api/mcp/asset/80739969-0f06-48dc-9799-928655abe85e";
const img1 = "https://www.figma.com/api/mcp/asset/fe925506-c87e-45f2-8d67-532b286944f4";
const img2 = "https://www.figma.com/api/mcp/asset/201e1538-7c86-48ba-a8f3-9117c5e48097";
const img3 = "https://www.figma.com/api/mcp/asset/2a421cba-134a-406d-a305-afb332556ac7";
const img4 = "https://www.figma.com/api/mcp/asset/5a87e928-4115-4fe9-bb03-5af547f084f2";
const img5 = "https://www.figma.com/api/mcp/asset/eb78b7c2-a66d-43d6-801a-ea0f05a9278c";
const img6 = "https://www.figma.com/api/mcp/asset/989ba3dd-52d8-465e-a5a5-3cb5c28668bc";
const imgWeuiArrowFilled = "https://www.figma.com/api/mcp/asset/88194260-9279-42a9-8bed-50164c163b72";
const imgIconamoonSearchBold = "https://www.figma.com/api/mcp/asset/4a236fc1-50db-4598-83c7-eafb20bf3eef";
const imgProiconsFilter = "https://www.figma.com/api/mcp/asset/c22f42c9-bb38-4f1a-b3cd-4223d72d1e3b";
const imgVector19 = "https://www.figma.com/api/mcp/asset/9b70e2e7-10a6-411c-8432-0fa74407c448";
const imgSiAlertFill = "https://www.figma.com/api/mcp/asset/2ac51dd4-3aaf-4066-8281-e7ca8cfb91b9";
const imgStashArrowUpDuotone = "https://www.figma.com/api/mcp/asset/88a5cb2c-e031-4052-a594-9a18ec3771da";
const imgBxsUpArrow = "https://www.figma.com/api/mcp/asset/4efac9a4-8fdb-4e9b-b810-04fb5064ba1a";
const imgLine40 = "https://www.figma.com/api/mcp/asset/ce2f5570-68d8-4967-9b47-4d7d5e611dc5";
const imgLine = "https://www.figma.com/api/mcp/asset/33ed6812-9065-46b4-99d1-7fdde26d767b";
const imgChartDot = "https://www.figma.com/api/mcp/asset/345e668d-bfed-4671-9b2b-59327ce81072";
const imgLine32 = "https://www.figma.com/api/mcp/asset/10bfd17d-bf1a-463b-b2a2-bfb25a4f581a";
const imgWeuiArrowFilled2 = "https://www.figma.com/api/mcp/asset/91cb0885-bf25-4a37-a952-c40aba3532ee";
const imgGroup1 = "https://www.figma.com/api/mcp/asset/495374eb-bc84-4887-99a4-6becc45c0047";
const imgGroup110 = "https://www.figma.com/api/mcp/asset/44af7115-8878-4fe6-8cb1-517fd2fd0f43";

export default function ProgressionFunctionalScreen({
  patientId
}: {
  patientId: string;
}) {
  const tabs = [
    { label: "Overview", href: `/patient/${patientId}/progression?tab=overview` },
    { label: "Functional", href: `/patient/${patientId}/progression?tab=functional` },
    { label: "Biomarkers", href: `/patient/${patientId}/progression?tab=biomarkers` },
    { label: "Organ Systems", href: `/patient/${patientId}/progression?tab=organ-systems` },
    { label: "Video Analytics", href: `/patient/${patientId}/progression?tab=video-analytics` },
    { label: "Timeline", href: `/patient/${patientId}/progression?tab=timeline` }
  ];

  return (
    <div className="relative min-h-screen bg-[#111113] text-[#edeef0]">
      <header className="flex h-[55px] items-center justify-between border-b border-[#e8e8ec] bg-[#f9f9fb] px-6">
        <div className="flex items-center gap-4">
            <div className="flex w-[214px] items-center gap-2 rounded bg-[rgba(82,225,254,0.1)] px-3 py-1">
              <img alt="" className="h-6 w-6" src={img} />
              <span
                className="text-sm font-medium"
                style={{
                  backgroundImage:
                    "linear-gradient(255deg, rgb(43,219,211) 5%, rgb(115,213,255) 95%)",
                  WebkitBackgroundClip: "text",
                  color: "transparent"
                }}
              >
                Patients
              </span>
            </div>
            <div className="flex w-[214px] items-center gap-2">
              <img alt="" className="h-6 w-6" src={img1} />
              <span className="text-sm font-medium text-[#8b8d98]">
                Cohort Analytics
              </span>
            </div>
            <div className="flex w-[214px] items-center gap-2">
              <img alt="" className="h-6 w-6" src={img2} />
              <span className="text-sm font-medium text-[#8b8d98]">
                Gen AI Playground
              </span>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2">
              <img alt="" className="h-6 w-6" src={img3} />
              <div className="flex flex-col">
                <span className="text-sm font-medium text-[#8b8d98]">
                  Dr. Jane Doe
                </span>
                <span className="text-xs text-[#b9bbc6]">
                  Pediatric Pulmonologist
                </span>
              </div>
              <img alt="" className="h-4 w-2" src={img4} />
            </div>
            <img alt="" className="h-6 w-6" src={img5} />
            <img alt="" className="h-10 w-10" src={img6} />
        </div>
      </header>

      <div className="relative">
        <main className="px-6 py-5">
          <div className="relative min-h-[1062px]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-medium">
                <span className="text-[rgba(217,237,255,0.36)]">
                  Progression
                </span>
                <img alt="" className="h-6 w-3" src={imgWeuiArrowFilled} />
                <span className="text-[#edeef0]">Functional</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-[#212225] px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]">
                  <span>
                    Search patients, biomarkers, therapies, alerts, videos ...
                  </span>
                  <img alt="" className="h-4 w-4" src={imgIconamoonSearchBold} />
                </div>
                <button className="flex h-[31px] items-center gap-2 rounded-lg bg-[rgba(0,119,255,0.23)] px-4 text-sm font-semibold text-[#3b9eff]">
                  <img alt="" className="h-4 w-4" src={imgProiconsFilter} />
                  Filters
                </button>
              </div>
            </div>

            <div className="mt-6 grid gap-3 xl:grid-cols-[512px_minmax(0,1fr)_360px]">
              <div className="relative overflow-hidden rounded-lg bg-[rgba(221,234,248,0.08)] p-4">
                <img
                  alt=""
                  className="pointer-events-none absolute -left-3 -top-8 h-[271px] w-[291px] opacity-70"
                  src={imgVector19}
                />
                <div className="relative z-10 flex gap-6">
                  <div className="h-[108px] w-[108px] overflow-hidden rounded-lg">
                    <img
                      alt=""
                      className="h-full w-full object-cover"
                      src={imgAlirezaAttariSbIak0PKuieUnsplash3}
                    />
                  </div>
                  <div className="space-y-3">
                    <div className="text-sm font-bold">Ethan Doe</div>
                    <div className="flex items-center gap-3 text-sm text-[rgba(252,253,255,0.94)]">
                      <span className="rounded bg-[#70b8ff] px-2 py-0.5 text-xs font-semibold text-[#0b161a]">
                        M
                      </span>
                      <span>8-Jul-2021 - 3y 9m</span>
                    </div>
                    <div className="text-sm text-[rgba(252,253,255,0.94)]">
                      Duchenne Muscular Disease
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-2 rounded bg-[rgba(254,90,127,0.05)] px-4 py-1 text-sm text-[#e54666]">
                        <img alt="" className="h-4 w-4" src={imgSiAlertFill} />
                        High Risk
                      </div>
                      <div className="flex items-center gap-2 rounded bg-[rgba(221,234,248,0.08)] px-3 py-1 text-sm text-[rgba(229,237,253,0.48)]">
                        Full Details
                        <img alt="" className="h-4 w-4" src={imgStashArrowUpDuotone} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-lg bg-[rgba(221,234,248,0.08)] p-4 text-sm text-[rgba(217,237,255,0.36)]">
                <p className="text-xs uppercase text-[rgba(217,237,255,0.36)]">
                  AI Summary
                </p>
                <p className="mt-3 text-sm text-[rgba(217,237,255,0.6)]">
                  Patient shows mild decline in mobility and lung function over 6
                  months. Gene therapy response is positive, but
                  steroid-related side effects (elevated CK, ALT) are emerging.
                  Monitoring and dosage adjustment recommended.
                </p>
              </div>

              <div className="rounded-lg bg-[rgba(221,234,248,0.08)] p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-xs text-[rgba(217,237,255,0.36)]">
                      Composite Functional Score
                    </p>
                    <div className="mt-2 flex items-center gap-2 text-2xl font-semibold">
                      76
                      <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#3b9eff]">
                    <span className="rounded bg-[rgba(0,143,245,0.1)] px-2 py-1">
                      Score breakdown
                    </span>
                    <span className="rounded bg-[rgba(0,143,245,0.1)] px-2 py-1">
                      Functional Domains
                    </span>
                    <span className="rounded bg-[rgba(0,143,245,0.1)] px-2 py-1">
                      Sources
                    </span>
                  </div>
                </div>
                <div className="mt-4 flex items-center gap-2 rounded bg-[#1f2124] px-3 py-2 text-xs text-[rgba(217,237,255,0.6)]">
                  <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                  Declined from 84 to 76 over 6 months (↓6 pts), indicating
                  moderate progression
                </div>
              </div>
            </div>

            <div className="mt-6 border-b border-[#2b2d33] pb-2 text-sm text-[rgba(217,237,255,0.36)]">
              <div className="flex items-center gap-6">
                {tabs.map((tab) => {
                  const isActive = tab.label === "Functional";
                  return (
                    <Link
                      key={tab.label}
                      className={
                        isActive
                          ? "border-b-2 border-[#0090ff] pb-2 text-[#0090ff]"
                          : "pb-2 text-[rgba(217,237,255,0.36)] hover:text-[#edeef0]"
                      }
                      href={tab.href}
                      prefetch
                    >
                      {tab.label}
                    </Link>
                  );
                })}
              </div>
            </div>
            <ProgressionFunctionalBody />
          </div>
        </main>
      </div>

      <div className="absolute right-0 top-[70px] flex w-[54px] flex-col items-center gap-4 rounded-bl-lg rounded-tl-lg bg-[#212225] px-3 pb-3 pt-2 shadow-[-7px_2px_13.3px_0px_rgba(0,0,0,0.32)]">
        <img alt="" className="h-6 w-6" src={imgWeuiArrowFilled2} />
        <div className="flex flex-col items-center gap-2">
          <img alt="" className="h-8 w-8" src={imgGroup1} />
          <img alt="" className="h-8 w-8" src={imgGroup110} />
        </div>
      </div>

      <div className="absolute right-[12px] top-[48px] h-[96px] w-[2px]">
        <img alt="" className="h-full w-full" src={imgLine32} />
      </div>
    </div>
  );
}

export function ProgressionFunctionalBody() {
  return (
    <>
      <div className="mt-6 grid gap-4 xl:grid-cols-[1.1fr_1.9fr]">
        <div className="ds-card p-4">
          <div className="flex items-center justify-between">
            <div className="text-sm">Mobility Summary</div>
            <div className="text-xs text-[rgba(217,237,255,0.36)]">
              25 April 2025 · Latest
            </div>
          </div>
          <div className="mt-4 space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs">6MWT</span>
                <span className="rounded bg-[rgba(211,237,248,0.11)] px-2 py-1 text-[10px] text-[#e5484d]">
                  Alerts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                    LATEST
                  </p>
                  <div className="flex items-center gap-2 text-2xl">
                    285 m
                    <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                  </div>
                  <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                    27 JUN 21:35 PM
                  </p>
                </div>
                <div className="text-right text-[10px] text-[rgba(217,237,255,0.36)]">
                  <p>COHORT 312 m</p>
                  <p>BASELINE 328 m</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs">NSAA</span>
                <span className="rounded bg-[rgba(211,237,248,0.11)] px-2 py-1 text-[10px] text-[#e5484d]">
                  Alerts
                </span>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                    LATEST
                  </p>
                  <div className="flex items-center gap-2 text-2xl">
                    17
                    <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                  </div>
                  <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                    27 JUN 21:35 PM
                  </p>
                </div>
                <div className="text-right text-[10px] text-[rgba(217,237,255,0.36)]">
                  <p>COHORT 21</p>
                  <p>BASELINE 23</p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded bg-panel-soft/60 px-3 py-2 text-[11px] text-[rgba(241,247,254,0.71)]">
              <img alt="" className="h-4 w-4" src={imgLine40} />
              Mobility levels stable; mild decline in stair climbing speed and
              endurance over last 2 weeks.
            </div>
          </div>
        </div>

        <div className="ds-card p-4">
          <div className="text-sm">Gait Metrics</div>
          <div className="mt-4 grid gap-4 md:grid-cols-3">
            {[
              { label: "Stride Length", value: "52 cm" },
              { label: "Step Count", value: "3,200" },
              { label: "Walking Speed", value: "0.84 m/s" }
            ].map((item) => (
              <div key={item.label} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs">{item.label}</span>
                  <span className="rounded bg-[rgba(211,237,248,0.11)] px-2 py-1 text-[10px] text-[#e5484d]">
                    Alerts
                  </span>
                </div>
                <div>
                  <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                    LATEST
                  </p>
                  <div className="flex items-center gap-2 text-2xl">
                    {item.value}
                    <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                  </div>
                  <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                    27 JUN 21:35 PM
                  </p>
                </div>
                <div className="text-[10px] text-[rgba(217,237,255,0.36)]">
                  COHORT 59 cm · BASELINE 61 cm
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs">Balance/Stability (Sway Index)</span>
                <span className="rounded bg-[rgba(211,237,248,0.11)] px-2 py-1 text-[10px] text-[#e5484d]">
                  Alerts
                </span>
              </div>
              <div>
                <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                  LATEST
                </p>
                <div className="flex items-center gap-2 text-2xl">
                  2.7
                  <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                </div>
                <p className="text-[10px] text-[rgba(217,237,255,0.36)]">
                  27 JUN 21:35 PM
                </p>
              </div>
              <div className="text-[10px] text-[rgba(217,237,255,0.36)]">
                COHORT 2.1 · BASELINE 2.0
              </div>
            </div>
          </div>
          <div className="mt-4 flex items-center gap-2 rounded bg-panel-soft/60 px-3 py-2 text-[11px] text-[rgba(241,247,254,0.71)]">
            <img alt="" className="h-4 w-4" src={imgLine40} />
            Gait irregularities detected — shorter stride length and increased
            stance time suggest compensatory walking pattern.
          </div>
        </div>
      </div>

      <section className="mt-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="text-sm">KPI Metrics</div>
          <div className="flex items-center gap-3">
            <div className="flex items-center rounded bg-panel/80 p-1 text-xs">
              {["D", "W", "M", "3M", "6M", "Y"].map((tab) => (
                <div
                  key={tab}
                  className={`flex h-6 w-10 items-center justify-center rounded ${
                    tab === "6M"
                      ? "bg-[rgba(0,143,245,0.1)] text-[#0090ff]"
                      : "text-[#80838d]"
                  }`}
                >
                  {tab}
                </div>
              ))}
            </div>
            <div className="flex items-center gap-2 rounded bg-panel/80 px-3 py-2 text-xs text-[rgba(217,237,255,0.36)]">
              Apr 21 - Apr 27, 2025
              <img alt="" className="h-4 w-4" src={imgGroup110} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 xl:grid-cols-2">
          {["6MWT", "NSAA"].map((title) => (
            <div key={title} className="ds-card p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs">{title}</span>
                <span className="rounded bg-[rgba(211,237,248,0.11)] px-2 py-1 text-[10px] text-[#e5484d]">
                  Alerts
                </span>
              </div>
              <div className="mt-3 flex items-center justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
                <div>
                  <p>LATEST</p>
                  <div className="flex items-center gap-2 text-2xl text-[#edeef0]">
                    {title === "6MWT" ? "285 m" : "17"}
                    <img alt="" className="h-4 w-4" src={imgBxsUpArrow} />
                  </div>
                  <p>27 JUN 21:35 PM</p>
                </div>
                <div className="text-right">
                  <p>AVERAGE {title === "6MWT" ? "301 m" : "19"}</p>
                  <p>2 JAN - 27 JUN, 2025</p>
                </div>
              </div>
              <div className="mt-4 text-[10px] text-[rgba(217,237,255,0.36)]">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img alt="" className="h-[12px] w-[17px]" src={imgLine40} />
                    Cohort : 312 m
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="h-[12px] w-4 bg-[rgba(221,234,248,0.08)]" />
                    Baseline : 328 m
                  </div>
                </div>
                <div className="relative mt-4 h-[130px] rounded bg-panel-soft/60 px-8 py-3">
                  <div className="absolute left-2 top-3 flex h-[88px] flex-col justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
                    <span>160</span>
                    <span>120</span>
                    <span>80</span>
                    <span>40</span>
                  </div>
                  <div className="absolute bottom-2 left-8 right-3 flex justify-between text-[10px] text-[rgba(217,237,255,0.36)]">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>May</span>
                    <span>Jun</span>
                  </div>
                  <img
                    alt=""
                    className="absolute left-8 right-3 top-6 h-[94px]"
                    src={imgLine}
                  />
                  <img
                    alt=""
                    className="absolute left-[20%] top-[55px] h-2 w-2"
                    src={imgChartDot}
                  />
                  <img
                    alt=""
                    className="absolute left-[45%] top-[48px] h-2 w-2"
                    src={imgChartDot}
                  />
                  <img
                    alt=""
                    className="absolute left-[65%] top-[60px] h-2 w-2"
                    src={imgChartDot}
                  />
                  <img
                    alt=""
                    className="absolute left-[85%] top-[75px] h-2 w-2"
                    src={imgChartDot}
                  />
                </div>
              </div>
              <div className="mt-4 flex items-center gap-2 rounded bg-panel-soft/60 px-3 py-2 text-[11px] text-[rgba(241,247,254,0.71)]">
                <img alt="" className="h-4 w-4" src={imgLine40} />
                Gradual decline since Feb; below cohort median by 18%
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
