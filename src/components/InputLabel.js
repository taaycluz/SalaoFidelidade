import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';

export default function InputLabel({ label, focado }) {
  return (
    <Text style={[styles.label, focado && styles.labelFocado]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: { color: COLORS.primary, fontSize: 10, letterSpacing: 1.5, marginBottom: 5, fontWeight: '700', opacity: 0.4 },
  labelFocado: { opacity: 1 },
});