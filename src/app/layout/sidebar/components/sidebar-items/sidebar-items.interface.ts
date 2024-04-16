export interface ISidebarItem {
  icon: React.ReactNode,
  text: string,
  active: boolean,
  alert: boolean,
  onClick: () => void,
};