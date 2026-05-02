import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  SafeAreaView, KeyboardAvoidingView, Platform, StatusBar 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={{flex: 1}}>
        <View style={styles.content}>
          
          {/* --- LOGO SECTION --- */}
          <View style={styles.logoSection}>
            <View style={styles.logoCircle}>
              <Ionicons name="flash" size={40} color="#007AFF" />
            </View>
            <Text style={styles.welcomeTxt}>Welcome Back!</Text>
            <Text style={styles.subTxt}>Sign in to continue to Ashish AI Pro</Text>
          </View>

          {/* --- INPUTS --- */}
          <View style={styles.form}>
            <View style={styles.inputWrap}>
              <Ionicons name="mail-outline" size={20} color="#90A4AE" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Email Address" 
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>

            <View style={styles.inputWrap}>
              <Ionicons name="lock-closed-outline" size={20} color="#90A4AE" style={styles.inputIcon} />
              <TextInput 
                style={styles.input} 
                placeholder="Password" 
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />
            </View>

            <TouchableOpacity style={styles.forgotBtn}>
              <Text style={styles.forgotTxt}>Forgot Password?</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.loginBtn} onPress={() => navigation.replace('Home')}>
              <Text style={styles.loginBtnTxt}>Sign In</Text>
            </TouchableOpacity>
          </View>

          {/* --- SOCIAL LOGIN --- */}
          <View style={styles.dividerRow}>
            <View style={styles.line} /><Text style={styles.orTxt}>OR</Text><View style={styles.line} />
          </View>

          <TouchableOpacity style={styles.googleBtn}>
            <Ionicons name="logo-google" size={20} color="#EA4335" />
            <Text style={styles.googleBtnTxt}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.footer}>
            <Text style={styles.noAccount}>Don't have an account? </Text>
            <TouchableOpacity><Text style={styles.signUpTxt}>Sign Up</Text></TouchableOpacity>
          </View>

        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  content: { flex: 1, padding: 30, justifyContent: 'center' },
  logoSection: { alignItems: 'center', marginBottom: 40 },
  logoCircle: { width: 80, height: 80, borderRadius: 25, backgroundColor: '#F0F7FF', justifyContent: 'center', alignItems: 'center', marginBottom: 20 },
  welcomeTxt: { fontSize: 26, fontWeight: 'bold', color: '#1A1A1A' },
  subTxt: { fontSize: 14, color: '#78909C', marginTop: 8 },
  form: { width: '100%' },
  inputWrap: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#F5F7FA', borderRadius: 15, marginBottom: 15, paddingHorizontal: 15, height: 55 },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, color: '#1A1A1A', fontSize: 15 },
  forgotBtn: { alignSelf: 'flex-end', marginBottom: 25 },
  forgotTxt: { color: '#007AFF', fontSize: 13, fontWeight: '600' },
  loginBtn: { backgroundColor: '#007AFF', height: 55, borderRadius: 15, justifyContent: 'center', alignItems: 'center', elevation: 2 },
  loginBtnTxt: { color: '#FFF', fontSize: 16, fontWeight: 'bold' },
  dividerRow: { flexDirection: 'row', alignItems: 'center', marginVertical: 30 },
  line: { flex: 1, height: 1, backgroundColor: '#ECEFF1' },
  orTxt: { marginHorizontal: 15, color: '#90A4AE', fontSize: 12, fontWeight: 'bold' },
  googleBtn: { flexDirection: 'row', height: 55, borderRadius: 15, borderWidth: 1, borderColor: '#ECEFF1', justifyContent: 'center', alignItems: 'center' },
  googleBtnTxt: { marginLeft: 10, color: '#37474F', fontSize: 15, fontWeight: '600' },
  footer: { flexDirection: 'row', justifyContent: 'center', marginTop: 30 },
  noAccount: { color: '#78909C', fontSize: 14 },
  signUpTxt: { color: '#007AFF', fontSize: 14, fontWeight: 'bold' }
});

export default LoginScreen;
