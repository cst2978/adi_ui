"use client";

import { useParams } from "next/navigation";
import { useSession } from "next-auth/react";
import type { FigmaHeader, FigmaLayout } from "@/types/figma-layout";
import PatientRouteSelector from "@/components/patient-route-selector";
import { PageTitle } from "@/components/ui/typography";
import SearchInput from "@/components/ui/search-input";
import Button from "@/components/ui/button";

export default function FigmaShell({
  layout,
  header,
  mode = "standalone",
  children
}: {
  layout: FigmaLayout;
  header: FigmaHeader;
  mode?: "standalone" | "embedded";
  children: React.ReactNode;
}) {
  const breadcrumb = header.breadcrumb;
  const isEmbedded = mode === "embedded";
  const params = useParams();
  const patientId = Array.isArray(params?.id) ? params?.id[0] : params?.id;
  const showPatientSelector = Boolean(isEmbedded && patientId);
  const { data: session } = useSession();
  const displayName = session?.user?.name ?? layout.topBar.user.name;
  const displayRole =
    session?.user?.role?.trim() || layout.topBar.user.role;

  return (
    <div className="relative min-h-screen bg-[#111113] text-ink">
      {!isEmbedded ? (
        <aside className="absolute left-0 top-0 flex h-full w-16 flex-col items-center justify-between border-r border-[#272a2d] bg-[#18191b] px-4 py-4">
          <div className="flex flex-col items-center gap-4">
            <div className="flex h-9 w-9 items-center justify-center">
              <img alt="" className="h-5 w-9" src={layout.navRail.logoUrl} />
            </div>
            <div className="flex flex-col items-center gap-4">
              {layout.navRail.primaryItems.map((item, index) => (
                <div
                  key={`${item.iconUrl}-${index}`}
                  className={`flex h-9 w-9 items-center justify-center rounded ${
                    item.active ? "bg-[rgba(82,225,254,0.1)]" : ""
                  }`}
                >
                  <img alt="" className="h-9 w-9" src={item.iconUrl} />
                </div>
              ))}
            </div>
          </div>
          {layout.navRail.middleImageUrl ? (
            <img
              alt=""
              className="h-[528px] w-9"
              src={layout.navRail.middleImageUrl}
            />
          ) : null}
          <div className="flex flex-col items-center gap-4">
            {layout.navRail.secondaryItems.map((item, index) => (
              <img
                key={`${item.iconUrl}-${index}`}
                alt=""
                className="h-9 w-9"
                src={item.iconUrl}
              />
            ))}
          </div>
        </aside>
      ) : null}

      <header
        className={`flex h-[55px] items-center justify-between border-b border-[#e8e8ec] bg-[#f9f9fb] px-6 ${
          isEmbedded ? "" : "absolute left-16 right-0 top-0"
        }`}
      >
        <div className="flex items-center">
          {layout.topBar.navItems.map((item) => (
            <div
              key={item.label}
              className="flex w-[214px] items-center gap-2"
            >
              <img alt="" className="h-9 w-9" src={item.iconUrl} />
              {item.active && item.activeGradient ? (
                <span
                  className="text-sm font-medium"
                  style={{
                    backgroundImage: item.activeGradient,
                    WebkitBackgroundClip: "text",
                    color: "transparent"
                  }}
                >
                  {item.label}
                </span>
              ) : (
                <span className="text-sm font-medium text-[#8b8d98]">
                  {item.label}
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <img alt="" className="h-6 w-6" src={layout.topBar.user.avatarUrl} />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-[#8b8d98]">
                {displayName}
              </span>
              <span className="text-xs text-[#b9bbc6]">
                {displayRole}
              </span>
            </div>
            <img
              alt=""
              className="h-4 w-2"
              src={layout.topBar.user.menuIconUrl}
            />
          </div>
          <img
            alt=""
            className="h-6 w-6"
            src={layout.topBar.notificationIconUrl}
          />
          <img
            alt=""
            className="h-10 w-10"
            src={layout.topBar.settingsIconUrl}
          />
        </div>
      </header>

      <main className={isEmbedded ? "" : "pl-16 pt-[55px]"}>
        <div className="relative min-h-[1063px] bg-[#111113] px-6 py-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {breadcrumb ? (
                <div className="flex items-center gap-2 text-sm font-medium">
                  {breadcrumb.items.map((item, index) => {
                    const activeIndex =
                      breadcrumb.activeIndex ?? breadcrumb.items.length - 1;
                    return (
                      <div
                        key={`${item}-${index}`}
                        className="flex items-center gap-2"
                      >
                        <span
                          className={
                            index === activeIndex
                              ? "text-[#edeef0] ds-card-title"
                              : "text-[rgba(217,237,255,0.36)] ds-caption"
                          }
                        >
                          {item}
                        </span>
                        {index < breadcrumb.items.length - 1 &&
                        breadcrumb.separatorIconUrl ? (
                          <img
                            alt=""
                            className="h-6 w-3"
                            src={breadcrumb.separatorIconUrl}
                          />
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <PageTitle as="span">{header.title}</PageTitle>
              )}
              {showPatientSelector ? <PatientRouteSelector /> : null}
            </div>
            <div className="flex items-center gap-6">
              <SearchInput
                wrapperClassName="w-[385px]"
                placeholder={header.search.placeholder}
                className="pl-10"
                prefix={<img alt="" className="h-4 w-4" src={header.search.iconUrl} />}
              />
              <Button
                type="button"
                className="flex h-[34px] w-[160px] items-center justify-center gap-2 px-4"
              >
                <img alt="" className="h-5 w-5" src={header.filter.iconUrl} />
                <span>{header.filter.label}</span>
              </Button>
            </div>
          </div>

          <div className="mt-4 motion-safe:animate-floatIn">{children}</div>
        </div>
      </main>

      {layout.actionRail ? (
        <div className="absolute right-0 top-[71px] flex w-[54px] flex-col items-center gap-4 rounded-bl-lg rounded-tl-lg bg-[#212225] px-3 py-3 shadow-[-7px_2px_13.3px_rgba(0,0,0,0.32)]">
          <img alt="" className="h-[30px] w-[30px]" src={layout.actionRail.toggleIconUrl} />
          {layout.actionRail.items.map((item, index) => (
            <img
              key={`${item.iconUrl}-${index}`}
              alt=""
              className="h-8 w-8"
              src={item.iconUrl}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
}
