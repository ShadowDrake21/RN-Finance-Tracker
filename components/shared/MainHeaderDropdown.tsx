import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import * as DropdownMenu from 'zeego/dropdown-menu';
import Entypo from '@expo/vector-icons/Entypo';

type MainHeaderDropdownProps = {
  headerTintColor: string | undefined;
  wallet: string;
  setWallet: (wallet: string) => void;
};

const MainHeaderDropdown = ({
  headerTintColor,
  wallet,
  setWallet,
}: MainHeaderDropdownProps) => {
  return (
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
          {['Wallet 1', 'Wallet 2', 'Wallet 3'].map((wallet) => (
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
  );
};

export default MainHeaderDropdown;

const styles = StyleSheet.create({});
