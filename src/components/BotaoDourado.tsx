import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

interface BotaoDouradoProps {
  texto: string;
  onPress: () => void;
}

export default function BotaoDourado({ texto, onPress }: BotaoDouradoProps) {
  return (
    <TouchableOpacity 
      activeOpacity={0.85} 
      style={styles.botaoTouch} 
      onPress={onPress}
    >
      <LinearGradient
        colors={[COLORS.primary, COLORS.primaryDark]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientButton}
      >
        <Text style={styles.botaoTexto}>{texto}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botaoTouch: {
    marginTop: 28,
    width: '100%',
  },
  gradientButton: {
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 8,
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});

