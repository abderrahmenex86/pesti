import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { Image as ExpoImage } from 'expo-image';
import { Link } from 'expo-router';
import {
    ArrowRight,
    ArrowRightLeft,
    Camera,
    ChevronRight,
    Flower2,
    Image,
    Leaf,
} from 'lucide-react-native';
import { useRef, useState } from 'react';
import {
    Button,
    Pressable,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors, radii } from '@/styles/global';

const recentPlants = [
    {
        id: '1',
        name: 'Monstera',
        detail: 'Added 12m ago',
        icon: 'leaf',
        background: colors.primaryContainer,
        iconColor: colors.onPrimaryContainer,
    },
    {
        id: '2',
        name: 'Snake plant',
        detail: 'Added yesterday',
        icon: 'flower2',
        background: colors.secondaryContainer,
        iconColor: colors.onSecondaryContainer,
    },
    {
        id: '3',
        name: 'Basil',
        detail: 'Added this morning',
        icon: 'leaf',
        background: colors.tertiaryContainer,
        iconColor: colors.onTertiaryContainer,
    },
] as const;

export default function HomeTab() {
    const bottomTabBarHeight = useBottomTabBarHeight();
    const cameraRef = useRef<CameraView | null>(null);
    const [facing, setFacing] = useState<CameraType>('back');
    const [cameraReady, setCameraReady] = useState(false);
    const [capturedPhotoUri, setCapturedPhotoUri] = useState<string | null>(
        null,
    );
    const [isCapturing, setIsCapturing] = useState(false);
    const [permission, requestPermission] = useCameraPermissions();

    if (!permission) {
        return (
            <SafeAreaView
                edges={['top', 'left', 'right']}
                style={styles.safeArea}>
                <View style={styles.permissionState}>
                    <Text style={styles.permissionTitle}>Preparing camera</Text>
                    <Text style={styles.permissionText}>
                        Loading camera permissions.
                    </Text>
                </View>
            </SafeAreaView>
        );
    }
    if (!permission.granted) {
        return (
            <SafeAreaView
                edges={['top', 'left', 'right']}
                style={styles.safeArea}>
                <View style={styles.permissionState}>
                    <Text style={styles.permissionTitle}>
                        Camera access required
                    </Text>
                    <Text style={styles.permissionText}>
                        Grant camera permission to show the plant preview.
                    </Text>
                    <Button
                        onPress={requestPermission}
                        title='Grant permission'
                    />
                </View>
            </SafeAreaView>
        );
    }

    async function capturePhoto() {
        if (!cameraRef.current || !cameraReady || isCapturing) {
            return;
        }

        setIsCapturing(true);

        try {
            const photo = await cameraRef.current.takePictureAsync({
                quality: 0.8,
                skipProcessing: true,
            });

            setCapturedPhotoUri(photo.uri);
        } catch {
            // Keep the preview available if capture fails on the device.
        } finally {
            setIsCapturing(false);
        }
    }

    function retakePhoto() {
        setCapturedPhotoUri(null);
        setCameraReady(false);
    }

    function toggleCameraFacing() {
        setFacing((current) => (current === 'back' ? 'front' : 'back'));
    }

    return (
        <SafeAreaView
            edges={['top', 'left', 'right']}
            style={styles.safeArea}>
            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={[
                    styles.screen,
                    { paddingBottom: bottomTabBarHeight },
                ]}
                showsVerticalScrollIndicator={false}>
                <View style={styles.screenBody}>
                    <View style={styles.orbPrimary} />
                    <View style={styles.orbSecondary} />

                    <View style={styles.recentSection}>
                        <View style={styles.sectionHeader}>
                            <View style={styles.sectionHeaderText}>
                                <Text style={styles.kicker}>Last added</Text>
                                <Text style={styles.sectionTitle}>
                                    Recent plants
                                </Text>
                            </View>

                            <Link
                                href='/garden'
                                asChild>
                                <Pressable style={styles.gardenLink}>
                                    <Text style={styles.gardenLinkText}>
                                        Garden
                                    </Text>
                                    <ArrowRight
                                        size={16}
                                        color={colors.onSecondaryContainer}
                                        strokeWidth={2.25}
                                    />
                                </Pressable>
                            </Link>
                        </View>

                        <ScrollView
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={styles.recentTrack}>
                            {recentPlants.map((plant) => {
                                const RecentIcon =
                                    plant.icon === 'flower2' ? Flower2 : Leaf;

                                return (
                                    <View
                                        key={plant.id}
                                        style={[
                                            styles.recentCard,
                                            {
                                                backgroundColor:
                                                    plant.background,
                                            },
                                        ]}>
                                        <View
                                            style={[
                                                styles.recentIcon,
                                                {
                                                    backgroundColor:
                                                        plant.iconColor,
                                                },
                                            ]}>
                                            <RecentIcon
                                                size={18}
                                                color={plant.background}
                                                strokeWidth={2.25}
                                            />
                                        </View>

                                        <Text style={styles.recentName}>
                                            {plant.name}
                                        </Text>
                                        <Text style={styles.recentDetail}>
                                            {plant.detail}
                                        </Text>
                                    </View>
                                );
                            })}
                        </ScrollView>
                    </View>

                    <View style={styles.captureSection}>
                        <View style={styles.captureHeader}>
                            <Text style={styles.captureKicker}>Scan</Text>
                            <Text style={styles.captureTitle}>
                                Take a picture or select from gallery
                            </Text>
                        </View>

                        <View style={styles.captureBody}>
                            <View style={styles.cameraCard}>
                                {capturedPhotoUri ?
                                    <ExpoImage
                                        source={{ uri: capturedPhotoUri }}
                                        style={styles.cameraPreview}
                                        contentFit='cover'
                                    />
                                :   <CameraView
                                        ref={cameraRef}
                                        style={styles.cameraPreview}
                                        facing={facing}
                                        onCameraReady={() => {
                                            setCameraReady(true);
                                        }}
                                    />
                                }

                                <View style={styles.cameraOverlay}>
                                    <View style={styles.cameraTopBadge}>
                                        <Camera
                                            size={14}
                                            color={colors.onPrimary}
                                            strokeWidth={2.25}
                                        />
                                        <Text style={styles.cameraTopBadgeText}>
                                            {capturedPhotoUri ?
                                                'Preview saved'
                                            :   'Live camera'}
                                        </Text>
                                    </View>

                                    <View style={styles.cameraControls}>
                                        <TouchableOpacity
                                            onPress={toggleCameraFacing}
                                            style={styles.cameraFlipButton}>
                                            <ArrowRightLeft
                                                size={18}
                                                color={colors.onPrimary}
                                                strokeWidth={2.25}
                                            />
                                            <Text
                                                style={
                                                    styles.cameraControlText
                                                }>
                                                Flip
                                            </Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity
                                            onPress={
                                                capturedPhotoUri ? retakePhoto
                                                :   capturePhoto
                                            }
                                            disabled={
                                                !capturedPhotoUri &&
                                                (!cameraReady || isCapturing)
                                            }
                                            style={[
                                                styles.cameraShutterButton,
                                                !capturedPhotoUri &&
                                                    (!cameraReady ||
                                                        isCapturing) &&
                                                    styles.cameraShutterButtonDisabled,
                                                capturedPhotoUri &&
                                                    styles.cameraShutterButtonCaptured,
                                            ]}>
                                            <Camera
                                                size={24}
                                                color={colors.background}
                                                strokeWidth={2.25}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>

                            <Pressable style={styles.galleryCard}>
                                <View style={styles.galleryCopy}>
                                    <View style={styles.galleryIcon}>
                                        <Image
                                            size={20}
                                            color={colors.onSecondaryContainer}
                                            strokeWidth={2.25}
                                        />
                                    </View>

                                    <View style={styles.galleryTextBlock}>
                                        <Text style={styles.galleryTitle}>
                                            Select from gallery
                                        </Text>
                                        <Text style={styles.gallerySubtitle}>
                                            Choose an existing photo from your
                                            device
                                        </Text>
                                    </View>
                                </View>

                                <ChevronRight
                                    size={22}
                                    color={colors.textSecondary}
                                    strokeWidth={2.25}
                                />
                            </Pressable>
                        </View>
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
    scrollView: {
        flex: 1,
        backgroundColor: colors.background,
    },
    permissionState: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: colors.background,
    },
    permissionTitle: {
        fontSize: 24,
        lineHeight: 28,
        fontWeight: '700',
        color: colors.text,
        textAlign: 'center',
    },
    permissionText: {
        marginTop: 10,
        marginBottom: 20,
        fontSize: 15,
        lineHeight: 22,
        color: colors.textSecondary,
        textAlign: 'center',
        maxWidth: 320,
    },
    screen: {
        flexGrow: 1,
        backgroundColor: colors.background,
        paddingHorizontal: 16,
        paddingTop: 16,
    },
    screenBody: {
        flex: 1,
    },
    orbPrimary: {
        position: 'absolute',
        top: -120,
        right: -90,
        width: 240,
        height: 240,
        borderRadius: 240,
        backgroundColor: 'rgba(70, 155, 49, 0.16)',
    },
    orbSecondary: {
        position: 'absolute',
        top: 220,
        left: -110,
        width: 180,
        height: 180,
        borderRadius: 180,
        backgroundColor: 'rgba(119, 192, 179, 0.1)',
    },
    recentSection: {
        flex: 0.95,
        justifyContent: 'space-between',
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        gap: 12,
    },
    sectionHeaderText: {
        flex: 1,
    },
    kicker: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: colors.textMuted,
    },
    sectionTitle: {
        marginTop: 4,
        fontSize: 26,
        lineHeight: 30,
        fontWeight: '700',
        color: colors.text,
        letterSpacing: -0.4,
    },
    gardenLink: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 14,
        paddingVertical: 10,
        borderRadius: radii.pill,
        backgroundColor: colors.secondaryContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    gardenLinkText: {
        fontSize: 12,
        fontWeight: '700',
        color: colors.onSecondaryContainer,
    },
    recentTrack: {
        gap: 12,
        paddingTop: 14,
        paddingBottom: 4,
    },
    recentCard: {
        width: 118,
        minHeight: 112,
        padding: 12,
        borderRadius: radii.large,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    recentIcon: {
        width: 36,
        height: 36,
        borderRadius: 36,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 12,
    },
    recentName: {
        fontSize: 15,
        fontWeight: '700',
        color: colors.text,
    },
    recentDetail: {
        marginTop: 4,
        fontSize: 12,
        lineHeight: 16,
        color: colors.textSecondary,
    },
    captureSection: {
        flex: 2.05,
        justifyContent: 'space-between',
        paddingTop: 12,
    },
    captureHeader: {
        marginBottom: 12,
    },
    captureKicker: {
        fontSize: 12,
        fontWeight: '700',
        letterSpacing: 1.2,
        textTransform: 'uppercase',
        color: colors.textMuted,
    },
    captureTitle: {
        marginTop: 4,
        fontSize: 20,
        lineHeight: 24,
        fontWeight: '700',
        color: colors.text,
        maxWidth: 320,
    },
    captureBody: {
        flex: 1,
        justifyContent: 'space-between',
        gap: 12,
    },
    cameraCard: {
        width: '100%',
        maxWidth: 320,
        aspectRatio: 1,
        alignSelf: 'center',
        borderRadius: radii.extraLarge,
        backgroundColor: colors.surfaceContainerHigh,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
        overflow: 'hidden',
        shadowColor: colors.shadow,
        shadowOpacity: 0.18,
        shadowRadius: 18,
        shadowOffset: { width: 0, height: 10 },
        elevation: 2,
    },
    cameraPreview: {
        ...StyleSheet.absoluteFillObject,
    },
    cameraOverlay: {
        flex: 1,
        justifyContent: 'space-between',
        padding: 16,
        backgroundColor: 'rgba(0, 0, 0, 0.12)',
    },
    cameraTopBadge: {
        alignSelf: 'flex-start',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: radii.pill,
        backgroundColor: 'rgba(13, 16, 22, 0.72)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    cameraTopBadgeText: {
        color: colors.onPrimary,
        fontSize: 12,
        fontWeight: '700',
    },
    cameraControls: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 12,
    },
    cameraFlipButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        paddingHorizontal: 14,
        paddingVertical: 12,
        borderRadius: radii.pill,
        backgroundColor: 'rgba(13, 16, 22, 0.72)',
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.12)',
    },
    cameraControlText: {
        color: colors.onPrimary,
        fontSize: 12,
        fontWeight: '700',
    },
    cameraShutterButton: {
        width: 64,
        height: 64,
        borderRadius: 64,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondary,
        shadowColor: colors.shadow,
        shadowOpacity: 0.28,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 6 },
        elevation: 4,
    },
    cameraShutterButtonDisabled: {
        opacity: 0.6,
    },
    cameraShutterButtonCaptured: {
        backgroundColor: colors.primary,
    },
    cameraGlowOne: {
        position: 'absolute',
        top: -60,
        right: -40,
        width: 160,
        height: 160,
        borderRadius: 160,
        backgroundColor: 'rgba(70, 155, 49, 0.1)',
    },
    cameraGlowTwo: {
        position: 'absolute',
        bottom: -70,
        left: -50,
        width: 180,
        height: 180,
        borderRadius: 180,
        backgroundColor: 'rgba(119, 192, 179, 0.08)',
    },
    cameraTitle: {
        marginTop: 12,
        fontSize: 22,
        lineHeight: 26,
        fontWeight: '700',
        color: colors.text,
    },
    cameraSubtitle: {
        marginTop: 6,
        fontSize: 13,
        lineHeight: 18,
        color: colors.textSecondary,
        textAlign: 'center',
        maxWidth: 220,
    },
    galleryCard: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        minHeight: 92,
        paddingHorizontal: 16,
        paddingVertical: 14,
        borderRadius: radii.large,
        backgroundColor: colors.surfaceContainer,
        borderWidth: 1,
        borderColor: colors.outlineVariant,
    },
    galleryCopy: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 14,
        flex: 1,
    },
    galleryIcon: {
        width: 44,
        height: 44,
        borderRadius: 44,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.secondaryContainer,
    },
    galleryTextBlock: {
        flex: 1,
    },
    galleryTitle: {
        fontSize: 16,
        fontWeight: '700',
        color: colors.text,
    },
    gallerySubtitle: {
        marginTop: 4,
        fontSize: 13,
        lineHeight: 18,
        color: colors.textSecondary,
    },
});
