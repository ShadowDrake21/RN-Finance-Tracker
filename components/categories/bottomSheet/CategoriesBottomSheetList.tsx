import React, { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { IFinanceGroup } from '@/types/types';
import { groupFinancesByDate } from '@/utils/finance-groups.utils';
import GeneralBottomSheetList from '@/components/shared/GeneralBottomSheetList';
import Loader from '@/components/shared/Loader';
import { FlashList } from '@shopify/flash-list';
import FinanceItem from '@/components/shared/FinanceItem';
import EmptyLabel from '@/components/ui/EmptyLabel';
import useFetchFinancesByType from '@/hooks/useFetchFinancesByType';

const CategoriesBottomSheetList = ({ category }: { category: string }) => {
  const [groups, setGroups] = useState<IFinanceGroup[]>([]);
  const [loading, setLoading] = useState(false);
  const { fetchItems } = useFetchFinancesByType(category);

  const fetchData = async () => {
    setLoading(true);
    const finances = await fetchItems();
    if (finances) {
      setGroups(groupFinancesByDate(finances, []));
    }
    setTimeout(() => setLoading(false), 300);
  };

  useEffect(() => {
    fetchData();
  }, [category]);

  return (
    <GeneralBottomSheetList>
      {loading && <Loader style={styles.loader} />}

      <FlashList
        estimatedItemSize={20}
        data={groups}
        contentContainerStyle={{
          paddingBottom: 75,
        }}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.date}
        onEndReachedThreshold={0.5}
        renderItem={({ item }) => <FinanceItem {...item} />}
        ListEmptyComponent={<EmptyLabel />}
      />
    </GeneralBottomSheetList>
  );
};

export default CategoriesBottomSheetList;

const styles = StyleSheet.create({
  loader: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    zIndex: 10,
    backgroundColor: 'white',
  },
});
