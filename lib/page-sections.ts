import type { PageSection } from "@/lib/content";

const backgrounds = { midnight: "#080D18", navy: "#0D1423", elevated: "#131D30" } as const;

export function getPageSectionProps(sections: PageSection[], sectionKey: PageSection["sectionKey"], defaultOrder: number) {
  const config = sections.find((section) => section.sectionKey === sectionKey);
  return {
    style: {
      order: config?.displayOrder ?? defaultOrder,
      ...(config?.backgroundVariant ? { backgroundColor: backgrounds[config.backgroundVariant] } : {}),
    },
    hidden: Boolean(config && config.active === false),
    "data-layout": config?.layoutVariant,
    "data-section-key": sectionKey,
  };
}
