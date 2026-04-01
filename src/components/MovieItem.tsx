import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Movie, useAppContext } from '../context/AppContext';

export const MovieItem = ({ item }: { item: Movie }) => {
  const { theme, removeMovie } = useAppContext();
  const isDark = theme === 'dark';

  const dateStr = new Date(item.timestamp).toLocaleString();

  return (
    <View style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]}>
      {item.thumbnail ? (
        <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} resizeMode="cover" />
      ) : null}
      <View style={styles.textContainer}>
        <Text style={[styles.title, isDark ? styles.darkText : styles.lightText]}>{item.title}</Text>
        {item.rating ? (
          <Text style={styles.rating}>⭐ {item.rating}</Text>
        ) : null}
        <Text style={[styles.timestamp, isDark ? styles.darkTimestamp : styles.lightTimestamp]}>{dateStr}</Text>
      </View>
      <TouchableOpacity style={styles.deleteButton} onPress={() => removeMovie(item.id)}>
        <MaterialIcons name="delete-outline" size={24} color="#E50914" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: '#E50914',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  darkContainer: {
    backgroundColor: '#1E1E1E',
  },
  lightContainer: {
    backgroundColor: '#FFFFFF',
  },
  textContainer: {
    flex: 1,
  },
  thumbnail: {
    width: 50,
    height: 75,
    borderRadius: 4,
    marginRight: 12,
    backgroundColor: '#333',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  darkText: {
    color: '#FFFFFF',
  },
  lightText: {
    color: '#121212',
  },
  rating: {
    fontSize: 12,
    color: '#E50914',
    marginBottom: 4,
    fontWeight: 'bold',
  },
  timestamp: {
    fontSize: 12,
  },
  darkTimestamp: {
    color: '#888888',
  },
  lightTimestamp: {
    color: '#666666',
  },
  deleteButton: {
    padding: 8,
  },
});
