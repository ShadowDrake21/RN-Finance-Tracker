import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import * as DropdownMenu from 'zeego/dropdown-menu';
import Entypo from '@expo/vector-icons/Entypo';

const Page = () => {
  const [wallet, setWallet] = useState('Wallet 1');
  return (
    <View>
      <Tabs.Screen
        options={{
          header: () => (
            <View>
              <View
                style={{
                  shadowColor: '#000',
                  shadowOffset: {
                    width: 0,
                    height: 2,
                  },
                  shadowOpacity: 0.23,
                  shadowRadius: 2.62,
                  elevation: 4,
                }}
              >
                <Image
                  source={require('@/assets/images/user-mockup.png')}
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
              </View>
              <Pressable>
                <Ionicons
                  name="notifications-outline"
                  size={30}
                  color="white"
                />
              </Pressable>
              <DropdownMenu.Root>
                <DropdownMenu.Trigger>
                  <Pressable>
                    <Text>{wallet}</Text>
                  </Pressable>
                  <Entypo name="chevron-down" size={24} color="black" />
                </DropdownMenu.Trigger>
                <DropdownMenu.Content>
                  <DropdownMenu.Group>
                    {['Wallet 1', 'Wallet 2', 'Shared wallet with Ami'].map(
                      (wallet) => (
                        <DropdownMenu.Item
                          key={wallet}
                          onSelect={() => {
                            setWallet(wallet);
                          }}
                          textValue={wallet}
                        >
                          <DropdownMenu.ItemTitle>
                            {wallet}
                          </DropdownMenu.ItemTitle>
                          <DropdownMenu.ItemSubtitle>
                            12345PLN
                          </DropdownMenu.ItemSubtitle>
                        </DropdownMenu.Item>
                      )
                    )}
                  </DropdownMenu.Group>
                  <DropdownMenu.Separator />
                  <DropdownMenu.Arrow />
                </DropdownMenu.Content>
              </DropdownMenu.Root>
            </View>
          ),
        }}
      />
      <Text>Page</Text>
    </View>
  );
};

export default Page;

const styles = StyleSheet.create({});
