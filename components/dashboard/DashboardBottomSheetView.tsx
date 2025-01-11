import { StyleSheet } from 'react-native';
import React, { RefObject, useEffect } from 'react';
import CustomActivityIndicator from '../ui/CustomActivityIndicator';
import DashboardBottomSheetList from './DashboardBottomSheetList';
import { useFinanceStore } from '@/store/useFinanceStore';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import GeneralBottomSheetView from '../shared/GeneralBottomSheetView';

const DashboardBottomSheetView = ({
  bottomSheetRef,
}: {
  bottomSheetRef: RefObject<BottomSheetMethods>;
}) => {
  const { groups, loading } = useFinanceStore();

  useEffect(() => {
    console.log('bottomSheetRef', bottomSheetRef);
  }, [bottomSheetRef]);

  return (
    <GeneralBottomSheetView>
      {loading && (
        <CustomActivityIndicator size="large" style={{ marginVertical: 20 }} />
      )}
      <DashboardBottomSheetList
        bottomSheetRef={bottomSheetRef}
        groups={groups}
        // refreshFinances={refreshFinances}
        // handleLoadMore={handleLoadMore}
        listLoading={loading}
      />
    </GeneralBottomSheetView>
  );
};

export default DashboardBottomSheetView;
