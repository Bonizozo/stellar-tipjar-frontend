import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  TextInput,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Explore'>;

const MOCK_CREATORS = [
  { username: 'alice', displayName: 'Alice Art', category: 'Art' },
  { username: 'bob', displayName: 'Bob Music', category: 'Music' },
  { username: 'carol', displayName: 'Carol Dev', category: 'Tech' },
];

export function ExploreScreen() {
  const navigation = useNavigation<Nav>();
  const [query, setQuery] = useState('');

  const filtered = MOCK_CREATORS.filter(
    (c) =>
      c.displayName.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Explore Creators</Text>
      <TextInput
        style={styles.search}
        placeholder="Search creators..."
        value={query}
        onChangeText={setQuery}
        accessibilityLabel="Search creators"
      />
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.username}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('Creator', { username: item.username })}
            accessibilityRole="button"
            accessibilityLabel={`View ${item.displayName}'s profile`}
          >
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.displayName[0]}</Text>
            </View>
            <View>
              <Text style={styles.name}>{item.displayName}</Text>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f2e8', padding: 16 },
  title: { fontSize: 28, fontWeight: '800', color: '#151515', marginBottom: 16 },
  search: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 16,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#fff',
    borderRadius: 14,
    padding: 14,
    marginBottom: 10,
    shadowColor: '#0f6c7b',
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(15,108,123,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontSize: 18, fontWeight: '700', color: '#0f6c7b' },
  name: { fontSize: 16, fontWeight: '700', color: '#151515' },
  category: { fontSize: 13, color: '#888', marginTop: 2 },
});
