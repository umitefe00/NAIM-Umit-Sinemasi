import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, ImageBackground, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Keyboard, ActivityIndicator } from 'react-native';
import { useAppContext } from '../../src/context/AppContext';
import { MovieItem } from '../../src/components/MovieItem';

export default function Home() {
  const { watchlist, addMovie, theme, t } = useAppContext();
  const [inputText, setInputText] = useState('');
  const [searchText, setSearchText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const isDark = theme === 'dark';

  const handleAdd = async () => {
    if (!inputText.trim() || isLoading) return;
    
    setIsLoading(true);
    Keyboard.dismiss();
    
    try {
      const resp = await fetch(`https://api.tvmaze.com/search/shows?q=${encodeURIComponent(inputText.trim())}`);
      const data = await resp.json();
      
      if (data && data.length > 0 && data[0].show) {
        const show = data[0].show;
        addMovie({
          title: show.name,
          thumbnail: show.image?.medium || undefined,
          rating: show.rating?.average ? show.rating.average.toString() : undefined,
        });
      } else {
        addMovie({ title: inputText.trim() });
      }
    } catch (e) {
      console.warn("API fetch failed", e);
      addMovie({ title: inputText.trim() });
    } finally {
      setIsLoading(false);
      setInputText('');
    }
  };

  const filteredWatchlist = watchlist.filter(m => m.title.toLowerCase().includes(searchText.toLowerCase()));

  return (
    <KeyboardAvoidingView 
      style={[styles.container, isDark ? styles.darkContainer : styles.lightContainer]} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.headerImageContainer}>
        <ImageBackground
          source={{ uri: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1000' }}
          style={styles.headerImage}
          imageStyle={{ opacity: isDark ? 0.6 : 0.8 }}
        >
          <View style={styles.overlay}>
             <Text style={styles.description}>{t.description}</Text>
          </View>
        </ImageBackground>
      </View>

      <View style={[styles.inputContainer, isDark ? styles.darkInputContainer : styles.lightInputContainer]}>
        <TextInput
          style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
          placeholder={t.placeholder}
          placeholderTextColor={isDark ? '#888' : '#aaa'}
          value={inputText}
          onChangeText={setInputText}
          onSubmitEditing={handleAdd}
          editable={!isLoading}
        />
        <TouchableOpacity style={[styles.addButton, isLoading && styles.disabledButton]} onPress={handleAdd} disabled={isLoading}>
          {isLoading ? <ActivityIndicator color="#FFF" /> : <Text style={styles.addButtonText}>{t.addToList}</Text>}
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <TextInput
          style={[styles.input, isDark ? styles.darkInput : styles.lightInput]}
          placeholder={t.searchPlaceholder}
          placeholderTextColor={isDark ? '#888' : '#aaa'}
          value={searchText}
          onChangeText={setSearchText}
        />
      </View>

      <FlatList
        data={filteredWatchlist}
        keyExtractor={item => item.id}
        renderItem={({ item }) => <MovieItem item={item} />}
        contentContainerStyle={styles.listContent}
        keyboardShouldPersistTaps="handled"
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  darkContainer: { backgroundColor: '#121212' },
  lightContainer: { backgroundColor: '#F5F5F5' },
  headerImageContainer: { height: 200, width: '100%' },
  headerImage: { flex: 1, resizeMode: 'cover', justifyContent: 'flex-end', backgroundColor: '#333' },
  overlay: {
    padding: 16,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  description: {
    color: '#FFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    gap: 12,
  },
  darkInputContainer: { backgroundColor: '#121212' },
  lightInputContainer: { backgroundColor: '#F5F5F5' },
  input: {
    flex: 1,
    height: 48,
    borderRadius: 8,
    paddingHorizontal: 16,
    fontSize: 16,
  },
  darkInput: {
    backgroundColor: '#1E1E1E',
    color: '#FFF',
  },
  lightInput: {
    backgroundColor: '#FFF',
    color: '#121212',
    borderColor: '#ddd',
    borderWidth: 1,
  },
  addButton: {
    backgroundColor: '#E50914',
    height: 48,
    paddingHorizontal: 16,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  disabledButton: {
    opacity: 0.7,
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  listContent: {
    paddingBottom: 24,
  },
});
