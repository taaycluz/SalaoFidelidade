import React from 'react';
import { StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';

interface InputLabelProps {
  label: string;
  focado: boolean;
}

export default function InputLabel({ label, focado }: InputLabelProps) {
  return (
    <Text style={[styles.label, focado && styles.labelFocado]}>
      {label}
    </Text>
  );
}

const styles = StyleSheet.create({
  label: {
    color: COLORS.textLight,
    fontSize: 12,
    letterSpacing: 1.4,
    marginBottom: 10,
    fontWeight: '700',
    opacity: 0.7,
  },
  labelFocado: {
    color: COLORS.primary,
    opacity: 1,
    fontWeight: '800',
  },
});