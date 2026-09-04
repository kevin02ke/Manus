import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import type { ComponentProps } from "react";
import { SymbolView, type SymbolWeight } from "expo-symbols";
import { OpaqueColorValue, type StyleProp, type TextStyle } from "react-native";

type IconMapping = Record<SymbolViewProps["name"], ComponentProps<typeof MaterialIcons>["name"]>;
type IconSymbolName = keyof typeof MAPPING;

type SymbolViewProps = ComponentProps<typeof SymbolView>;

const MAPPING = {
  "house.fill": "home",
  "paperplane.fill": "send",
  "chevron.left.forwardslash.chevron.right": "code",
  "chevron.right": "chevron-right",
  "gearshape.fill": "settings",
  "square.grid.2x2.fill": "dashboard",
  "hand.tap.fill": "touch-app",
  "checkmark.circle.fill": "check-circle",
  "bell.fill": "notifications",
  "battery.100": "battery-full",
  "wifi": "wifi",
  "antenna.radiowaves.left.and.right": "signal-cellular-4-bar",
  "clock.fill": "schedule",
  "slider.horizontal.3": "tune",
  "info.circle": "info-outline",
} as IconMapping;

export function IconSymbol({
  name,
  size = 24,
  color,
  style,
  weight,
}: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />;
}
