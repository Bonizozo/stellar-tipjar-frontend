import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Tip'>;

const AMOUNTS = ['5', '10', '25', '50'];

export function TipScreen({ route }: Props) {
  const navigation = useNavigation();
  const { username } = route.params;
  const [amount, setAmount] = useState('10');
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      Alert.alert('Invalid amount', 'Please enter a valid tip amount.');
      return;
    }
    Alert.alert('Tip Sent!', `You tipped ${amount} XLM${username ? ` to @${username}` : ''}.`, [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Text style={styles.backText}>← Back</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Send a Tip</Text>
        {username ? (
          <Text style={styles.to}>to @{username}</Text>
        ) : null}

        <Text style={styles.label}>Quick amounts (XLM)</Text>
        <View style={styles.quickAmounts}>
          {AMOUNTS.map((a) => (
            <TouchableOpacity
              key={a}
              style={[styles.chip, amount === a && styles.chipActive]}
              onPress={() => setAmount(a)}
              accessibilityRole="button"
              accessibilityState={{ selected: amount === a }}
            >
              <Text style={[styles.chipText, amount === a && styles.chipTextActive]}>
                {a} XLM
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Custom amount</Text>
        <TextInput
          style={styles.input}
          value={amount}
          onChangeText={setAmount}
          keyboardType="decimal-pad"
          placeholder="Enter amount"
          accessibilityLabel="Tip amount in XLM"
        />

        <Text style={styles.label}>Message (optional)</Text>
        <TextInput
          style={[styles.input, styles.textarea]}
          value={message}
          onChangeText={setMessage}
          placeholder="Leave a message..."
          multiline
          numberOfLines={3}
          accessibilityLabel="Optional tip message"
        />

        <TouchableOpacity
          style={styles.btn}
          onPress={handleSend}
          accessibilityRole="button"
        >
          <Text style={styles.btnText}>Send {amount} XLM</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f7f2e8' },
  content: { padding: 24 },
  back: { marginBottom: 20 },
  backText: { color: '#0f6c7b', fontWeight: '600', fontSize: 15 },
  title: { fontSize: 28, fontWeight: '800', color: '#151515', marginBottom: 4 },
  to: { fontSize: 15, color: '#0f6c7b', marginBottom: 24 },
  label: { fontSize: 13, fontWeight: '600', color: '#555', marginBottom: 8, marginTop: 16 },
  quickAmounts: { flexDirection: 'row', gap: 8, flexWrap: 'wrap' },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1.5,
    borderColor: '#0f6c7b',
  },
  chipActive: { backgroundColor: '#0f6c7b' },
  chipText: { color: '#0f6c7b', fontWeight: '600' },
  chipTextActive: { color: '#fff' },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  textarea: { height: 80, textAlignVertical: 'top' },
  btn: {
    backgroundColor: '#ff785a',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    marginTop: 32,
  },
  btnText: { color: '#fff', fontWeight: '700', fontSize: 17 },
});
