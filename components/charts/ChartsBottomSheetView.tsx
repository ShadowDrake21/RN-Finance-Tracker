import { StyleSheet } from 'react-native';
import React, { RefObject, useEffect, useState } from 'react';
import CustomActivityIndicator from '../ui/CustomActivityIndicator';

import { useFinanceStore } from '@/store/useFinanceStore';
import { BottomSheetMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import GeneralBottomSheetView from '../shared/GeneralBottomSheetView';
import ChartsBottomSheetList from './ChartsBottomSheetList';
import { useUser } from '@clerk/clerk-expo';

const ChartsBottomSheetView = ({
  bottomSheetRef,
  year,
}: {
  bottomSheetRef: RefObject<BottomSheetMethods>;
  year: number;
}) => {
  const { user } = useUser();

  const [monthsIds, setMonthsIds] = useState<string[]>([]);

  const getMonths = () => {
    if (!user?.createdAt) return;

    console.log('user', year);

    const createdDate = new Date(user.createdAt);

    if (
      createdDate.getFullYear() === year &&
      createdDate.getFullYear() !== new Date().getFullYear()
    ) {
      const createdMonth = createdDate.getMonth();
      console.log('createdMonth', createdMonth);

      const months = Array.from({ length: 12 - createdMonth }, (_, i) => {
        return new Date(createdDate.setMonth(createdMonth + i))
          .toLocaleString('default', { month: 'numeric', year: 'numeric' })
          .replace('/', '-');
      });

      console.log('months', months);

      setMonthsIds(months);
    } else if (new Date().getFullYear() === year) {
      const currentMonth = new Date().getMonth();
      console.log('currentMonth', currentMonth);
      const months = Array.from({ length: currentMonth + 1 }, (_, i) => {
        return new Date(new Date().setMonth(i))
          .toLocaleString('default', { month: 'numeric', year: 'numeric' })
          .replace('/', '-');
      });

      console.log('months', months);

      setMonthsIds(months);
    }
  };

  useEffect(() => {
    getMonths();

    return () => {
      setMonthsIds([]);
    };
  }, [user]);

  return (
    <GeneralBottomSheetView>
      {/* (
      <CustomActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) */}
      <ChartsBottomSheetList
        bottomSheetRef={bottomSheetRef}
        monthsIds={monthsIds}
        year={year}
      />
    </GeneralBottomSheetView>
  );
};

export default ChartsBottomSheetView;
