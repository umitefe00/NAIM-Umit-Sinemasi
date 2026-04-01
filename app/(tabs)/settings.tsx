import React from 'react';
import { View, Text, StyleSheet, Switch, TouchableOpacity, Alert } from 'react-native';
import { useAppContext } from '../../src/context/AppContext';

export default function Settings() {
  const { theme, language, toggleTheme, toggleLanguage, clearQueue, t } = useAppContext();
  const isDark = theme === 'dark';

  const handleClear = () => {
    Alert.alert(
      t.alertClearTitle,
      t.alertClearMessage,
      [
        { text: t.alertCancel, style: 'cancel' },
        { text: t.alertConfirm, style: 'destructive', onPress: clearQueue },
      ]
    );
  };

  return (
    <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      
      <View style={[styles.card, isDark ? styles.darkCard : styles.lightCard]}>
        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDark ? styles.darkText : styles.lightText]}>
            {t.darkMode}
          </Text>
          <Switch value={isDark} onValueChange={toggleTheme} trackColor={{ true: '#E50914' }} />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <Text style={[styles.settingLabel, isDark ? styles.darkText : styles.lightText]}>
            {t.language}
          </Text>
          <Switch value={language === 'tr'} onValueChange={toggleLanguage} trackColor={{ true: '#E50914' }} />
        </View>
      </View>

      <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
        <Text style={styles.clearButtonText}>{t.clearQueue}</Text>
      </TouchableOpacity>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  darkContainer: { backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#F5F5F5' },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkCard: { backgroundColor: '#1E1E1E' },
  lightCard: { backgroundColor: '#FFF' },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
  },
  divider: {
    height: 1,
    backgroundColor: '#333',
    marginVertical: 4,
    opacity: 0.5,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
  },
  darkText: { color: '#FFF' },
  lightText: { color: '#121212' },
  clearButton: {
    backgroundColor: '#E50914',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  clearButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
