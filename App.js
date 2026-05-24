import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 
import { FontAwesome5 } from '@expo/vector-icons'; 

export default function App() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [exibirSenha, setExibirSenha] = useState(false);

  // UX: Estados para monitorar qual campo está em evidência (focado)
  const [emailFocado, setEmailFocado] = useState(false);
  const [senhaFocada, setSenhaFocada] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.innerContainer}>
        
        {/* LOGO - A COROA MAJESTOSA */}
        <View style={styles.logoContainer}>
          <FontAwesome5 name="crown" size={60} color="#D4AF37" />
          <View style={styles.logoLinha} />
          <FontAwesome5 name="star" size={12} color="#D4AF37" style={styles.estrela} />
        </View>

        <Text style={styles.titulo}>SALÃO CLUB</Text>
        {/* ALTERAÇÃO: Nova chamada forte de fidelidade */}
        <Text style={styles.subtitulo}>O NOVO MODELO DE FIDELIDADE CHEGOU</Text>

        {/* FORMULÁRIO MINIMALISTA */}
        <View style={styles.formulario}>
          
          {/* CAMPO DE E-MAIL */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, emailFocado && styles.labelFocado]}>E-MAIL</Text>
            <TextInput 
              style={[styles.input, emailFocado && styles.inputFocado]}
              placeholder="Ex: cliente@luxo.com"
              placeholderTextColor="#444"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              onFocus={() => setEmailFocado(true)}  
              onBlur={() => setEmailFocado(false)}   
            />
          </View>

          {/* CAMPO DE SENHA COM OLHO MÁGICO */}
          <View style={styles.inputGroup}>
            <Text style={[styles.label, senhaFocada && styles.labelFocado]}>SENHA</Text>
            <View style={[styles.senhaContainer, senhaFocada && styles.inputFocado]}>
              <TextInput 
                style={styles.inputSenha}
                placeholder="••••••••"
                placeholderTextColor="#444"
                secureTextEntry={!exibirSenha} 
                value={senha}
                onChangeText={setSenha}
                onFocus={() => setSenhaFocada(true)}   
                onBlur={() => setSenhaFocada(false)}    
              />
              <TouchableOpacity 
                style={styles.olhoBotao} 
                onPress={() => setExibirSenha(!exibirSenha)}
              >
                <FontAwesome5 
                  name={exibirSenha ? "eye" : "eye-slash"} 
                  size={18} 
                  color="#D4AF37" 
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* BOTÃO DOURADO COM GRADIENTE */}
          <TouchableOpacity activeOpacity={0.8} style={styles.botaoTouch}>
            <LinearGradient
              colors={['#D4AF37', '#AA8C2C', '#D4AF37']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.botaoGradient}
            >
              <Text style={styles.botaoTexto}>ENTRAR</Text>
            </LinearGradient>
          </TouchableOpacity>

          <TouchableOpacity style={styles.linkBotao}>
            <Text style={styles.linkTexto}>NÃO TEM UMA CONTA? REGISTRE-SE AQUI</Text>
          </TouchableOpacity>
        </View>

      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerContainer: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logoLinha: {
    width: 100,
    height: 1,
    backgroundColor: '#D4AF37',
    marginTop: 10,
    opacity: 0.5,
  },
  estrela: {
    marginTop: -7,
    backgroundColor: '#000',
    paddingHorizontal: 5,
  },
  titulo: {
    fontSize: 38,
    color: '#D4AF37',
    letterSpacing: 6,
    fontWeight: '300',
    textAlign: 'center',
  },
  subtitulo: {
    fontSize: 11, // Ligeiramente menor para acomodar a frase maior de forma chique
    color: '#D4AF37',
    letterSpacing: 3, // Espaçamento mantendo a estética premium
    marginBottom: 50,
    opacity: 0.7,
    textAlign: 'center',
    lineHeight: 18, // Garante boa quebra caso a tela do celular seja pequena
  },
  formulario: {
    width: '100%',
  },
  inputGroup: {
    marginBottom: 25,
  },
  label: {
    color: '#D4AF37',
    fontSize: 10,
    letterSpacing: 2,
    marginBottom: 8,
    fontWeight: '700',
    opacity: 0.5,
  },
  labelFocado: {
    opacity: 1,
  },
  input: {
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF3733',
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  inputFocado: {
    borderBottomColor: '#D4AF37',
    borderBottomWidth: 1.5,
  },
  senhaContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#D4AF3733',
    alignItems: 'center',
  },
  inputSenha: {
    flex: 1,
    color: '#fff',
    paddingVertical: 10,
    fontSize: 16,
  },
  olhoBotao: {
    padding: 10,
  },
  botaoTouch: {
    marginTop: 30,
  },
  botaoGradient: {
    paddingVertical: 18,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  botaoTexto: {
    color: '#000',
    fontSize: 16,
    fontWeight: 'bold',
    letterSpacing: 3,
  },
  linkBotao: {
    marginTop: 30,
    alignItems: 'center',
  },
  linkTexto: {
    color: '#D4AF37',
    fontSize: 11,
    letterSpacing: 2,
    opacity: 0.6,
  },
});