import { StyleSheet, Text, View } from 'react-native';
import React, { Ref, RefObject, useEffect } from 'react';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import CustomActivityIndicator from '../ui/CustomActivityIndicator';
import DashboardBottomSheetList from './DashboardBottomSheetList';
import { useFinanceStore } from '@/store/useFinanceStore';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

const DashboardBottomSheetView = ({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}) => {
  const { groups, loading } = useFinanceStore();

  useEffect(() => {
    console.log('DashboardBottomSheetView', groups, loading);
  }, [groups, loading]);
  return (
    <BottomSheetView
      style={[styles.contentContainer, StyleSheet.absoluteFillObject]}
    >
      <View style={{ flex: 1, width: '100%' }}>
        {loading && (
          <CustomActivityIndicator
            size="large"
            style={{ marginVertical: 20 }}
          />
        )}
        <DashboardBottomSheetList
          bottomSheetRef={bottomSheetRef}
          groups={groups}
          // refreshFinances={refreshFinances}
          // handleLoadMore={handleLoadMore}
          listLoading={loading}
        />
      </View>
    </BottomSheetView>
  );
};

export default DashboardBottomSheetView;

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
  },
});
