import { Image, StyleSheet, Text, View } from 'react-native';
import React, { memo, useEffect } from 'react';
import { IDayBalance } from '@/dummy/dummy-balance-data';
import { COLORS } from '@/constants/colors';
import ShoppingIcon from '@/assets/activities-icons/png/shopping.png';

const DashboardActivityItem = (item: IDayBalance) => {
  useEffect(() => {
    console.log('render', item.date);
  }, []);
  return (
    <View>
      <View>
        <Text>{item.date}</Text>
        <Text>{item.bilans}</Text>
      </View>
      <View>
        {item.items.map((activity, index) => (
          <View key={index}>
            <View>
              <Image source={ShoppingIcon} style={{ width: 50, height: 50 }} />
              <View>
                <Text>{activity.name}</Text>
                <Text>{activity.description}</Text>
              </View>
            </View>
            <Text
              style={
                activity.price > 0
                  ? { color: COLORS.tabBarTintActive }
                  : { color: 'red' }
              }
            >
              {activity.price}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

export default memo(DashboardActivityItem);

const styles = StyleSheet.create({});
