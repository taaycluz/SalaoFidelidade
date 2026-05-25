import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { supabase } from '../services/supabaseClient'; 

// Importando nossos componentes limpos! 👑
import Logo from '../components/Logo';
import InputLabel from '../components/InputLabel';
import BotaoDourado from '../components/BotaoDourado';

export default function RegisterScreen({ aoConcluirCadastro, irParaLogin }) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [foco, setFoco] = useState('');

  const lidarComCadastro = async () => {
    if (!nome || !email || !senha || !confirmarSenha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      alert("As senhas não coincidem!");
      return;
    }

    try {
      const { error } = await supabase
        .from('usuarios')
        .insert([{ nome, email, senha }]);

      if (error) throw error;

      alert("👑 Conta criada com sucesso! Seja bem-vindo ao Club.");
      aoConcluirCadastro(); 

    } catch (error) {
      console.log("❌ Erro ao cadastrar:", error.message);
      alert("Erro ao criar conta: " + error.message);
    }
  };

  return (
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

        <InputLabel label="CONFIRMAR SENHA" focado={foco === 'confSenha'} />
        <View style={[styles.senhaContainer, foco === 'confSenha' && styles.inputFocado]}>
          <TextInput 
            style={styles.inputSenha} placeholder="••••••••" placeholderTextColor="#444"
            secureTextEntry={!exibirSenha} value={confirmarSenha} onChangeText={setConfirmarSenha}
            onFocus={() => setFoco('confSenha')} onBlur={() => setFoco('')}
          />
        </View>

        <BotaoDourado texto="CRIAR CONTA" onPress={lidarComCadastro} />

        <TouchableOpacity style={styles.linkBotao} onPress={irParaLogin}>
          <Text style={styles.linkTexto}>JÁ É MEMBRO? ENTRE AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: { width: '100%', alignItems: 'center', paddingHorizontal: 30 },
  titulo: { fontSize: 32, color: '#D4AF37', letterSpacing: 5, fontWeight: '300', textAlign: 'center' },
  subtitulo: { fontSize: 10, color: '#D4AF37', letterSpacing: 3, marginBottom: 40, opacity: 0.6, textAlign: 'center' },
  formulario: { width: '100%' },
  input: { borderBottomWidth: 1, borderBottomColor: '#D4AF3733', color: '#fff', paddingVertical: 8, fontSize: 15, marginBottom: 20 },
  inputFocado: { borderBottomColor: '#D4AF37', borderBottomWidth: 1.2 },
  senhaContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#D4AF3733', alignItems: 'center', marginBottom: 20 },
  inputSenha: { flex: 1, color: '#fff', paddingVertical: 8, fontSize: 15 },
  linkBotao: { marginTop: 25, alignItems: 'center' },
  linkTexto: { color: '#D4AF37', fontSize: 10, letterSpacing: 1.5, opacity: 0.5 },
});