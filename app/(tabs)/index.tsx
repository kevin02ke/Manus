import { useMemo, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import { ScreenContainer } from "@/components/screen-container";
import { IconSymbol } from "@/components/ui/icon-symbol";
import { useColors } from "@/hooks/use-colors";

const COLORS = ["#F8FAFC", "#A7F3D0", "#93C5FD", "#FDE68A", "#F9A8D4", "#C4B5FD"];
const NAV_ITEMS = [
  { label: "Overview", icon: "square.grid.2x2.fill" as const },
  { label: "Customize", icon: "slider.horizontal.3" as const },
];

export default function HomeScreen() {
  const colors = useColors();
  const [activeTab, setActiveTab] = useState(0);
  const [enabled, setEnabled] = useState(true);
  const [showBattery, setShowBattery] = useState(true);
  const [showNetwork, setShowNetwork] = useState(true);
  const [showNotifications, setShowNotifications] = useState(true);
  const [accent, setAccent] = useState("#A7F3D0");

  const previewIcons = useMemo(() => {
    const icons = [];
    if (showNotifications) icons.push("✦", "▣");
    if (showNetwork) icons.push("⌁");
    return icons.join("  ");
  }, [showNotifications, showNetwork]);

  const showComingSoon = (feature: string) =>
    Alert.alert(feature, "This action is ready for the native Android build.");

  return (
    <ScreenContainer containerClassName="bg-[#F5F7F6]" className="px-5" edges={["top", "left", "right"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <View>
            <Text style={[styles.eyebrow, { color: colors.muted }]}>STATUS BAR STUDIO</Text>
            <Text style={[styles.title, { color: colors.foreground }]}>Make it yours.</Text>
          </View>
          <Pressable onPress={() => showComingSoon("Settings")} style={({ pressed }) => [styles.iconButton, pressed && styles.pressed]}>
            <IconSymbol name="gearshape.fill" size={22} color={colors.foreground} />
          </Pressable>
        </View>

        <View style={[styles.previewCard, { backgroundColor: "#18251F" }]}>
          <View style={styles.previewTopRow}>
            <Text style={[styles.previewTime, { color: accent }]}>9:41</Text>
            <View style={styles.previewRight}>
              <Text style={[styles.previewMeta, { color: "#E3F6EC" }]}>{previewIcons}</Text>
              {showBattery && <View style={styles.battery}><View style={[styles.batteryFill, { backgroundColor: accent }]} /><Text style={styles.batteryText}>82</Text></View>}
            </View>
          </View>
          <View style={styles.previewDivider} />
          <View style={styles.previewBottom}>
            <View style={[styles.liveDot, { backgroundColor: accent }]} />
            <Text style={styles.previewLabel}>LIVE PREVIEW</Text>
            <Text style={styles.previewHint}>{enabled ? "Overlay is active" : "Overlay is paused"}</Text>
          </View>
        </View>

        <View style={styles.statusLine}>
          <View style={[styles.statusDot, { backgroundColor: enabled ? "#42B883" : "#A5AAA7" }]} />
          <Text style={[styles.statusText, { color: colors.foreground }]}>{enabled ? "Status bar is active" : "Status bar is paused"}</Text>
          <Switch value={enabled} onValueChange={setEnabled} trackColor={{ false: "#D9DFDC", true: "#BDE8D0" }} thumbColor={enabled ? "#209A63" : "#FFFFFF"} />
        </View>

        <View style={styles.tabs}>
          {NAV_ITEMS.map((item, index) => (
            <Pressable key={item.label} onPress={() => setActiveTab(index)} style={[styles.tab, activeTab === index && { backgroundColor: colors.foreground }]}>
              <IconSymbol name={item.icon} size={17} color={activeTab === index ? "#FFFFFF" : colors.muted} />
              <Text style={[styles.tabText, { color: activeTab === index ? "#FFFFFF" : colors.muted }]}>{item.label}</Text>
            </Pressable>
          ))}
        </View>

        {activeTab === 0 ? (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Your status bar</Text>
            <Text style={[styles.sectionSub, { color: colors.muted }]}>A quick look at what’s currently visible.</Text>
            <View style={styles.grid}>
              <FeatureCard icon="clock.fill" title="Clock" value="9:41 AM" color={colors.foreground} onPress={() => setActiveTab(1)} />
              <FeatureCard icon="battery.100" title="Battery" value={showBattery ? "82% visible" : "Hidden"} color="#CE8D2F" onPress={() => setShowBattery(!showBattery)} />
              <FeatureCard icon="wifi" title="Connection" value={showNetwork ? "Wi-Fi + signal" : "Hidden"} color="#3D8EAF" onPress={() => setShowNetwork(!showNetwork)} />
              <FeatureCard icon="bell.fill" title="Notifications" value={showNotifications ? "2 icons shown" : "Hidden"} color="#AF6B9B" onPress={() => setShowNotifications(!showNotifications)} />
            </View>
            <View style={[styles.infoCard, { backgroundColor: "#E9F4EE" }]}>
              <IconSymbol name="hand.tap.fill" size={24} color="#27865A" />
              <View style={styles.infoCopy}><Text style={styles.infoTitle}>Touch the bar</Text><Text style={styles.infoText}>Tap, swipe, or long press your status bar to trigger shortcuts.</Text></View>
              <IconSymbol name="chevron.right" size={20} color="#6F947F" />
            </View>
          </>
        ) : (
          <>
            <Text style={[styles.sectionTitle, { color: colors.foreground }]}>Customize the look</Text>
            <Text style={[styles.sectionSub, { color: colors.muted }]}>Tune the details until it feels like your phone.</Text>
            <SettingRow icon="clock.fill" title="Clock style" detail="9:41 · 24-hour format" onPress={() => showComingSoon("Clock style")} />
            <SettingRow icon="battery.100" title="Battery indicator" detail={showBattery ? "Icon + percentage" : "Hidden"} onPress={() => setShowBattery(!showBattery)} />
            <SettingRow icon="bell.fill" title="Notification icons" detail={showNotifications ? "Minimal" : "Hidden"} onPress={() => setShowNotifications(!showNotifications)} />
            <Text style={[styles.colorLabel, { color: colors.foreground }]}>Accent color</Text>
            <View style={styles.colorRow}>{COLORS.map((color) => <Pressable key={color} onPress={() => setAccent(color)} style={[styles.colorSwatch, { backgroundColor: color }, accent === color && styles.colorSelected]} />)}</View>
            <Text style={[styles.colorLabel, { color: colors.foreground }]}>Touch actions</Text>
            <View style={styles.actionCard}><ActionLine label="Tap" value="Open notifications" /><ActionLine label="Swipe left" value="Back" /><ActionLine label="Swipe right" value="Quick settings" /></View>
          </>
        )}

        <Text style={[styles.footer, { color: colors.muted }]}>Android overlay • Accessibility permission required</Text>
      </ScrollView>
    </ScreenContainer>
  );
}

function FeatureCard({ icon, title, value, color, onPress }: { icon: any; title: string; value: string; color: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.featureCard, pressed && styles.pressed]}><View style={[styles.featureIcon, { backgroundColor: color + "18" }]}><IconSymbol name={icon} size={21} color={color} /></View><Text style={styles.featureTitle}>{title}</Text><Text style={styles.featureValue}>{value}</Text></Pressable>;
}
function SettingRow({ icon, title, detail, onPress }: { icon: any; title: string; detail: string; onPress: () => void }) {
  return <Pressable onPress={onPress} style={({ pressed }) => [styles.settingRow, pressed && styles.pressed]}><View style={styles.settingIcon}><IconSymbol name={icon} size={21} color="#27865A" /></View><View style={styles.settingCopy}><Text style={styles.settingTitle}>{title}</Text><Text style={styles.settingDetail}>{detail}</Text></View><IconSymbol name="chevron.right" size={20} color="#A0AAA5" /></Pressable>;
}
function ActionLine({ label, value }: { label: string; value: string }) { return <View style={styles.actionLine}><Text style={styles.actionLabel}>{label}</Text><Text style={styles.actionValue}>{value}</Text><IconSymbol name="chevron.right" size={18} color="#A0AAA5" /></View>; }

const styles = StyleSheet.create({
  scrollContent: { paddingTop: 20, paddingBottom: 30 },
  header: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 20 },
  eyebrow: { fontSize: 11, letterSpacing: 1.8, fontWeight: "700", marginBottom: 6 },
  title: { fontSize: 31, lineHeight: 37, fontWeight: "700", letterSpacing: -1.1 },
  iconButton: { width: 42, height: 42, borderRadius: 14, alignItems: "center", justifyContent: "center", backgroundColor: "#FFFFFF" },
  pressed: { opacity: 0.7, transform: [{ scale: 0.98 }] },
  previewCard: { borderRadius: 22, padding: 18, minHeight: 128, shadowColor: "#1B3125", shadowOpacity: 0.13, shadowRadius: 12, shadowOffset: { width: 0, height: 6 }, elevation: 4 },
  previewTopRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  previewTime: { fontSize: 30, fontWeight: "700", letterSpacing: -1 },
  previewRight: { flexDirection: "row", alignItems: "center", gap: 12 },
  previewMeta: { fontSize: 14, letterSpacing: 1 },
  battery: { width: 53, height: 24, borderWidth: 1.5, borderColor: "#8CACA0", borderRadius: 7, alignItems: "center", justifyContent: "center", overflow: "hidden" },
  batteryFill: { position: "absolute", left: 0, top: 0, bottom: 0, width: "78%", opacity: 0.28 },
  batteryText: { color: "#E3F6EC", fontSize: 11, fontWeight: "700" },
  previewDivider: { height: 1, backgroundColor: "#334A40", marginTop: 15, marginBottom: 13 },
  previewBottom: { flexDirection: "row", alignItems: "center" },
  liveDot: { width: 7, height: 7, borderRadius: 4, marginRight: 7 },
  previewLabel: { color: "#C8DDD1", fontSize: 10, letterSpacing: 1.4, fontWeight: "700" },
  previewHint: { color: "#758C81", fontSize: 11, marginLeft: "auto" },
  statusLine: { flexDirection: "row", alignItems: "center", marginTop: 16, marginBottom: 20, paddingHorizontal: 4 },
  statusDot: { width: 8, height: 8, borderRadius: 4, marginRight: 8 },
  statusText: { fontSize: 14, fontWeight: "600", flex: 1 },
  tabs: { flexDirection: "row", backgroundColor: "#E8ECEA", borderRadius: 14, padding: 4, marginBottom: 26 },
  tab: { flex: 1, flexDirection: "row", gap: 7, alignItems: "center", justifyContent: "center", borderRadius: 11, paddingVertical: 11 },
  tabText: { fontSize: 13, fontWeight: "700" },
  sectionTitle: { fontSize: 20, fontWeight: "700", letterSpacing: -0.4 },
  sectionSub: { fontSize: 13, marginTop: 5, marginBottom: 16 },
  grid: { flexDirection: "row", flexWrap: "wrap", gap: 11, marginBottom: 16 },
  featureCard: { backgroundColor: "#FFFFFF", borderRadius: 18, padding: 14, width: "48.3%", minHeight: 128 },
  featureIcon: { width: 38, height: 38, borderRadius: 12, alignItems: "center", justifyContent: "center", marginBottom: 12 },
  featureTitle: { color: "#65716B", fontSize: 12, fontWeight: "600" },
  featureValue: { color: "#1C2822", fontSize: 13, fontWeight: "700", marginTop: 5 },
  infoCard: { borderRadius: 18, padding: 16, flexDirection: "row", alignItems: "center", marginTop: 3 },
  infoCopy: { flex: 1, marginHorizontal: 12 },
  infoTitle: { color: "#1F6947", fontSize: 14, fontWeight: "700", marginBottom: 4 },
  infoText: { color: "#5A806C", fontSize: 12, lineHeight: 17 },
  footer: { fontSize: 11, textAlign: "center", marginTop: 28 },
  settingRow: { backgroundColor: "#FFFFFF", borderRadius: 17, padding: 14, flexDirection: "row", alignItems: "center", marginBottom: 10 },
  settingIcon: { width: 42, height: 42, borderRadius: 13, backgroundColor: "#E9F4EE", alignItems: "center", justifyContent: "center", marginRight: 12 },
  settingCopy: { flex: 1 },
  settingTitle: { color: "#1C2822", fontSize: 14, fontWeight: "700" },
  settingDetail: { color: "#7B8680", fontSize: 12, marginTop: 4 },
  colorLabel: { fontSize: 15, fontWeight: "700", marginTop: 18, marginBottom: 12 },
  colorRow: { flexDirection: "row", gap: 12 },
  colorSwatch: { width: 33, height: 33, borderRadius: 17, borderWidth: 2, borderColor: "#FFFFFF" },
  colorSelected: { borderColor: "#1C2822", transform: [{ scale: 1.12 }] },
  actionCard: { backgroundColor: "#FFFFFF", borderRadius: 17, paddingHorizontal: 15 },
  actionLine: { flexDirection: "row", alignItems: "center", paddingVertical: 15, borderBottomWidth: 1, borderBottomColor: "#EEF1EF" },
  actionLabel: { color: "#27865A", fontSize: 12, fontWeight: "700", width: 70 },
  actionValue: { color: "#27332D", fontSize: 13, flex: 1 },
});
