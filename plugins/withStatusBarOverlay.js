const { withAndroidManifest } = require("@expo/config-plugins");

module.exports = function withStatusBarOverlay(config) {
  return withAndroidManifest(config, (mod) => {
    const manifest = mod.modResults.manifest;
    manifest.permission = manifest.permission || [];
    const hasAccessibilityPermission = manifest.permission.some(
      (permission) => permission.$?.["android:name"] === "android.permission.BIND_ACCESSIBILITY_SERVICE",
    );
    if (!hasAccessibilityPermission) {
      manifest.permission.push({ $: { "android:name": "android.permission.BIND_ACCESSIBILITY_SERVICE" } });
    }
    const application = manifest.application?.[0];
    if (!application) return mod;
    application.service = application.service || [];
    const exists = application.service.some(
      (service) => service.$?.["android:name"] === ".StatusBarOverlayService",
    );
    if (!exists) {
      application.service.push({
        $: {
          "android:name": ".StatusBarOverlayService",
          "android:label": "Status Bar Studio",
          "android:permission": "android.permission.BIND_ACCESSIBILITY_SERVICE",
          "android:exported": "true",
        },
        "intent-filter": [{ action: [{ $: { "android:name": "android.accessibilityservice.AccessibilityService" } }] }],
        "meta-data": [{
          $: {
            "android:name": "android.accessibilityservice",
            "android:resource": "@xml/status_bar_accessibility_service",
          },
        }],
      });
    }
    return mod;
  });
};
