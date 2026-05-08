import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import {
    Droplets,
    Flower2,
    LayoutGrid,
    Leaf,
    SunMedium,
} from 'lucide-react-native';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii } from '@/styles/global';

export default function GardenTab() {
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
                            <Text style={styles.kicker}>Garden</Text>
                            <Text style={styles.title}>Saved plants</Text>
                        </View>

                        <View style={styles.statusPill}>
                            <Leaf
                                size={14}
                                color={colors.onSecondaryContainer}
                                strokeWidth={2.25}
                            />
                            <Text style={styles.statusText}>Empty shelf</Text>
                        </View>
                    </View>

                    <Text style={styles.subtitle}>
                        This is where plant scans will be organized into a calm,
                        easy-to-browse collection.
                    </Text>

                    <View style={styles.emptyStateCard}>
                        <View style={styles.emptyStateIcon}>
                            <Flower2
                                size={34}
                                color={colors.primary}
                                strokeWidth={1.8}
                            />
                        </View>
                        <Text style={styles.emptyStateTitle}>
                            Your first saved plant will appear here
                        </Text>
                        <Text style={styles.emptyStateSubtitle}>
                            Identify a plant from the Home tab and store it in
                            your garden.
                        </Text>
                    </View>
                </View>

                <Text style={styles.sectionLabel}>Living notes</Text>

                <View style={styles.gridRow}>
                    <View style={styles.gridCard}>
                        <View style={styles.gridIconPrimary}>
                            <Droplets
                                size={20}
                                color={colors.onPrimaryContainer}
                                strokeWidth={2.25}
                            />
                        </View>
                        <Text style={styles.gridTitle}>Watering</Text>
                        <Text style={styles.gridSubtitle}>
                            Track moisture and keep care reminders close.
                        </Text>
                    </View>

                    <View style={styles.gridCard}>
                        <View style={styles.gridIconSecondary}>
                            <SunMedium
                                size={20}
                                color={colors.onTertiaryContainer}
                                strokeWidth={2.25}
                            />
                        </View>
                        <Text style={styles.gridTitle}>Light</Text>
                        <Text style={styles.gridSubtitle}>
                            Store sunlight preferences alongside each plant.
                        </Text>
                    </View>
                </View>

                <View style={styles.featureCard}>
                    <View style={styles.featureIcon}>
                        <LayoutGrid
                            size={20}
                            color={colors.onSecondaryContainer}
                            strokeWidth={2.25}
                        />
                    </View>
                    <View style={styles.featureText}>
                        <Text style={styles.featureTitle}>
                            Organize by room
                        </Text>
                        <Text style={styles.featureSubtitle}>
                            Use the Garden tab as a planted shelf for every
                            corner of your home.
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
        top: 40,
        right: -95,
        width: 180,
        height: 180,
        borderRadius: 180,
        backgroundColor: 'rgba(70, 155, 49, 0.12)',
    },
    orbSecondary: {
        position: 'absolute',
        bottom: 140,
        left: -80,
        width: 160,
        height: 160,
        borderRadius: 160,
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
        fontSize: 34,
        lineHeight: 40,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: -0.6,
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
    emptyStateCard: {
        marginTop: 18,
        alignItems: 'center',
        padding: 20,
        borderRadius: radii.extraLarge,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    emptyStateIcon: {
        width: 72,
        height: 72,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 72,
        backgroundColor: colors.primaryContainer,
    },
    emptyStateTitle: {
        marginTop: 16,
        textAlign: 'center',
        fontSize: 18,
        lineHeight: 24,
        fontWeight: '700',
        color: colors.text,
    },
    emptyStateSubtitle: {
        marginTop: 8,
        textAlign: 'center',
        fontSize: 14,
        lineHeight: 20,
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
    gridRow: {
        flexDirection: 'row',
        gap: 12,
    },
    gridCard: {
        flex: 1,
        minHeight: 156,
        padding: 16,
        borderRadius: radii.large,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    gridIconPrimary: {
        width: 44,
        height: 44,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.primaryContainer,
    },
    gridIconSecondary: {
        width: 44,
        height: 44,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.tertiaryContainer,
    },
    gridTitle: {
        marginTop: 16,
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    gridSubtitle: {
        marginTop: 6,
        fontSize: 13,
        lineHeight: 19,
        color: colors.textSecondary,
    },
    featureCard: {
        marginTop: 12,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        padding: 16,
        borderRadius: radii.large,
        backgroundColor: colors.surfaceContainerHigh,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    featureIcon: {
        width: 48,
        height: 48,
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryContainer,
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
