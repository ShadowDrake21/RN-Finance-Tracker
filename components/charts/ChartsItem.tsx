import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { COLORS } from '@/constants/colors';

const ChartsItem = ({ year }: { year: number }) => {
  return (
    <Link href={`/(tabs)/visual-representation/${year}`} asChild>
      <TouchableOpacity
        style={{
          paddingVertical: 50,
          width: '100%',
          backgroundColor: COLORS.lightPrimary,
          borderRadius: 7,
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,

          elevation: 5,
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            fontSize: 24,
            fontWeight: '800',
            color: COLORS.extraDarkPrimary,
          }}
        >
          {year}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default ChartsItem;

const styles = StyleSheet.create({});
