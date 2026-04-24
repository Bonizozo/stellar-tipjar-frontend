import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Nav = NativeStackNavigationProp<RootStackParamList, 'Home'>;

export function HomeScreen() {
  const navigation = useNavigation<Nav>();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.badge}>Open Source · Stellar</Text>
        <Text style={styles.headline}>Support Creators{'\n'}with Stellar</Text>
        <Text style={styles.sub}>
          Fast, borderless, and fee-friendly tipping powered by blockchain.
        </Text>
        <View style={styles.stats}>
          {[
            { label: 'Creators', value: '2,400+' },
            { label: 'Tips Sent', value: '18,000+' },
            { label: 'XLM Out', value: '500K+' },
          ].map(({ label, value }) => (
            <View key={label} style={styles.stat}>
              <Text style={styles.statValue}>{value}</Text>
              <Text style={styles.statLabel}>{label}</Text>
            </View>
          ))}
        </View>
        <TouchableOpacity
          style={styles.btnPrimary}
          onPress={() => navigation.navigate('Explore')}
          accessibilityRole="button"
        >
          <Text style={styles.btnPrimaryText}>Explore Creators</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.btnSecondary}
          onPress={() => navigation.navigate('Tip', { username: '' })}
          accessibilityRole="button"
        >
          <Text style={styles.btnSecondaryText}>Send a Tip</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f2e8' },
  content: { padding: 24, alignItems: 'center' },
  badge: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
    color: '#0f6c7b',
    backgroundColor: 'rgba(15,108,123,0.1)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 20,
  },
  headline: {
    fontSize: 40,
    fontWeight: '800',
    textAlign: 'center',
    color: '#151515',
    lineHeight: 48,
    marginBottom: 16,
  },
  sub: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  stats: { flexDirection: 'row', gap: 24, marginBottom: 40 },
  stat: { alignItems: 'center' },
  statValue: { fontSize: 22, fontWeight: '800', color: '#ff785a' },
  statLabel: { fontSize: 12, color: '#888', marginTop: 2 },
  btnPrimary: {
    backgroundColor: '#ff785a',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
    marginBottom: 12,
  },
  btnPrimaryText: { color: '#fff', fontWeight: '700', fontSize: 16 },
  btnSecondary: {
    borderWidth: 1.5,
    borderColor: '#0f6c7b',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 14,
    width: '100%',
    alignItems: 'center',
  },
  btnSecondaryText: { color: '#0f6c7b', fontWeight: '700', fontSize: 16 },
});
