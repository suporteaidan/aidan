import { useWindowDimensions } from 'react-native';

export function useResponsive() {
  const { width, height } = useWindowDimensions();
  const isSmall = width < 380;
  const isLarge = width >= 430;
  const horizontalPadding = isSmall ? 16 : 22;
  const cardGap = isLarge ? 16 : 12;

  return {
    width,
    height,
    isSmall,
    isLarge,
    horizontalPadding,
    cardGap
  };
}
