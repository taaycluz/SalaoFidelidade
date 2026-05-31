import React from 'react';
import { Modal, StyleSheet, Text, View, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

interface CustomAlertProps {
  visivel: boolean;
  mensagem: string;
  aoFechar: () => void;
}

export default function CustomAlert({ visivel, mensagem, aoFechar }: CustomAlertProps) {
  return (
    <Modal
      transparent
      visible={visivel}
      animationType="fade"
      onRequestClose={aoFechar}
    >
      <View style={styles.mascaraBg}>
        <View style={styles.alertaContainer}>
          {/* Detalhe Decorativo Superior */}
          <LinearGradient
            colors={[COLORS.primaryLight, COLORS.primary]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.linhaDecorativa}
          />

          <View style={styles.conteudo}>
            <Text style={styles.textoMensagem}>{mensagem}</Text>

            <TouchableOpacity 
              activeOpacity={0.85} 
              style={styles.botaoTouch} 
              onPress={aoFechar}
            >
              <LinearGradient
                colors={[COLORS.primary, COLORS.primaryDark]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                style={styles.botaoGradient}
              >
                <Text style={styles.botaoTexto}>OK</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  mascaraBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', // Fundo escurecido semi-transparente
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  alertaContainer: {
    width: '100%',
    maxWidth: 340,
    backgroundColor: COLORS.surface || '#111111',
    borderRadius: 24,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 14,
    elevation: 15,
  },
  linhaDecorativa: {
    height: 6,
    width: '100%',
  },
  conteudo: {
    padding: 28,
    alignItems: 'center',
  },
  textoMensagem: {
    fontSize: 16,
    color: COLORS.text,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 24,
    letterSpacing: 0.5,
  },
  botaoTouch: {
    width: '60%',
    minWidth: 120,
  },
  botaoGradient: {
    paddingVertical: 12,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
    letterSpacing: 1,
  },
});