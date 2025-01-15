import { FlatList, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { FinanceCategory } from '@/types/types';
import CategoriesCarouselItem from './CategoriesCarouselItem';
import CategoriesCarouselListHeader from './CategoriesCarouselListHeader';

const CategoriesCarouselList = ({ items }: { items: FinanceCategory[] }) => {
  const [type, setType] = useState<'expense' | 'income'>('expense');

  useEffect(() => {
    setType(items[0].type);
  }, [items]);

  return (
    <View>
      <FlatList
        data={items}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.name}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <CategoriesCarouselItem category={item} />}
        ListHeaderComponent={<CategoriesCarouselListHeader type={type} />}
        ListEmptyComponent={
          <Text style={{ fontWeight: '700', alignSelf: 'center' }}>Empty</Text>
        }
      />
      <Text></Text>
    </View>
  );
};

export default CategoriesCarouselList;
