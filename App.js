import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import { supabase } from './src/services/supabaseClient'; 

// Importando as duas telas oficiais da pasta screens 📂
import RegisterScreen from './src/screens/RegisterScreen'; 
import LoginScreen from './src/screens/LoginScreen'; 

export default function App() {
  const [telaAtual, setTelaAtual] = useState('registro'); // Começa no registro para testar o fluxo

  // Teste de pulso com o Supabase
  useEffect(() => {
    async function testarConexao() {
      const { data, error } = await supabase.from('usuarios').select('*').limit(1);
      if (error) {
        console.log("❌ Erro ao conectar no Supabase:", error.message);
      } else {
        console.log("⚡ Conexão com o Supabase estabelecida com sucesso!");
      }
    }
    testarConexao();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {telaAtual === 'registro' ? (
        <RegisterScreen 
          aoConcluirCadastro={() => setTelaAtual('login')} // Se cadastrar com sucesso, vai pro Login
          irParaLogin={() => setTelaAtual('login')}        // Se clicar em "Já é membro", vai pro Login
        />
      ) : (
        <LoginScreen 
          irParaCadastro={() => setTelaAtual('registro')}   // Se clicar em "Não tem conta", volta pro Registro
        />
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flexGrow: 1, 
    backgroundColor: '#000', 
    alignItems: 'center', 
    justifyContent: 'center', 
    paddingVertical: 50 
  },
});