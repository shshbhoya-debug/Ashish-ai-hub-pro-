import React, { useState, useContext } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Markdown from 'react-native-markdown-display';
import { AppContext } from '../context/AppContext';
import { callOpenRouter } from '../services/aiService';

// Duniya bhar ki categories
const categories = ['🌐 Any Subject', '🏛️ UPSC & Govt', '🧬 NEET & Medical', '📐 JEE & Advanced Math', '💻 CS & Engineering', '💼 Commerce & Law'];

const EducationScreen = ({ navigation }) => {
  const { isDarkMode, accentColor, apiKey, updateTokens, tokens } = useContext(AppContext);
  const [question, setQuestion] = useState('');
  const [activeCat, setActiveCat] = useState(categories[0]);
  const [answer, setAnswer] = useState(null);
  const [loading, setLoading] = useState(false);

  const solveProblem = async () => {
    if (!question.trim() || loading) return;
    if (tokens < 10) {
      alert("Tokens khatam! 10 tokens required for Universal Solver.");
      return;
    }

    setLoading(true);
    setAnswer(null);

    // The Master "Universal Education" Prompt
    const systemPrompt = `You are the "Omni-Scholar", the ultimate educational AI for 'Ashish AI Hub Pro'. 
    You have Ph.D. level knowledge in EVERY subject in the world (Science, Math, History, Medicine, Engineering, Competitive Exams like UPSC/JEE).
    The user is asking a question related to the category: ${activeCat}.
    
    You MUST strict follow this exact format for EVERY answer:
    ## 🎯 Core Concept
    (Explain the exact answer simply in 2-3 sentences)
    
    ## 📖 Detailed Deep Dive
    (Provide a highly comprehensive, step-by-step, master-level explanation)
    
    ## 🧮 Formulas / Key Facts / Code
    (Provide any relevant math formulas, dates, facts, or code blocks clearly)
    
    ## 🌍 Real-World Analogy
    (Explain the concept as if the user is a beginner, using a daily life example)
    
    ## 💡 Pro / Exam Tip
    (Give a crucial tip for students preparing for exams or interviews related to this topic)
    
    Use rich Markdown formatting (bold, bullet points). Be highly accurate.`;

    try {
      const response = await callOpenRouter(`${systemPrompt}\n\nUser Question: ${question}`, apiKey);
      setAnswer(response);
      updateTokens(-10, `Omni-Scholar: ${activeCat}`);
    } catch (e) {
      console.log(e);
      setAnswer("Network issue. The Master Brain is unable to connect right now.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: isDarkMode ? '#121212' : '#F8F9FB' }]}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={24} color={isDarkMode ? '#FFF' : '#000'} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: isDarkMode ? '#FFF' : '#000' }]}>Universal Solver</Text>
      </View>

      <View style={styles.chipContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {categories.map((cat, index) => (
            <TouchableOpacity 
              key={index} 
              style={[styles.chip, { backgroundColor: activeCat === cat ? accentColor : (isDarkMode ? '#1F1F1F' : '#FFF') }]}
              onPress={() => setActiveCat(cat)}
            >
              <Text style={{ color: activeCat === cat ? '#FFF' : (isDarkMode ? '#FFF' : '#000'), fontSize: 13, fontWeight: 'bold' }}>{cat}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!answer && !loading && (
          <View style={styles.emptyState}>
            <Ionicons name="globe-outline" size={80} color={accentColor + '50'} />
            <Text style={styles.emptyTxt}>Ask anything in the universe.</Text>
            <Text style={styles.emptySub}>Math, Science, UPSC, Coding—You name it.</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingBox}>
            <ActivityIndicator size="large" color={accentColor} />
            <Text style={styles.loadingTxt}>Scanning universal knowledge base...</Text>
          </View>
        )}

        {answer && !loading && (
          <View style={[styles.answerBox, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
            <Markdown style={{ 
              body: { color: isDarkMode ? '#EEE' : '#333', fontSize: 15, lineHeight: 24 },
              heading2: { color: accentColor, marginTop: 15, marginBottom: 10, fontSize: 18 },
              code_inline: { backgroundColor: '#8884', padding: 2, borderRadius: 4 },
              fence: { backgroundColor: '#000', borderRadius: 10, padding: 10, color: '#0F0' }
            }}>
              {answer}
            </Markdown>
          </View>
        )}
      </ScrollView>

      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <View style={[styles.inputContainer, { backgroundColor: isDarkMode ? '#1F1F1F' : '#FFF' }]}>
          <TextInput 
            style={[styles.input, { color: isDarkMode ? '#FFF' : '#000' }]}
            placeholder="Type your complex question here..."
            placeholderTextColor="#888"
            value={question}
            onChangeText={setQuestion}
            multiline
          />
          <TouchableOpacity 
            style={[styles.sendBtn, { backgroundColor: accentColor }]} 
            onPress={solveProblem}
            disabled={loading}
          >
            <Ionicons name="flash" size={22} color="#FFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 40 },
  headerTitle: { fontSize: 20, fontWeight: '800', marginLeft: 15 },
  chipContainer: { paddingHorizontal: 15, marginBottom: 10 },
  chip: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 20, marginRight: 10, elevation: 1 },
  scrollContent: { padding: 20, flexGrow: 1 },
  emptyState: { alignItems: 'center', justifyContent: 'center', marginTop: 100 },
  emptyTxt: { color: '#888', marginTop: 15, fontSize: 18, fontWeight: 'bold' },
  emptySub: { color: '#AAA', marginTop: 5, fontSize: 13 },
  loadingBox: { alignItems: 'center', marginTop: 50 },
  loadingTxt: { marginTop: 15, color: '#888', fontWeight: 'bold' },
  answerBox: { padding: 15, borderRadius: 20, elevation: 2, borderWidth: 1, borderColor: '#8882' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', padding: 15, paddingBottom: 25, borderTopWidth: 1, borderTopColor: '#8882' },
  input: { flex: 1, maxHeight: 120, fontSize: 16, padding: 10 },
  sendBtn: { width: 45, height: 45, borderRadius: 25, alignItems: 'center', justifyContent: 'center', marginLeft: 10 }
});

export default EducationScreen;
