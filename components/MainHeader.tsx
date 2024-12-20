import {
  FlatList,
  Image,
  ImageBackground,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useState } from 'react';
import { Link, Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DropdownMenu from 'zeego/dropdown-menu';
import Entypo from '@expo/vector-icons/Entypo';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { BlurView } from 'expo-blur';
import { useHeaderHeight } from '@react-navigation/elements';

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
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: top + 10,
        paddingBottom: 20,
        paddingHorizontal: 25,
      }}
    >
      <Link href="/profile" asChild>
        <TouchableOpacity
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 1,
              height: 2,
            },
            shadowOpacity: 0.6,
            shadowRadius: 2,

            elevation: 6,
          }}
        >
          <Image
            source={require('@/assets/images/user-mockup.png')}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </TouchableOpacity>
      </Link>
      <Pressable onPress={() => console.log('notification')}>
        <Ionicons
          name="notifications-outline"
          size={30}
          color={headerTintColor}
        />
      </Pressable>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: headerTintColor,
              fontWeight: '800',
              fontSize: 18,
            }}
          >
            {wallet.length > 10 ? wallet.slice(0, 10) + '...' : wallet}
          </Text>
          <Entypo name="chevron-down" size={24} color={headerTintColor} />
        </DropdownMenu.Trigger>
        <DropdownMenu.Content>
          <DropdownMenu.Group>
            {['Wallet 1', 'Wallet 2', 'Me + Ami'].map((wallet) => (
              <DropdownMenu.Item
                key={wallet}
                onSelect={() => {
                  setWallet(wallet);
                }}
                textValue={wallet}
                shouldDismissMenuOnSelect
              >
                <DropdownMenu.ItemTitle>{wallet}</DropdownMenu.ItemTitle>
                <DropdownMenu.ItemSubtitle>12345PLN</DropdownMenu.ItemSubtitle>
              </DropdownMenu.Item>
            ))}
          </DropdownMenu.Group>
          <DropdownMenu.Separator />
          <DropdownMenu.Arrow />
        </DropdownMenu.Content>
      </DropdownMenu.Root>
      <Pressable onPress={() => console.log('calendar')}>
        <MaterialIcons
          name="calendar-today"
          size={30}
          color={headerTintColor}
        />
      </Pressable>
      <Pressable onPress={() => console.log('search')}>
        <Ionicons name="search" size={30} color={headerTintColor} />
      </Pressable>
    </View>
  );
};

export default MainHeader;

const styles = StyleSheet.create({});
