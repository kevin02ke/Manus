export type StatusBarOptions = {
  showNotifications: boolean;
  showNetwork: boolean;
  showBattery: boolean;
};

export function getVisibleStatusItems(options: StatusBarOptions) {
  const items: string[] = [];
  if (options.showNotifications) items.push("notifications");
  if (options.showNetwork) items.push("network");
  if (options.showBattery) items.push("battery");
  return items;
}
