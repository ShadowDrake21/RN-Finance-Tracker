import React, { useEffect, useState } from 'react';
import GeneralBottomSheetView from '../shared/GeneralBottomSheetView';
import ChartsBottomSheetList from './ChartsBottomSheetList';
import { useUser } from '@clerk/clerk-expo';
import { getMonthsBetween } from '@/utils/helpers.utils';

const ChartsBottomSheetView = ({ year }: { year: number }) => {
  const { user } = useUser();

  const [monthsIds, setMonthsIds] = useState<string[]>([]);

  useEffect(() => {
    if (!user?.createdAt) return;

    setMonthsIds(
      getMonthsBetween({
        start: user.createdAt,
        end: new Date(),
        selectedYear: year,
      })
    );

    return () => {
      setMonthsIds([]);
    };
  }, [user]);

  return (
    <GeneralBottomSheetView>
      {/* (
      <CustomActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) */}
      <ChartsBottomSheetList monthsIds={monthsIds} year={year} />
    </GeneralBottomSheetView>
  );
};

export default ChartsBottomSheetView;
