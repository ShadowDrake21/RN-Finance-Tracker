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
import MainHeader from '@/components/MainHeader';
import MonthScrollList from '@/components/MonthScrollList';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonth, setSelectedMonth] = useState('Dec 2024');
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        blurRadius={9}
        source={require('@/assets/images/dashboard-bg.png')}
        style={{ flex: 1 }}
      >
        <Tabs.Screen
          options={{
            headerTransparent: true,
            headerTintColor: '#210e1b',
            header: ({ options: { headerTintColor } }) => (
              <MainHeader
                headerTintColor={headerTintColor}
                top={top}
                wallet={wallet}
                setWallet={setWallet}
              />
            ),
          }}
        />
        <View style={{ paddingTop: headerHeight }}>
          <MonthScrollList
            data={[
              'Apr 2024',
              'May 2024',
              'Jun 2024',
              'Jul 2024',
              'Aug 2024',
              'Sept 2024',
              'Oct 2024',
              'Nov 2024',
              'Dec 2024',
            ]}
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
