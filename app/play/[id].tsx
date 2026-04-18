import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { app } from '../lib/firebaseConfig';

export default function PlayDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const [play, setPlay] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const db = getFirestore(app);
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  useEffect(() => {
    const fetchPlay = async () => {
      try {
        const docRef = doc(db, 'plays', id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setPlay({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error('Error fetching play:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchPlay();
  }, [id]);

  const renderText = (text: string | undefined) => {
    if (!text) return null;
    const lines = text.replace(/\\n/g, '\n').split('\n');
    return lines.map((line, index) => (
      <ThemedText key={`line-${index}`} style={styles.bodyLine}>
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

  if (!play) {
    return (
      <ThemedView style={styles.centered}>
        <ThemedText>Play not found.</ThemedText>
      </ThemedView>
    );
  }

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.tint }]}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <ThemedText style={styles.backText}>← Back</ThemedText>
        </TouchableOpacity>
        {play.title && (
          <ThemedText style={styles.headerTitle} numberOfLines={2}>
            {play.title}
          </ThemedText>
        )}
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {play.excerpt && (
          <View style={[styles.excerptBox, { backgroundColor: colors.card, borderColor: colors.border }]}>
            <ThemedText style={[styles.sectionLabel, { color: colors.muted }]}>EXCERPT</ThemedText>
            {renderText(play.excerpt)}
          </View>
        )}
        {play.content && (
          <View style={styles.contentSection}>
            <ThemedText style={[styles.sectionLabel, { color: colors.muted }]}>FULL TEXT</ThemedText>
            {renderText(play.content)}
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
    lineHeight: 26,
  },
});
