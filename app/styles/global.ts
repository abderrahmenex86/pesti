import { StyleSheet } from 'react-native';

export const colors = {
    background: '#0D1016',
    surface: '#11151D',
    surfaceContainerLow: '#141922',
    surfaceContainer: '#171D27',
    surfaceContainerHigh: '#1C2330',
    surfaceContainerHighest: '#222A39',
    surfaceBright: '#262E3E',
    surfaceDim: '#0A0D12',
    header: '#1A2030',
    primary: '#469B31',
    onPrimary: '#F4FBEF',
    primaryContainer: '#1F4018',
    onPrimaryContainer: '#E4F2DD',
    secondary: '#9FD870',
    onSecondary: '#0C1308',
    secondaryContainer: '#22351A',
    onSecondaryContainer: '#E8F6D8',
    tertiary: '#77C0B3',
    onTertiary: '#061F1C',
    tertiaryContainer: '#1D3634',
    onTertiaryContainer: '#D9F0EA',
    text: '#F5F7FB',
    textSecondary: '#A5AEC0',
    textMuted: '#7E8799',
    outline: '#465062',
    outlineVariant: 'rgba(166, 177, 201, 0.18)',
    alert: '#FF6B6B',
    shadow: 'rgba(0, 0, 0, 0.45)',
};

export const radii = {
    small: 12,
    medium: 20,
    large: 28,
    extraLarge: 36,
    pill: 999,
};

export const spacing = {
    xSmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
    xxLarge: 40,
};

export const globalStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        paddingTop: 24,
        paddingHorizontal: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: -0.4,
    },
    sectionTitle: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textSecondary,
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        marginTop: 28,
        marginBottom: 12,
    },
    empty: {
        color: colors.textSecondary,
        fontSize: 14,
        lineHeight: 20,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
});
