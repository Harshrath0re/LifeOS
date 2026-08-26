import { Dimensions, PixelRatio } from 'react-native';

const { width, height } = Dimensions.get('window');

// Reference Device
// iPhone 13 / 14 / 15
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;

/**
 * Screen Dimensions
 */
export const SCREEN_WIDTH = width;
export const SCREEN_HEIGHT = height;

/**
 * Width Percentage
 */
export const wp = (size: number): number => {
    return (width * size) / 100;
};

/**
 * Height Percentage
 */
export const hp = (size: number): number => {
    return (height * size) / 100;
};

/**
 * Responsive Width Scaling
 * Example: rw(16)
 */
export const rw = (size: number): number => {
    return (width / guidelineBaseWidth) * size;
};

/**
 * Responsive Height Scaling
 * Example: rh(16)
 */
export const rh = (size: number): number => {
    return (height / guidelineBaseHeight) * size;
};

/**
 * Responsive Font
 */
export const rf = (size: number): number => {
    const scale = Math.min(
        width / guidelineBaseWidth,
        height / guidelineBaseHeight,
    );

    return Math.round(PixelRatio.roundToNearestPixel(size * scale));
};

/**
 * Device Helpers
 */

export const isSmallDevice = width < 360;

export const isTablet = width >= 768;

export const isLandscape = width > height;

/**
 * Safe Responsive Radius
 */
export const rr = (size: number): number => {
    return rw(size);
};

/**
 * Safe Responsive Icon Size
 */
export const ri = (size: number): number => {
    return rw(size);
};

/**
 * Spacing Helpers
 */

export const SPACING = {
    xs: rh(4),
    sm: rh(8),
    md: rh(16),
    lg: rh(24),
    xl: rh(32),
    xxl: rh(48),
};