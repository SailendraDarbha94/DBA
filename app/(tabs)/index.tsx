import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native';

function InfoRow({ label, value }: { label: string; value: string }) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  return (
    <View style={styles.infoRow}>
      <ThemedText style={[styles.infoLabel, { color: colors.muted }]}>{label}</ThemedText>
      <ThemedText style={styles.infoValue}>{value}</ThemedText>
    </View>
  );
}

function SectionCard({ children }: { children: React.ReactNode }) {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  return (
    <View style={[styles.sectionCard, { backgroundColor: colors.card, borderColor: colors.border }]}>
      {children}
    </View>
  );
}

export default function HomeScreen() {
  const colorScheme = useColorScheme() ?? 'light';
  const colors = Colors[colorScheme];
  const router = useRouter();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: colors.tint, dark: '#2C1C14' }}
      headerImage={
        <View style={styles.headerImageWrapper}>
          <View style={styles.initialsCircle}>
            <ThemedText style={styles.initialsText}>DBR</ThemedText>
          </View>
        </View>
      }>
      <ThemedView style={styles.page}>

        {/* Profile */}
        <View style={styles.profileHeader}>
          <ThemedText style={styles.name}>Darbha Babu Rao</ThemedText>
          <ThemedText style={[styles.roles, { color: colors.muted }]}>
            Educator · Scholar · Poet · Playwright
          </ThemedText>
        </View>

        {/* Bio */}
        <SectionCard>
          <InfoRow label="DATE OF BIRTH" value="9th February, 1946" />
          <InfoRow label="PLACE OF BIRTH" value="Bapatla, Andhra Pradesh" />
          <InfoRow label="FATHER" value="Late Sri Darbha Lakshmi Narayana Sastry" />
          <InfoRow label="MOTHER" value="Late Smt. Darbha Jwala Annapurna Visalakshi" />
        </SectionCard>

        {/* Education */}
        <ThemedText style={[styles.sectionHeading, { color: colors.tint }]}>Education</ThemedText>
        <SectionCard>
          <InfoRow label="ELEMENTARY" value="Mamillapalli Sitaramaiah Elementary School, Bapatla" />
          <InfoRow label="HIGH SCHOOL" value="Board/Municipal High School, Bapatla" />
          <InfoRow label="PRE-UNIVERSITY" value="VRS & YRN College of Arts and Science, Chirala" />
          <InfoRow label="B.COM" value="C S R Sarma College, Ongole" />
          <InfoRow label="M.COM" value="Andhra University, Visakhapatnam" />
        </SectionCard>

        {/* Career */}
        <ThemedText style={[styles.sectionHeading, { color: colors.tint }]}>Career</ThemedText>
        <SectionCard>
          <InfoRow label="1998 – 2004" value="Head of Department of Commerce" />
          <InfoRow label="INSTITUTION" value="The Bapatla College of Arts & Sciences, Bapatla" />
          <InfoRow label="RETIRED 2004" value="Vice-Principal, The Bapatla College of Arts & Sciences" />
        </SectionCard>

        {/* Literary Works */}
        <ThemedText style={[styles.sectionHeading, { color: colors.tint }]}>Literary Works</ThemedText>
        <SectionCard>
          <TouchableOpacity style={styles.linkRow} onPress={() => router.push('/(tabs)/poems')}>
            <ThemedText style={styles.linkIcon}>📜</ThemedText>
            <ThemedText style={[styles.linkLabel, { color: colors.tint }]}>Browse Poems</ThemedText>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.linkRow} onPress={() => router.push('/(tabs)/plays')}>
            <ThemedText style={styles.linkIcon}>🎭</ThemedText>
            <ThemedText style={[styles.linkLabel, { color: colors.tint }]}>Browse Plays</ThemedText>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/privacy')}>
            <ThemedText style={styles.linkIcon}>🔒</ThemedText>
            <ThemedText style={[styles.linkLabel, { color: colors.tint }]}>Privacy Policy</ThemedText>
          </TouchableOpacity>
          <View style={[styles.divider, { backgroundColor: colors.border }]} />
          <TouchableOpacity style={styles.linkRow} onPress={() => Linking.openURL('https://darbha-baburao-web-dashboard.vercel.app/terms')}>
            <ThemedText style={styles.linkIcon}>📋</ThemedText>
            <ThemedText style={[styles.linkLabel, { color: colors.tint }]}>Terms & Conditions</ThemedText>
          </TouchableOpacity>
        </SectionCard>

        <ThemedText style={[styles.footer, { color: colors.muted }]}>
          © 2026 Darbha Babu Rao. All rights reserved.
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  page: {
    paddingHorizontal: 16,
    paddingBottom: 48,
  },
  headerImageWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  initialsText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  profileHeader: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  name: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 6,
  },
  roles: {
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionHeading: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 1,
    marginTop: 20,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionCard: {
    borderRadius: 12,
    borderWidth: 1,
    overflow: 'hidden',
  },
  infoRow: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(0,0,0,0.08)',
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 0.8,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 15,
    fontWeight: '500',
  },
  linkRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  linkIcon: {
    fontSize: 18,
  },
  linkLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 46,
  },
  footer: {
    textAlign: 'center',
    fontSize: 12,
    marginTop: 28,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
});
