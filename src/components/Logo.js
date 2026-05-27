import React from 'react';
import { StyleSheet, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors'; // 👈 Importando as cores

export default function Logo() {
  return (
    <View style={styles.logoContainer}>
      <FontAwesome5 name="crown" size={50} color={COLORS.primary} />
      <View style={styles.logoLinha} />
      <FontAwesome5 name="star" size={10} color={COLORS.primary} style={styles.estrela} />
    </View>
  );
}

const styles = StyleSheet.create({
  logoContainer: { alignItems: 'center', marginBottom: 15 },
  logoLinha: { width: 80, height: 1, backgroundColor: COLORS.primary, marginTop: 8, opacity: 0.5 },
  estrela: { marginTop: -6, backgroundColor: COLORS.background, paddingHorizontal: 5 },
});