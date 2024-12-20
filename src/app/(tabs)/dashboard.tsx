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
import React, { useEffect, useState } from 'react';
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
import { formatCurrency } from 'react-native-format-currency';
import { COLORS } from '@/constants/colors';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import AntDesign from '@expo/vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const headerHeight = useHeaderHeight();

  const [wallet, setWallet] = useState('Wallet 1');
  const [selectedMonth, setSelectedMonth] = useState('Dec 2024');
  const [rawCurrentBalance, setRawCurrentBalance] = useState(13456.56);
  const [formattedCurrentBalance, setFormattedCurrentBalance] = useState('');

  useEffect(() => {
    const [valueFormattedWithSymbol] = formatCurrency({
      amount: rawCurrentBalance,
      code: 'PLN',
    });
    setFormattedCurrentBalance(valueFormattedWithSymbol);
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        blurRadius={10}
        source={require('@/assets/images/dashboard-bg.png')}
        style={{ flex: 1 }}
      >
        <LinearGradient
          colors={['rgba(255,255,255,0.6)', 'rgba(0,0,0,0.4)']}
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
          <View
            style={{
              width: '100%',
              paddingVertical: 20,
              paddingHorizontal: 10,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text
              style={{
                fontSize: 16,
                textTransform: 'uppercase',
                fontWeight: '600',
                color: '#210e1b',
                paddingBottom: 5,
              }}
            >
              Current balance
            </Text>
            <Text
              style={{
                fontSize: 34,
                fontWeight: '800',
                color: COLORS.text,
                paddingBottom: 20,
              }}
            >
              {formattedCurrentBalance}
            </Text>
            <View>
              <Text
                style={{
                  textTransform: 'capitalize',
                  fontSize: 18,
                  fontWeight: '600',
                  color: '#210e1b',
                  textAlign: 'center',
                  paddingBottom: 10,
                }}
              >
                In {selectedMonth}:
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: '100%',
                  paddingHorizontal: 20,
                }}
              >
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <AntDesign name="arrowup" size={24} color="black" />

                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}
                  >
                    34.555,90 zł
                  </Text>
                </View>
                <View style={{ flexDirection: 'row', gap: 5 }}>
                  <AntDesign name="arrowdown" size={24} color="black" />
                  <Text
                    style={{
                      fontSize: 20,
                      fontWeight: '700',
                      alignSelf: 'center',
                    }}
                  >
                    - 10.456,00 zł
                  </Text>
                </View>
              </View>
            </View>
          </View>
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
