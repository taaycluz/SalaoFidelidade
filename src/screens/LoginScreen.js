import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons'; 

// Importando nossos componentes reutilizáveis 👑
import Logo from '../components/Logo';
import InputLabel from '../components/InputLabel';
import BotaoDourado from '../components/BotaoDourado';

export default function LoginScreen({ irParaCadastro }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [foco, setFoco] = useState('');

  const lidarComLogin = () => {
    // Por enquanto, apenas um alerta para testar o clique do botão
    if (!email || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }
    alert(`Tentando conectar com o e-mail: ${email}`);
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
          placeholder="cliente@luxo.com" placeholderTextColor="#444"
          value={email} onChangeText={setEmail}
          onFocus={() => setFoco('emailLog')} onBlur={() => setFoco('')}
        />

        <InputLabel label="SENHA" focado={foco === 'senhaLog'} />
        <View style={[styles.senhaContainer, foco === 'senhaLog' && styles.inputFocado]}>
          <TextInput 
            style={styles.inputSenha} placeholder="••••••••" placeholderTextColor="#444"
            secureTextEntry={!exibirSenha} value={senha} onChangeText={setSenha}
            onFocus={() => setFoco('senhaLog')} onBlur={() => setFoco('')}
          />
          <TouchableOpacity onPress={() => setExibirSenha(!exibirSenha)}>
            <FontAwesome5 name={exibirSenha ? "eye" : "eye-slash"} size={16} color="#D4AF37" />
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