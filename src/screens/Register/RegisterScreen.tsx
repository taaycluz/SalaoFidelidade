import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { supabase } from '../services/supabaseClient'; 
import { Logo, InputLabel, BotaoDourado, CustomAlert } from '../components';
import { COLORS } from '../constants/colors';
import { authFormStyles as styles } from '../styles/authForm.styles'; 
import bcrypt from 'bcryptjs';

interface RegisterScreenProps {
  aoConcluirCadastro: () => void;
  irParaLogin: () => void;
}

type CamposFoco = 'nome' | 'email' | 'senha' | 'confirmar' | null;

export default function RegisterScreen({ aoConcluirCadastro, irParaLogin }: RegisterScreenProps): React.ReactElement {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [foco, setFoco] = useState<CamposFoco>(null);
  const [carregando, setCarregando] = useState(false);

  const [alerta, setAlerta] = useState<{ visivel: boolean; mensagem: string; acaoAoFechar?: () => void }>({
    visivel: false,
    mensagem: '',
  });

  const exibirAlerta = (msg: string, acao?: () => void) => {
    setAlerta({ visivel: true, mensagem: msg, acaoAoFechar: acao });
  };

  const fecharAlerta = () => {
    if (alerta.acaoAoFechar) {
      alerta.acaoAoFechar();
    }
    setAlerta(prev => ({ ...prev, visivel: false }));
  };

  const inputEstiloNome = useMemo(() => [styles.input, foco === 'nome' && styles.inputFocado], [foco]);
  const inputEstiloEmail = useMemo(() => [styles.input, foco === 'email' && styles.inputFocado], [foco]);
  const senhaContainerEstilo = useMemo(() => [styles.senhaContainer, foco === 'senha' && styles.inputFocado], [foco]);
  const confContainerEstilo = useMemo(() => [styles.senhaContainer, foco === 'confirmar' && styles.inputFocado], [foco]);

  const lidarComCadastro = async () => {
    if (!nome.trim() || !email.trim() || !senha || !confirmarSenha) {
      exibirAlerta("Por favor, preencha todos os campos!");
      return;
    }

    if (senha !== confirmarSenha) {
      exibirAlerta("As senhas não coincidem!");
      return;
    }

    setCarregando(true); 

    try {
      const salt = bcrypt.genSaltSync(10);
      const senhaCriptografada = bcrypt.hashSync(senha, salt);

      const { error } = await supabase
        .from('usuarios')
        .insert([{ 
          nome: nome.trim(), 
          email: email.trim().toLowerCase(), 
          senha: senhaCriptografada
        }]);

      if (error) throw error;

      exibirAlerta("👑 Conta criada com segurança! Seja bem-vinda ao Club.", () => {
        aoConcluirCadastro();
      });

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error("❌ Erro ao cadastrar:", errorMessage);
      exibirAlerta("Erro ao criar conta: " + errorMessage);
    } finally {
      setCarregando(false); 
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

        <Text style={styles.titulo}>REGISTRE-SE</Text>
        <Text style={styles.subtitulo}>Crie sua conta premium</Text>
        
        <View style={styles.formularioContainer}>
          <View style={styles.formulario}>
            <InputLabel label="NOME COMPLETO" focado={foco === 'nome'} />
            <TextInput 
              style={inputEstiloNome}
              placeholder="Digite seu nome real" 
              placeholderTextColor={COLORS.placeholder}
              value={nome} 
              onChangeText={setNome}
              onFocus={() => setFoco('nome')} 
              onBlur={() => setFoco(null)}
              editable={!carregando} 
            />

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
              editable={!carregando} 
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
                editable={!carregando} 
              />
              <TouchableOpacity 
                onPress={() => setExibirSenha(prev => !prev)} 
                activeOpacity={0.7}
                disabled={carregando}
              >
                <FontAwesome5 name={exibirSenha ? "eye" : "eye-slash"} size={18} color={COLORS.primary} />
              </TouchableOpacity>
            </View>

            <InputLabel label="CONFIRMAR SENHA" focado={foco === 'confirmar'} />
            <View style={confContainerEstilo}>
              <TextInput 
                style={styles.inputSenha} 
                placeholder="••••••••" 
                placeholderTextColor={COLORS.placeholder}
                secureTextEntry={!exibirSenha} 
                value={confirmarSenha} 
                onChangeText={setConfirmarSenha}
                onFocus={() => setFoco('confirmar')} 
                onBlur={() => setFoco(null)}
                autoCapitalize="none"
                editable={!carregando} 
              />
            </View>

            {/* 🛠️ Corrigido para texto="..." e adicionado estado de loading */}
            <BotaoDourado texto="CRIAR CONTA" onPress={lidarComCadastro}  carregando={carregando}/>

            <TouchableOpacity 
              style={styles.linkBotao} 
              onPress={irParaLogin} 
              activeOpacity={0.7}
              disabled={carregando} 
            >
              <Text style={styles.linkTexto}>Já tem uma conta? <Text style={styles.linkTextoDestaque}>Entre aqui</Text></Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <CustomAlert 
        visivel={alerta.visivel} 
        mensagem={alerta.mensagem} 
        aoFechar={fecharAlerta} 
      />
    </LinearGradient>
  );
}