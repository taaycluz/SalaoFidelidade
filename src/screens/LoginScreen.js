import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { supabase } from '../services/supabaseClient'; // Conexão com o banco
import { Logo, InputLabel, BotaoDourado } from '../components';
import { COLORS } from '../constants/colors';

export default function LoginScreen({ irParaCadastro, aoLogarComSucesso }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [foco, setFoco] = useState('');

  // Lógica simples de validação de Login
  const lidarComLogin = async () => {
    // 1. Validação básica de campos vazios
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      // 2. Busca o usuário no Supabase filtrando pelo e-mail
      const { data, error } = await supabase
        .from('usuarios')
        .select('*')
        .eq('email', email.trim().toLowerCase()) // Limpa espaços e força minúsculo
        .single(); // Traz apenas um único objeto em vez de uma lista

      // 3. Se der erro ou não encontrar o e-mail
      if (error || !data) {
        alert("E-mail ou senha incorretos!");
        return;
      }

      // 4. Comparação simples de senha (Modo Didático/Texto Limpo)
      if (data.senha === senha) {
        alert(`👑 Bem-vindo de volta, ${data.nome}!`);
        
        // Executa a função que avisa o App.js que o usuário passou!
        if (aoLogarComSucesso) {
          aoLogarComSucesso(data); 
        }
      } else {
        alert("E-mail ou senha incorretos!");
      }

    } catch (err) {
      console.log("❌ Erro no processo de login:", err.message);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <View style={styles.innerContainer}>
      <Logo />

      <Text style={styles.titulo}>LOGIN</Text>
      <Text style={styles.subtitulo}>ACESSE SUA CONTA ELITE</Text>
      
      <View style={styles.formulario}>
        <InputLabel label="E-MAIL" focado={foco === 'emailLog'} />
        <TextInput 
          style={[styles.input, foco === 'emailLog' && styles.inputFocado]}
          placeholder="cliente@luxo.com" placeholderTextColor={COLORS.placeholder}
          value={email} onChangeText={setEmail}
          onFocus={() => setFoco('emailLog')} onBlur={() => setFoco('')}
          autoCapitalize="none"
        />

        <InputLabel label="SENHA" focado={foco === 'senhaLog'} />
        <View style={[styles.senhaContainer, foco === 'senhaLog' && styles.inputFocado]}>
          <TextInput 
            style={styles.inputSenha} placeholder="••••••••" placeholderTextColor={COLORS.placeholder}
            secureTextEntry={!exibirSenha} value={senha} onChangeText={setSenha}
            onFocus={() => setFoco('senhaLog')} onBlur={() => setFoco('')}
            autoCapitalize="none"
          />
          <TouchableOpacity onPress={() => setExibirSenha(!exibirSenha)}>
            <FontAwesome5 name={exibirSenha ? "eye" : "eye-slash"} size={16} color={COLORS.primary} />
          </TouchableOpacity>
        </View>

        <BotaoDourado texto="ENTRAR" onPress={lidarComLogin} />

        <TouchableOpacity style={styles.linkBotao} onPress={irParaCadastro}>
          <Text style={styles.linkTexto}>NÃO TEM UMA CONTA? REGISTRE-SE AQUI</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  innerContainer: { width: '100%', alignItems: 'center', paddingHorizontal: 30 },
  titulo: { fontSize: 32, color: COLORS.primary, letterSpacing: 5, fontWeight: '300', textAlign: 'center' },
  subtitulo: { fontSize: 10, color: COLORS.primary, letterSpacing: 3, marginBottom: 40, opacity: 0.6, textAlign: 'center' },
  formulario: { width: '100%' },
  input: { borderBottomWidth: 1, borderBottomColor: COLORS.primaryLight, color: COLORS.text, paddingVertical: 8, fontSize: 15, marginBottom: 20 },
  inputFocado: { borderBottomColor: COLORS.primary, borderBottomWidth: 1.2 },
  senhaContainer: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: COLORS.primaryLight, alignItems: 'center', marginBottom: 20 },
  inputSenha: { flex: 1, color: COLORS.text, paddingVertical: 8, fontSize: 15 },
  linkBotao: { marginTop: 25, alignItems: 'center' },
  linkTexto: { color: COLORS.primary, fontSize: 10, letterSpacing: 1.5, opacity: 0.5 },
});