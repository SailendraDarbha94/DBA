import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Linking, ScrollView, StyleSheet } from 'react-native';

export default function HomeScreen() {
  return (
    <ScrollView contentContainerStyle={{ padding: 24 }}>
      <ThemedView style={styles.section}>
        <ThemedText type="title" style={styles.center}>Darbha Babu Rao</ThemedText>
        <ThemedText style={styles.center}>Educator • Scholar • Poet • Playwright</ThemedText>
        <ThemedText style={styles.center}>DATE OF BIRTH</ThemedText>
        <ThemedText style={styles.center}>9th February, 1946</ThemedText>
        <ThemedText style={styles.center}>PLACE OF BIRTH</ThemedText>
        <ThemedText style={styles.center}>Bapatla, Andhra Pradesh</ThemedText>
        <ThemedText style={styles.center}>FATHER</ThemedText>
        <ThemedText style={styles.center}>Late Sri Darbha Lakshmi Narayana Sastry</ThemedText>
        <ThemedText style={styles.center}>MOTHER</ThemedText>
        <ThemedText style={styles.center}>Late Smt. Darbha Jwala Annapurna Visalakshi</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Education</ThemedText>
        <ThemedText>ELEMENTARY</ThemedText>
        <ThemedText style={styles.bold}>Mamillapalli Sitaramaiah Elementary School</ThemedText>
        <ThemedText>Bapatla, AP</ThemedText>
        <ThemedText>HIGH SCHOOL</ThemedText>
        <ThemedText style={styles.bold}>Board/Municipal High School</ThemedText>
        <ThemedText>Bapatla, AP</ThemedText>
        <ThemedText>PRE-UNIVERSITY (PUC)</ThemedText>
        <ThemedText style={styles.bold}>VRS & YRN College of Arts and Science</ThemedText>
        <ThemedText>Chirala, AP</ThemedText>
        <ThemedText>GRADUATION (B.COM)</ThemedText>
        <ThemedText style={styles.bold}>C S R Sarma College</ThemedText>
        <ThemedText>Ongole, AP</ThemedText>
        <ThemedText>POST-GRADUATION (M.COM)</ThemedText>
        <ThemedText style={styles.bold}>Andhra University</ThemedText>
        <ThemedText>Visakhapatnam, AP</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Career</ThemedText>
        <ThemedText>1998 – 2004</ThemedText>
        <ThemedText style={styles.bold}>Head of Department of Commerce</ThemedText>
        <ThemedText>The Bapatla College of Arts & Sciences, Bapatla (AP)</ThemedText>
        <ThemedText>Retired 2004</ThemedText>
        <ThemedText style={styles.bold}>Vice-Principal</ThemedText>
        <ThemedText>The Bapatla College of Arts & Sciences, Bapatla (AP)</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Literary Works</ThemedText>
        <ThemedText>Explore the poetry and talks of Darbha Babu Rao.</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/poetry')}>✍ Poetry 1 poem in the collection  Browse poetry →</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/talks')}>🎭 Talks 3 talks in the collection  Browse talks →</ThemedText>
      </ThemedView>

      <ThemedView style={styles.section}>
        <ThemedText type="subtitle">Additional Links</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/poetry')}>Poetry</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/talks')}>Talks</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/admin/login')}>Admin Login</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/privacy')}>Privacy Policy</ThemedText>
        <ThemedText style={styles.link} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/terms')}>Terms & Conditions</ThemedText>
      </ThemedView>

      <ThemedText style={[styles.center, { marginTop: 32, fontSize: 12 }]}>© 2026 Darbha Babu Rao. All rights reserved.</ThemedText>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(0,0,0,0.03)',
  },
  center: {
    textAlign: 'center',
    marginBottom: 4,
  },
  bold: {
    fontWeight: 'bold',
  },
  link: {
    color: '#007AFF',
    textDecorationLine: 'underline',
    marginBottom: 4,
  },
});
