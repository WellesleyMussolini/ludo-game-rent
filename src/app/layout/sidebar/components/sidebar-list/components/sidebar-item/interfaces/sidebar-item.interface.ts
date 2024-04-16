export interface ISidebarItem {
  item: {
    icon: React.ReactNode,
    label: string,
    alert: boolean,
    active: boolean,
    route: string,
  };
  expanded: boolean,
};