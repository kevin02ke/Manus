package com.app.statuspulse;

import android.accessibilityservice.AccessibilityService;
import android.graphics.Color;
import android.graphics.PixelFormat;
import android.graphics.Typeface;
import android.os.Handler;
import android.os.Looper;
import android.view.Gravity;
import android.view.WindowManager;
import android.widget.LinearLayout;
import android.widget.TextView;
import android.view.accessibility.AccessibilityEvent;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Locale;

public class StatusBarOverlayService extends AccessibilityService {
  private WindowManager windowManager;
  private LinearLayout overlay;
  private TextView timeView;
  private final Handler handler = new Handler(Looper.getMainLooper());
  private final Runnable ticker = new Runnable() {
    @Override public void run() {
      if (timeView != null) timeView.setText(new SimpleDateFormat("HH:mm", Locale.getDefault()).format(new Date()));
      handler.postDelayed(this, 30_000);
    }
  };

  @Override public void onServiceConnected() { super.onServiceConnected(); showOverlay(); }

  private void showOverlay() {
    if (overlay != null) return;
    windowManager = (WindowManager) getSystemService(WINDOW_SERVICE);
    overlay = new LinearLayout(this);
    overlay.setOrientation(LinearLayout.HORIZONTAL);
    overlay.setGravity(Gravity.CENTER_VERTICAL);
    overlay.setPadding(22, 0, 18, 0);
    overlay.setBackgroundColor(Color.TRANSPARENT);
    timeView = label("--:--", 14);
    overlay.addView(timeView, new LinearLayout.LayoutParams(0, 44, 1));
    overlay.addView(label("5G", 14), new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, 44));
    overlay.addView(label("▮▮▮", 11), new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, 44));
    overlay.addView(label("82%", 12), new LinearLayout.LayoutParams(LinearLayout.LayoutParams.WRAP_CONTENT, 44));
    WindowManager.LayoutParams params = new WindowManager.LayoutParams(
      WindowManager.LayoutParams.MATCH_PARENT, 44,
      WindowManager.LayoutParams.TYPE_ACCESSIBILITY_OVERLAY,
      WindowManager.LayoutParams.FLAG_NOT_FOCUSABLE | WindowManager.LayoutParams.FLAG_LAYOUT_IN_SCREEN,
      PixelFormat.TRANSLUCENT
    );
    params.gravity = Gravity.TOP | Gravity.CENTER_HORIZONTAL;
    windowManager.addView(overlay, params);
    ticker.run();
  }

  private TextView label(String value, int size) {
    TextView view = new TextView(this);
    view.setText(value);
    view.setTextColor(Color.WHITE);
    view.setTextSize(size);
    view.setTypeface(Typeface.DEFAULT, Typeface.BOLD);
    view.setGravity(Gravity.CENTER_VERTICAL);
    view.setPadding(8, 0, 8, 0);
    return view;
  }

  @Override public void onAccessibilityEvent(AccessibilityEvent event) { }
  @Override public void onInterrupt() { }
  @Override public void onDestroy() {
    handler.removeCallbacks(ticker);
    if (overlay != null && windowManager != null) windowManager.removeView(overlay);
    overlay = null;
    super.onDestroy();
  }
}
