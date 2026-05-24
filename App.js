import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { FontAwesome5 } from '@expo/vector-icons'; 
import { supabase } from './supabaseClient'; // Importa a conexão do banco

export default function App() {
  // --- 1. ESTADOS GLOBAIS E DE INTERFACE (Sempre no topo) ---
  const [telaAtual, setTelaAtual] = useState('login');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [nome, setNome] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  
  // Estados de UI (Olho mágico e Foco)
  const [exibirSenha, setExibirSenha] = useState(false);
  const [exibirConfirmar, setExibirConfirmar] = useState(false);
  const [foco, setFoco] = useState('');

  // --- 2. TESTE DE CONEXÃO COM O SUPABASE ---
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

  // --- 3. COMPONENTE: TELA DE LOGIN ---
  const LoginScreen = () => (
    <View style={styles.innerContainer}>
      <Logo />
      <Text style={styles.titulo}>SALÃO CLUB</Text>
      <Text style={styles.subtitulo}>O NOVO MODELO DE FIDELIDADE CHEGOU</Text>
      
      <View style={styles.formulario}>
        <InputLabel label="E-MAIL" focado={foco === 'email'} />
        <TextInput 
          style={[styles.input, foco === 'email' && styles.inputFocado]}
          placeholder="Ex: cliente@luxo.com" placeholderTextColor="#444"
          value={email} onChangeText={setEmail}
          onFocus={() => setFoco('email')} onBlur={() => setFoco('')}
        />

        <InputLabel label="SENHA" focado={foco === 'senha'} />
        <View style={[styles.senhaContainer, foco === 'senha' && styles.inputFocado]}>
          <TextInput 
            style={styles.inputSenha} placeholder="••••••••" placeholderTextColor="#444"
            secureTextEntry={!exibirSenha} value={senha} onChangeText={setSenha}
            onFocus={() => setFoco('senha')} onBlur={() => setFoco('')}
          />
          <TouchableOpacity onPress={() => setExibirSenha(!exibirSenha)}>
            <FontAwesome5 name={exibirSenha ? "eye" : "eye-slash"} size={16} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        <BotaoDourado texto="ENTRAR" />

        <TouchableOpacity style={styles.linkBotao} onPress={() => setTelaAtual('registro')}>
          <Text style={styles.linkTexto}>NÃO TEM UMA CONTA? REGISTRE-SE AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- 4. COMPONENTE: TELA DE REGISTRO ---
  const RegisterScreen = () => (
    <View style={styles.innerContainer}>
      <Logo />
      <Text style={styles.titulo}>REGISTRO</Text>
      <Text style={styles.subtitulo}>TORNE-SE UM MEMBRO ELITE</Text>
      
      <View style={styles.formulario}>
        <InputLabel label="NOME COMPLETO" focado={foco === 'nome'} />
        <TextInput 
          style={[styles.input, foco === 'nome' && styles.inputFocado]}
          placeholder="Digite seu nome real" placeholderTextColor="#444"
          value={nome} onChangeText={setNome}
          onFocus={() => setFoco('nome')} onBlur={() => setFoco('')}
        />

        <InputLabel label="E-MAIL" focado={foco === 'emailReg'} />
        <TextInput 
          style={[styles.input, foco === 'emailReg' && styles.inputFocado]}
          placeholder="cliente@luxo.com" placeholderTextColor="#444"
          value={email} onChangeText={setEmail}
          onFocus={() => setFoco('emailReg')} onBlur={() => setFoco('')}
        />

        <InputLabel label="SENHA" focado={foco === 'senhaReg'} />
        <View style={[styles.senhaContainer, foco === 'senhaReg' && styles.inputFocado]}>
          <TextInput 
            style={styles.inputSenha} placeholder="••••••••" placeholderTextColor="#444"
            secureTextEntry={!exibirSenha} value={senha} onChangeText={setSenha}
            onFocus={() => setFoco('senhaReg')} onBlur={() => setFoco('')}
          />
          <TouchableOpacity onPress={() => setExibirSenha(!exibirSenha)}>
            <FontAwesome5 name={exibirSenha ? "eye" : "eye-slash"} size={16} color="#D4AF37" />
          </TouchableOpacity>
        </View>

        <BotaoDourado texto="CRIAR CONTA" />

        <TouchableOpacity style={styles.linkBotao} onPress={() => setTelaAtual('login')}>
          <Text style={styles.linkTexto}>JÁ É MEMBRO? ENTRE AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  // --- 5. RENDERIZAÇÃO DO MAESTRO ---
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {telaAtual === 'login' ? <LoginScreen /> : <RegisterScreen />}
    </ScrollView>
  );
}

// --- 6. COMPONENTES AUXILIARES (Design e Reuso) ---
const Logo = () => (
  <View style={styles.logoContainer}>
    <FontAwesome5 name="crown" size={50} color="#D4AF37" />
    <View style={styles.logoLinha} />
    <FontAwesome5 name="star" size={10} color="#D4AF37" style={styles.estrela} />
  </View>
);

const InputLabel = ({ label, focado }) => (
  <Text style={[styles.label, focado && styles.labelFocado]}>{label}</Text>
);

const BotaoDourado = ({ texto }) => (
  <TouchableOpacity activeOpacity={0.8} style={styles.botaoTouch}>
    <LinearGradient colors={['#D4AF37', '#AA8C2C', '#D4AF37']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0 }} style={styles.botaoGradient}>
      <Text style={styles.botaoTexto}>{texto}</Text>
    </LinearGradient>
  </TouchableOpacity>
);

// --- 7. ESTILOS VISUAIS PREMIUM ---
const styles = StyleSheet.create({
  container: { flexGrow: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', paddingVertical: 50 },
  innerContainer: { width: '100%', alignItems: 'center', paddingHorizontal: 30 },
  logoContainer: { alignItems: 'center', marginBottom: 15 },
  logoLinha: { width: 80, height: 1, backgroundColor: '#D4AF37', marginTop: 8, opacity: 0.5 },
  estrela: { marginTop: -6, backgroundColor: '#000', paddingHorizontal: 5 },
  titulo: { fontSize: 32, color: '#D4AF37', letterSpacing: 5, fontWeight: '300', textAlign: 'center' },
  subtitulo: { fontSize: 10, color: '#D4AF37', letterSpacing: 3, marginBottom: 40, opacity: 0.6, textAlign: 'center' },
  formulario: { width: '100%' },
  label: { color: '#D4AF37', fontSize: 10, letterSpacing: 1.5, marginBottom: 5, fontWeight: '700', opacity: 0.4 },
  labelFocado: { opacity: 1 },
  input: { borderBottomWidth: 1, borderBottomColor: '#D4AF3733', color: '#fff', paddingVertical: 8, fontSize: 15 },
  inputFocado: { borderBottomColor: '#D4AF37', borderBottomWidth: 1.2 },
  senhaContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D4AF3733', alignItems: 'center' },
  inputSenha: { flex: 1, color: '#fff', paddingVertical: 8, fontSize: 15 },
  botaoTouch: { marginTop: 25 },
  botaoGradient: { paddingVertical: 16, borderRadius: 4, alignItems: 'center' },
  botaoTexto: { color: '#000', fontSize: 15, fontWeight: 'bold', letterSpacing: 2 },
  linkBotao: { marginTop: 25, alignItems: 'center' },
  linkTexto: { color: '#D4AF37', fontSize: 10, letterSpacing: 1.5, opacity: 0.5 },
});