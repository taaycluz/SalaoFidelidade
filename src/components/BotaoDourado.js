import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../constants/colors';

export default function BotaoDourado({ texto, onPress }) {
  return (
    <TouchableOpacity activeOpacity={0.8} style={styles.botaoTouch} onPress={onPress}>
      <View style={styles.botaoSimulado}>
        <Text style={styles.botaoTexto}>{texto}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  botaoTouch: { marginTop: 25 },
  botaoSimulado: { backgroundColor: COLORS.primary, paddingVertical: 16, borderRadius: 4, alignItems: 'center' },
  botaoTexto: { color: COLORS.background, fontSize: 15, fontWeight: 'bold', letterSpacing: 2 },
});