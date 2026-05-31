import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

export default function Logo() {
  return (
    <View style={styles.container}>
      {/* Ícone de Coroa Premium Universal */}
      <View style={styles.iconeCirculo}>
        <FontAwesome5 name="crown" size={32} color={COLORS.primary} />
      </View>
      
      {/* Novo Nome Agnóstico (Para qualquer nicho) */}
      <Text style={styles.textoLogo}>
        LOYAL<Text style={styles.textoDestaque}>CLUB</Text>
      </Text>
      
      {/* Subtítulo Sofisticado */}
      <Text style={styles.subtexto}>PROGRAMA DE FIDELIDADE</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
    marginBottom: 15,
  },
  iconeCirculo: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#FFFFFF', // Mantém o fundo branco para destacar no gradiente
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 14,
  },
  textoLogo: {
    fontSize: 24,
    fontWeight: '300',
    color: COLORS.primaryDark || '#000000', // Usa sua cor principal escura
    letterSpacing: 6,
  },
  textoDestaque: {
    fontWeight: '800',
    color: COLORS.primary, // Destaque na cor principal do seu app
  },
  subtexto: {
    fontSize: 9,
    color: COLORS.placeholder || '#8E8E93',
    letterSpacing: 3,
    marginTop: 6,
    fontWeight: '600',
  },
});