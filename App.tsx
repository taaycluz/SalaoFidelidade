import React, { useState, useEffect } from 'react';
import { StyleSheet, ScrollView, View, Text, TouchableOpacity } from 'react-native'; // ✅ Adicionado TouchableOpacity aqui!
import { supabase } from './src/services/supabaseClient'; 
import { COLORS } from './src/constants/colors';

import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Register/RegisterScreen';

export default function App() {
  const [telaAtual, setTelaAtual] = useState('login'); 
  const [usuarioLogado, setUsuarioLogado] = useState<any>(null);

  useEffect(() => {
    async function testarConexao() {
      const { data, error } = await supabase.from('usuarios').select('*').limit(1);
      if (error) console.log("❌ Erro ao conectar no Supabase:", error.message);
      else console.log("⚡ Conexão com o Supabase estabelecida com sucesso!");
    }
    testarConexao();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {telaAtual === 'registro' ? (
        <RegisterScreen 
          aoConcluirCadastro={() => setTelaAtual('login')} 
          irParaLogin={() => setTelaAtual('login')}        
        />
      ) : telaAtual === 'login' ? (
        <LoginScreen 
          irParaCadastro={() => setTelaAtual('registro')}   
          aoLogarComSucesso={(usuario) => {
            setUsuarioLogado(usuario);
            setTelaAtual('home'); 
          }}
        />
      ) : (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: COLORS.primary, fontSize: 24, marginBottom: 10 }}>ÁREA LOGADA 👑</Text>
          <Text style={{ color: '#fff' }}>Olá, {usuarioLogado?.nome}! Você entrou no Club.</Text>
          <TouchableOpacity 
            style={{ marginTop: 30, backgroundColor: COLORS.primary, padding: 10, borderRadius: 4 }}
            onPress={() => {
              setUsuarioLogado(null);
              setTelaAtual('login');
            }}
          >
            <Text style={{ color: '#000', fontWeight: 'bold' }}>SAIR (LOGOUT)</Text>
          </TouchableOpacity>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: COLORS.background, alignItems: 'center', justifyContent: 'center', paddingVertical: 50 },
});