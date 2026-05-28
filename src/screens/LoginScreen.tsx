import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { supabase } from '../services/supabaseClient';
import { Logo, InputLabel, BotaoDourado } from '../components';
import { COLORS } from '../constants/colors';
import { authFormStyles as styles } from '../styles/authForm.styles'; // Reutilizando base estável
import { Usuario } from '../types/usuario';
import bcrypt from 'bcryptjs';

interface LoginScreenProps {
  irParaCadastro: () => void;
  aoLogarComSucesso: (usuario: Usuario) => void;
}

export default function LoginScreen({ irParaCadastro, aoLogarComSucesso }: LoginScreenProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [foco, setFoco] = useState<'email' | 'senha' | null>(null); // Tipagem estrita de foco

  // Helper computado para performance de renderização de estilos de foco
  const inputEstiloEmail = useMemo(() => [styles.input, foco === 'email' && styles.inputFocado], [foco]);
  const senhaContainerEstilo = useMemo(() => [styles.senhaContainer, foco === 'senha' && styles.inputFocado], [foco]);

  const lidarComLogin = async () => {
    if (!email.trim() || !senha) {
      alert("Por favor, preencha todos os campos!");
      return;
    }

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nome, email, senha')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (error || !data) {
        alert("E-mail ou senha incorretos!");
        return;
      }

      const senhaEstaValida = bcrypt.compareSync(senha, data.senha);

      if (senhaEstaValida) {
        alert(`👑 Bem-vinda de volta, ${data.nome}!`);
        aoLogarComSucesso({
          id: data.id,
          nome: data.nome,
          email: data.email
        }); 
      } else {
        alert("E-mail ou senha incorretos!");
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error("❌ Erro no processo de login:", errorMessage);
      alert("Ocorreu um erro ao tentar fazer login.");
    }
  };

  return (
    <LinearGradient
      colors={[COLORS.background, COLORS.primaryLight + '20']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={styles.gradientBg}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Logo />

        <Text style={styles.titulo}>BEM-VINDA</Text>
        <Text style={styles.subtitulo}>Acesse sua conta</Text>
        
        <View style={styles.formularioContainer}>
          <View style={styles.formulario}>
            <InputLabel label="E-MAIL" focado={foco === 'email'} />
            <TextInput 
              style={inputEstiloEmail}
              placeholder="seu@email.com" 
              placeholderTextColor={COLORS.placeholder}
              value={email} 
              onChangeText={setEmail}
              onFocus={() => setFoco('email')} 
              onBlur={() => setFoco(null)}
              autoCapitalize="none"
              keyboardType="email-address"
            />

            <InputLabel label="SENHA" focado={foco === 'senha'} />
            <View style={senhaContainerEstilo}>
              <TextInput 
                style={styles.inputSenha} 
                placeholder="••••••••" 
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!exibirSenha} 
                value={senha} 
                onChangeText={setSenha}
                onFocus={() => setFoco('senha')} 
                onBlur={() => setFoco(null)}
                autoCapitalize="none"
              />
              <TouchableOpacity onPress={() => setExibirSenha(prev => !prev)} activeOpacity={0.7}>
                <FontAwesome5 name={exibirSenha ? "eye" : "eye-slash"} size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <BotaoDourado texto="ENTRAR" onPress={lidarComLogin} />

            <TouchableOpacity style={styles.linkBotao} onPress={irParaCadastro} activeOpacity={0.7}>
              <Text style={styles.linkTexto}>Não tem uma conta? <Text style={styles.linkTextoDestaque}>Registre-se</Text></Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.decorationDot} />
          <View style={styles.decorationDot} />
          <View style={styles.decorationDot} />
        </View>
      </ScrollView>
    </LinearGradient>
  );
}