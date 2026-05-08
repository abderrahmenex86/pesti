import { Tabs } from 'expo-router';
import { BookOpenText, Camera, Leaf } from 'lucide-react-native';

import { colors } from '@/styles/global';

export default function TabLayout() {
    return (
        <Tabs
            screenOptions={{
                headerShown: false,
                tabBarActiveTintColor: colors.secondary,
                tabBarInactiveTintColor: colors.textSecondary,
                tabBarStyle: {
                    backgroundColor: colors.surfaceContainer,
                    borderTopColor: colors.outlineVariant,
                    borderTopWidth: 2,
                    height: 96,
                    paddingTop: 8,
                    paddingBottom: 8,
                },
                tabBarLabelStyle: {
                    fontSize: 12,
                    fontWeight: '700',
                    letterSpacing: 0.2,
                },
                tabBarItemStyle: {
                    paddingVertical: 4,
                },
            }}>
            <Tabs.Screen
                name='index'
                options={{
                    title: 'Home',
                    tabBarIcon: ({ color, focused }) => (
                        <Camera
                            size={24}
                            strokeWidth={focused ? 2.5 : 2}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='garden'
                options={{
                    title: 'Garden',
                    tabBarIcon: ({ color, focused }) => (
                        <Leaf
                            size={24}
                            strokeWidth={focused ? 2.5 : 2}
                            color={color}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name='library'
                options={{
                    title: 'Library',
                    tabBarIcon: ({ color, focused }) => (
                        <BookOpenText
                            size={24}
                            strokeWidth={focused ? 2.5 : 2}
                            color={color}
                        />
                    ),
                }}
            />
        </Tabs>
    );
}
