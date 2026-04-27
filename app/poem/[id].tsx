import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { app } from '../lib/firebaseConfig';

export default function PoemDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [poem, setPoem] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  useEffect(() => {
    const fetchPoem = async () => {
      try {
        const docRef = doc(db, 'poems', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPoem({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching poem:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPoem();
  }, [id]);

  const renderText = (text: string | string[] | undefined) => {
    if (!text) return null;
    const lines = Array.isArray(text)
      ? text
      : text.replace(/\\n/g, '\n').split('\n');
    return lines.map((line, index) => (
      <ThemedText key={`line-${index}`} style={[styles.bodyLine, { fontFamily: 'TeluguFont' }]}>
        {line}
      </ThemedText>
    ));
  };

  if (loading) {
    return (
      <ThemedView style={styles.centered}>
        <ActivityIndicator size="large" color={colors.tint} />
      </ThemedView>
    );
  }

  if (!poem) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Poem not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.tint }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        {poem.title && (
          <ThemedText style={[styles.headerTitle, { fontFamily: 'TeluguFont' }]} numberOfLines={2}>
            {poem.title}
          </ThemedText>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {poem.excerpt && (
          <View style={[styles.excerptBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.sectionLabel, { color: colors.muted }]}>EXCERPT</ThemedText>
            {renderText(poem.excerpt)}
          </View>
        )}
        {poem.content && (
          <View style={styles.contentSection}>
            <ThemedText style={[styles.sectionLabel, { color: colors.muted }]}>FULL TEXT</ThemedText>
            {renderText(poem.content)}
          </View>
        )}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    paddingTop: 56,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  backButton: {
    marginBottom: 12,
  },
  backText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 30,
  },
  scrollContent: {
    padding: 20,
    paddingBottom: 48,
  },
  excerptBox: {
    borderRadius: 10,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1,
  },
  contentSection: {
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  bodyLine: {
    fontSize: 16,
    lineHeight: 28,
  },
});
