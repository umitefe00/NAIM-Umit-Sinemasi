import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { useAppContext } from '../../src/context/AppContext';
import React from 'react';

export default function TabLayout() {
  const { theme, t } = useAppContext();
  const isDark = theme === 'dark';

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTintColor: isDark ? '#FFFFFF' : '#121212',
        tabBarStyle: {
          backgroundColor: isDark ? '#121212' : '#FFFFFF',
          borderTopColor: isDark ? '#333' : '#ddd',
        },
        tabBarActiveTintColor: '#E50914',
        tabBarInactiveTintColor: isDark ? '#888' : '#aaa',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: `🍿 ${t.title}`,
          tabBarLabel: t.myList,
          tabBarIcon: ({ color }) => <MaterialIcons name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: t.settings,
          tabBarLabel: t.settings,
          tabBarIcon: ({ color }) => <MaterialIcons name="settings" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
