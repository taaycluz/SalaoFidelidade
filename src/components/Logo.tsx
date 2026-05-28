import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { COLORS } from '../constants/colors';

/** Novo logo premium com design sofisticado */
const Logo: React.FC = () => {
  return (
    <View style={styles.container}>
      {/* Card com Gradiente */}
      <LinearGradient
        colors={[COLORS.primaryLight, COLORS.primary]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradientCard}
      >
        <View style={styles.cardInner}>
          <View style={styles.dotContainer}>
            <View style={[styles.dot, styles.dotTop]} />
            <View style={[styles.dot, styles.dotMiddle]} />
            <View style={[styles.dot, styles.dotBottom]} />
          </View>
          
          <Text style={styles.brandText}>SALÃO</Text>
          <Text style={styles.brandText}>FIDELIDADE</Text>
        </View>
      </LinearGradient>

      {/* Decoração */}
      <View style={styles.decorationContainer}>
        <View style={[styles.decorBall, { backgroundColor: COLORS.secondary }]} />
        <View style={[styles.decorBall, { backgroundColor: COLORS.accent }]} />
        <View style={[styles.decorBall, { backgroundColor: COLORS.accentWarm }]} />
      </View>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginBottom: 40,
    marginTop: 20,
  },
  gradientCard: {
    width: 240,
    height: 140,
    borderRadius: 20,
    padding: 20,
    shadowColor: COLORS.primary,
    shadowOffset: { width: 0, height: 12 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardInner: {
    alignItems: 'center',
    width: '100%',
  },
  dotContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: 80,
    marginBottom: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFFFFF',
    opacity: 0.8,
  },
  dotTop: {
    marginBottom: 4,
  },
  dotMiddle: {
    marginBottom: 4,
  },
  dotBottom: {},
  brandText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 2,
    textAlign: 'center',
    lineHeight: 18,
  },
  decorationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: 180,
    marginTop: 24,
  },
  decorBall: {
    width: 12,
    height: 12,
    borderRadius: 6,
    opacity: 0.6,
  },
});