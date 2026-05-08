import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BookOpen, BookOpenText, Search, TestTube2 } from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii } from '@/styles/global';

export default function LibraryTab() {
    const bottomTabBarHeight = useBottomTabBarHeight();

    return (
        <SafeAreaView
            edges={['top', 'left', 'right']}
            style={styles.safeArea}>
            <View style={styles.orbPrimary} />
            <View style={styles.orbSecondary} />
            <ScrollView
                style={styles.container}
                contentContainerStyle={[
                    styles.content,
                    { paddingBottom: bottomTabBarHeight },
                ]}
                showsVerticalScrollIndicator={false}>
                <View style={styles.headerCard}>
                    <View style={styles.headerRow}>
                        <View>
                            <Text style={styles.kicker}>Library</Text>
                            <Text style={styles.title}>Plant encyclopedia</Text>
                        </View>

                        <View style={styles.statusPill}>
                            <BookOpen
                                size={14}
                                color={colors.onSecondaryContainer}
                                strokeWidth={2.25}
                            />
                            <Text style={styles.statusText}>Browse</Text>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>
                        Explore species profiles, plant care, and quick facts in
                        a layered Material 3 surface layout.
                    </Text>

                    <View style={styles.searchBar}>
                        <Search
                            size={20}
                            color={colors.textSecondary}
                            strokeWidth={2.25}
                        />
                        <Text style={styles.searchPlaceholder}>
                            Search species, care, or lighting
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionLabel}>Explore by topic</Text>

                <View style={styles.chipRow}>
                    <View style={styles.chipPrimary}>
                        <Text style={styles.chipPrimaryText}>Houseplants</Text>
                    </View>
                    <View style={styles.chipSecondary}>
                        <Text style={styles.chipSecondaryText}>Succulents</Text>
                    </View>
                </View>

                <View style={styles.chipRow}>
                    <View style={styles.chipTertiary}>
                        <Text style={styles.chipTertiaryText}>Herbs</Text>
                    </View>
                    <View style={styles.chipMuted}>
                        <Text style={styles.chipMutedText}>Trees</Text>
                    </View>
                </View>

                <View style={styles.featureCard}>
                    <View style={styles.featureIconPrimary}>
                        <BookOpenText
                            size={20}
                            color={colors.onPrimaryContainer}
                            strokeWidth={2.25}
                        />
                    </View>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>
                            Species profiles
                        </Text>
                        <Text style={styles.featureSubtitle}>
                            Learn about growth patterns, watering, soil, and
                            ideal light.
                        </Text>
                    </View>
                </View>

                <View style={styles.featureCard}>
                    <View style={styles.featureIconSecondary}>
                        <BookOpen
                            size={20}
                            color={colors.onSecondaryContainer}
                            strokeWidth={2.25}
                        />
                    </View>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>Care basics</Text>
                        <Text style={styles.featureSubtitle}>
                            Build a small reference library for everyday plant
                            care and troubleshooting.
                        </Text>
                    </View>
                </View>

                <View style={styles.featureCardTonal}>
                    <View style={styles.featureIconTertiary}>
                        <TestTube2
                            size={20}
                            color={colors.onTertiaryContainer}
                            strokeWidth={2.25}
                        />
                    </View>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>Plant facts</Text>
                        <Text style={styles.featureSubtitle}>
                            Keep notes about toxicity, propagation, and seasonal
                            growth in one place.
                        </Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: colors.background,
    },
    container: {
        flex: 1,
        backgroundColor: colors.background,
    },
    content: {
        flexGrow: 1,
        paddingHorizontal: 20,
        paddingTop: 16,
    },
    orbPrimary: {
        position: 'absolute',
        top: -100,
        left: -90,
        width: 200,
        height: 200,
        borderRadius: 200,
        backgroundColor: 'rgba(70, 155, 49, 0.12)',
    },
    orbSecondary: {
        position: 'absolute',
        bottom: 140,
        right: -100,
        width: 180,
        height: 180,
        borderRadius: 180,
        backgroundColor: 'rgba(119, 192, 179, 0.08)',
    },
    headerCard: {
        overflow: 'hidden',
        padding: 20,
        borderRadius: radii.extraLarge,
        backgroundColor: colors.surfaceContainerHigh,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    headerRow: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 16,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: colors.textMuted,
    },
    title: {
        marginTop: 4,
        fontSize: 30,
        lineHeight: 36,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: -0.5,
    },
    subtitle: {
        marginTop: 12,
        fontSize: 16,
        color: colors.textSecondary,
        lineHeight: 24,
    },
    statusPill: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: radii.pill,
        backgroundColor: colors.secondaryContainer,
    },
    statusText: {
        color: colors.onSecondaryContainer,
        fontSize: 12,
        fontWeight: '700',
    },
    searchBar: {
        marginTop: 18,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: radii.pill,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    searchPlaceholder: {
        flex: 1,
        fontSize: 14,
        color: colors.textSecondary,
    },
    sectionLabel: {
        marginTop: 24,
        marginBottom: 12,
        fontSize: 13,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: colors.textSecondary,
    },
    chipRow: {
        flexDirection: 'row',
        gap: 12,
        marginBottom: 12,
    },
    chipPrimary: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: radii.pill,
        backgroundColor: colors.primaryContainer,
    },
    chipPrimaryText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.onPrimaryContainer,
    },
    chipSecondary: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: radii.pill,
        backgroundColor: colors.secondaryContainer,
    },
    chipSecondaryText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.onSecondaryContainer,
    },
    chipTertiary: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: radii.pill,
        backgroundColor: colors.tertiaryContainer,
    },
    chipTertiaryText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.onTertiaryContainer,
    },
    chipMuted: {
        flex: 1,
        paddingVertical: 14,
        alignItems: 'center',
        borderRadius: radii.pill,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    chipMutedText: {
        fontSize: 13,
        fontWeight: '700',
        color: colors.textSecondary,
    },
    featureCard: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginTop: 12,
        padding: 16,
        borderRadius: radii.large,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    featureCardTonal: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        marginTop: 12,
        padding: 16,
        borderRadius: radii.large,
        backgroundColor: colors.surfaceContainerHigh,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    featureIconPrimary: {
        width: 48,
        height: 48,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryContainer,
    },
    featureIconSecondary: {
        width: 48,
        height: 48,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryContainer,
    },
    featureIconTertiary: {
        width: 48,
        height: 48,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.tertiaryContainer,
    },
    featureText: {
        flex: 1,
    },
    featureTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    featureSubtitle: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 19,
        color: colors.textSecondary,
    },
});
