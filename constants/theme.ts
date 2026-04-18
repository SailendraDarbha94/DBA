/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from 'react-native';

const tintColorLight = '#C1440E';
const tintColorDark = '#E8724A';

export const Colors = {
  light: {
    text: '#2C1810',
    background: '#FAF6F1',
    tint: tintColorLight,
    icon: '#9E6B55',
    tabIconDefault: '#9E6B55',
    tabIconSelected: tintColorLight,
    card: '#F0E8DF',
    muted: '#8A6855',
    border: '#DDD0C4',
  },
  dark: {
    text: '#F5EDE4',
    background: '#1C1410',
    tint: tintColorDark,
    icon: '#A07060',
    tabIconDefault: '#A07060',
    tabIconSelected: tintColorDark,
    card: '#2C1C14',
    muted: '#A07060',
    border: '#3C2418',
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: 'system-ui',
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: 'ui-serif',
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: 'ui-rounded',
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: 'ui-monospace',
  },
  default: {
    sans: 'normal',
    serif: 'serif',
    rounded: 'normal',
    mono: 'monospace',
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded: "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
