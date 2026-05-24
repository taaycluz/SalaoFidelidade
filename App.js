import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.helloText}>Hello World! 🚀</Text>
      <Text style={styles.subText}>Meu aplicativo de fidelidade está vivo.</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212', // Um fundo escuro elegante
    alignItems: 'center',
    justifyContent: 'center',
  },
  helloText: {
    color: '#fff',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subText: {
    color: '#888',
    fontSize: 16,
  },
});