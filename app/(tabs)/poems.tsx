import { useRouter } from 'expo-router';
import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { app } from '../lib/firebaseConfig';

export default function PoemsScreen() {
  const [poems, setPoems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [comingSoon, setComingSoon] = useState<any[]>([]);
  const db = getFirestore(app);
  const router = useRouter();
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];

  useEffect(() => {
    const fetchAllPoems = async () => {
      try {
        const poemsCollection = collection(db, 'poems');
        const querySnapshot = await getDocs(poemsCollection);
        const poemsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setPoems(poemsList);
      } catch (error) {
        console.error('Error fetching poems: ', error);
      } finally {
        setLoading(false);
      }
    };
    fetchAllPoems();
  }, []);

  useEffect(() => {
    const fetchComingSoon = async () => {
      try {
        const comingSoonCollection = collection(db, 'coming-soon');
        const querySnapshot = await getDocs(comingSoonCollection);
        const filtered = querySnapshot.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .filter((item: any) => item.type === 'poem');
        setComingSoon(filtered);
      } catch (error) {
        console.error('Error fetching coming soon:', error);
      }
    };
    fetchComingSoon();
  }, []);

  return (
    <ThemedView style={styles.container}>
      <View style={[styles.header, { backgroundColor: colors.tint }]}>
        <ThemedText style={styles.headerTitle}>Poems</ThemedText>
        <ThemedText style={styles.headerSubtitle}>Works of Darbha Babu Rao</ThemedText>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {comingSoon.length > 0 && (
          <View style={styles.comingSoonSection}>
            <ThemedText style={[styles.comingSoonLabel, { color: colors.muted }]}>COMING SOON</ThemedText>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.comingSoonScroll}>
              {comingSoon.map((item) => (
                <View key={item.id} style={[styles.comingSoonCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
                  <ThemedText style={[styles.comingSoonTitle, { color: colors.tint, fontFamily: 'TeluguFont' }]}>
                    {item.title}
                  </ThemedText>
                  {item.content && (
                    <ThemedText style={[styles.comingSoonContent, { color: colors.muted, fontFamily: 'TeluguFont' }]} numberOfLines={3}>
                      {item.content}
                    </ThemedText>
                  )}
                </View>
              ))}
            </ScrollView>
          </View>
        )}
        {loading && (
          <ActivityIndicator size="large" color={colors.tint} style={{ marginTop: 32 }} />
        )}
        {!loading && poems.length === 0 && (
          <ThemedText style={{ textAlign: 'center', marginTop: 32 }}>No poems found.</ThemedText>
        )}
        {poems.map((poem) => (
          <TouchableOpacity
            key={poem.id}
            onPress={() => router.push(`/poem/${poem.id}`)}
            activeOpacity={0.75}
          >
            <View style={[styles.card, { backgroundColor: colors.card, borderColor: colors.border }]}>
              {poem.title && (
                <ThemedText style={[styles.cardTitle, { fontFamily: 'TeluguFont' }]}>
                  {poem.title}
                </ThemedText>
              )}
              {poem.excerpt && (
                <ThemedText
                  style={[styles.cardExcerpt, { color: colors.muted, fontFamily: 'TeluguFont' }]}
                  numberOfLines={3}
                >
                  {Array.isArray(poem.excerpt)
                    ? poem.excerpt.join(' ')
                    : poem.excerpt.replace(/\\n/g, ' ').replace(/\n/g, ' ')}
                </ThemedText>
              )}
              <View style={[styles.readMore, { borderTopColor: colors.border }]}>
                <ThemedText style={[styles.readMoreText, { color: colors.tint }]}>
                  Read More →
                </ThemedText>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
    paddingHorizontal: 20,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    color: 'rgba(255,255,255,0.8)',
    fontSize: 14,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 48,
  },
  card: {
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 16,
    overflow: 'hidden',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    padding: 16,
    paddingBottom: 8,
  },
  cardExcerpt: {
    fontSize: 14,
    lineHeight: 22,
    paddingHorizontal: 16,
    paddingBottom: 12,
  },
  readMore: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
  },
  readMoreText: {
    fontSize: 14,
    fontWeight: '600',
  },
  comingSoonSection: {
    marginBottom: 20,
  },
  comingSoonLabel: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1.2,
    marginBottom: 10,
  },
  comingSoonScroll: {
    gap: 10,
  },
  comingSoonCard: {
    borderRadius: 10,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 10,
    minWidth: 120,
    maxWidth: 200,
  },
  comingSoonTitle: {
    fontSize: 13,
    fontWeight: '600',
    marginBottom: 4,
  },
  comingSoonContent: {
    fontSize: 12,
    lineHeight: 18,
  },
});
