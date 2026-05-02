import React from 'react';
import { SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';

const PreviewScreen = ({ route, navigation }) => {
  const { htmlCode } = route.params;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="close" size={28} color="#000" />
        </TouchableOpacity>
        <Text style={styles.title}>Live Preview</Text>
        <View style={{width: 28}} />
      </View>
      <WebView 
        originWhitelist={['*']}
        source={{ html: htmlCode }} 
        style={{ flex: 1 }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 15, borderBottomWidth: 1, borderBottomColor: '#EEE' },
  title: { fontSize: 18, fontWeight: 'bold' }
});

export default PreviewScreen;
