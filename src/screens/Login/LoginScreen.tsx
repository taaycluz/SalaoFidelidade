import React, { useState, useMemo } from 'react';
import { Text, View, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { COLORS } from '../../constants/colors';
import { Usuario } from '../../types/usuario';
import { Logo, InputLabel, BotaoDourado, CustomAlert } from '../../components';
import { authFormStyles as styles } from '../../styles/authForm.styles'; 
import { supabase } from '../../services/supabaseClient';
import bcrypt from 'bcryptjs';

interface LoginScreenProps {
  irParaCadastro: () => void;
  aoLogarComSucesso: (usuario: Usuario) => void;
}

export default function LoginScreen({ irParaCadastro, aoLogarComSucesso }: LoginScreenProps): React.ReactElement {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);
  const [foco, setFoco] = useState<'email' | 'senha' | null>(null); 
  const [carregando, setCarregando] = useState(false);
  
  const [alerta, setAlerta] = useState<{ visivel: boolean; mensagem: string }>({
    visivel: false,
    mensagem: '',
  });

  const exibirAlerta = (msg: string) => setAlerta({ visivel: true, mensagem: msg });
  const fecharAlerta = () => setAlerta(prev => ({ ...prev, visivel: false }));

  const inputEstiloEmail = useMemo(() => [styles.input, foco === 'email' && styles.inputFocado], [foco]);
  const senhaContainerEstilo = useMemo(() => [styles.senhaContainer, foco === 'senha' && styles.inputFocado], [foco]);

  const lidarComLogin = async () => {
    if (!email.trim() || !senha) {
      exibirAlerta("Por favor, preencha todos os campos!");
      return;
    }

    setCarregando(true); 

    try {
      const { data, error } = await supabase
        .from('usuarios')
        .select('id, nome, email, senha')
        .eq('email', email.trim().toLowerCase())
        .single();

      if (error || !data) {
        exibirAlerta("E-mail ou senha incorretos!");
        return;
      }

      const senhaEstaValida = bcrypt.compareSync(senha, data.senha);

      if (senhaEstaValida) {
        exibirAlerta(`👑 Bem-vinda de volta, ${data.nome}!`);
        
        setTimeout(() => {
          fecharAlerta();
          aoLogarComSucesso({
            id: data.id,
            nome: data.nome,
            email: data.email
          });
        }, 1500);
        return; 
      } else {
        exibirAlerta("E-mail ou senha incorretos!");
      }

    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido';
      console.error("❌ Erro no processo de login:", errorMessage);
      exibirAlerta("Ocorreu um erro ao tentar fazer login.");
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

            {/* 🛠️ Corrigido de text="..." para texto="..." */}
            <BotaoDourado texto="ENTRAR" onPress={lidarComLogin} carregando={carregando} />

            <TouchableOpacity 
              style={styles.linkBotao} 
              onPress={irParaCadastro} 
              activeOpacity={0.7}
              disabled={carregando}
            >
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

      <CustomAlert 
        visivel={alerta.visivel} 
        mensagem={alerta.mensagem} 
        aoFechar={fecharAlerta} 
      />
    </LinearGradient>
  );
}