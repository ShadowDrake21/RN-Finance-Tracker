import {
  Image,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo } from 'react';
import { Link, useRouter } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useUser } from '@clerk/clerk-expo';
import MainHeaderDropdown from './MainHeaderDropdown';

type MainHeaderProps = {
  top: number;
  headerTintColor: string | undefined;
  wallet: string;
  setWallet: (wallet: string) => void;
};

const MainHeader = ({
  top,
  headerTintColor,
  wallet,
  setWallet,
}: MainHeaderProps) => {
  const router = useRouter();
  const { user } = useUser();
  return (
    <View style={[styles.container, { paddingTop: top + 10 }]}>
      <Link href="/profile" asChild>
        <TouchableOpacity style={styles.userBtn}>
          <Image
            source={{
              uri: user?.imageUrl,
            }}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </Link>
      <Pressable onPress={() => router.push('/notifications')}>
        <Ionicons
          name="notifications-outline"
          size={30}
          color={headerTintColor}
        />
      </Pressable>
      <MainHeaderDropdown
        headerTintColor={headerTintColor}
        wallet={wallet}
        setWallet={setWallet}
      />
      <Pressable onPress={() => router.push('/calendar')}>
        <MaterialIcons
          name="calendar-today"
          size={30}
          color={headerTintColor}
        />
      </Pressable>
      <Pressable onPress={() => router.push('/search')}>
        <Ionicons name="search" size={30} color={headerTintColor} />
      </Pressable>
    </View>
  );
};

export default memo(MainHeader);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    paddingBottom: 20,
    paddingHorizontal: 25,
  },
  userBtn: {
    shadowColor: '#000',
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.6,
    shadowRadius: 2,
    elevation: 6,
  },
});
