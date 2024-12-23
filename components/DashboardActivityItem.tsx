import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import ShoppingIcon from '@/assets/activities-icons/png/shopping.png';
import { IFinanceGroup } from '@/types';

const DashboardActivityItem = memo((group: IFinanceGroup) => {
  useEffect(() => {
    console.log('render', group.date);
  }, []);
  return (
    <View>
      <View>
        <Text>{group.date}</Text>
        <Text>{group.total}</Text>
      </View>
      <View>
        {group.items.map((item, index) => (
          <View key={index}>
            <View>
              <Image source={ShoppingIcon} style={{ width: 50, height: 50 }} />
              <View>
                <Text>{item.name}</Text>
                <Text>{item.description}</Text>
              </View>
            </View>
            <Text
              style={
                item.price > 0
                  ? { color: COLORS.tabBarTintActive }
                  : { color: 'red' }
              }
            >
              {item.price}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
});

export default DashboardActivityItem;

const styles = StyleSheet.create({});
