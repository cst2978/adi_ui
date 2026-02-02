export type FigmaNavItem = {
  iconUrl: string;
  href?: string;
  active?: boolean;
  label?: string;
};

export type FigmaLayout = {
  navRail: {
    logoUrl: string;
    primaryItems: FigmaNavItem[];
    middleImageUrl?: string;
    secondaryItems: FigmaNavItem[];
  };
  topBar: {
    navItems: Array<{
      label: string;
      iconUrl: string;
      href?: string;
      active?: boolean;
      activeGradient?: string;
    }>;
    user: {
      name: string;
      role: string;
      avatarUrl: string;
      menuIconUrl: string;
    };
    notificationIconUrl: string;
    settingsIconUrl: string;
  };
  actionRail?: {
    toggleIconUrl: string;
    items: Array<{ iconUrl: string }>;
  };
};

export type FigmaHeader = {
  title: string;
  breadcrumb?: {
    items: string[];
    separatorIconUrl?: string;
    activeIndex?: number;
  };
  search: { placeholder: string; iconUrl: string };
  filter: { label: string; iconUrl: string };
};
