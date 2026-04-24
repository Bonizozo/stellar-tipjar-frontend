import React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Creator'>;
type Nav = NativeStackNavigationProp<RootStackParamList, 'Creator'>;

export function CreatorScreen({ route }: Props) {
  const navigation = useNavigation<Nav>();
  const { username } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{username[0]?.toUpperCase() ?? '?'}</Text>
        </View>
        <Text style={styles.label}>Creator Profile</Text>
        <Text style={styles.name}>{username}</Text>
        <Text style={styles.bio}>
          Supporting creators on the Stellar network. Send a tip to show your appreciation!
        </Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={() => navigation.navigate('Tip', { username })}
          accessibilityRole="button"
        >
          <Text style={styles.btnText}>Tip This Creator</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f2e8' },
  content: { padding: 24, alignItems: 'center' },
  back: { alignSelf: 'flex-start', marginBottom: 20 },
  backText: { color: '#0f6c7b', fontWeight: '600', fontSize: 15 },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: 'rgba(15,108,123,0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: { fontSize: 32, fontWeight: '800', color: '#0f6c7b' },
  label: { fontSize: 11, fontWeight: '700', letterSpacing: 1, color: '#0f6c7b', textTransform: 'uppercase', marginBottom: 4 },
  name: { fontSize: 28, fontWeight: '800', color: '#151515', marginBottom: 12 },
  bio: { fontSize: 15, color: '#555', textAlign: 'center', lineHeight: 22, marginBottom: 32 },
  btn: {
    backgroundColor: '#ff785a',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 16 },
});
