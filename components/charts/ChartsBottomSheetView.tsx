import React, { useEffect, useState } from 'react';
import GeneralBottomSheetView from '../shared/GeneralBottomSheetView';
import ChartsBottomSheetList from './ChartsBottomSheetList';
import { useUser } from '@clerk/clerk-expo';
import { getMonthsBetween } from '@/utils/helpers.utils';

const ChartsBottomSheetView = ({ year }: { year: number }) => {
  const { user } = useUser();

  const [monthsIds, setMonthsIds] = useState<string[]>([]);

  const getMonths = () => {
    if (!user?.createdAt) return;

    const createdDate = new Date(user.createdAt);

    if (
      createdDate.getFullYear() === year &&
      createdDate.getFullYear() !== new Date().getFullYear()
    ) {
      const createdMonth = createdDate.getMonth();
      const months = Array.from({ length: 12 - createdMonth }, (_, i) => {
        return new Date(createdDate.setMonth(createdMonth + i))
          .toLocaleString('default', { month: 'numeric', year: 'numeric' })
          .replace('/', '-');
      });

      setMonthsIds(months);
    } else if (new Date().getFullYear() === year) {
      const currentMonth = new Date().getMonth();
      const months = Array.from({ length: currentMonth + 1 }, (_, i) => {
        return new Date(new Date().setMonth(i))
          .toLocaleString('default', { month: 'numeric', year: 'numeric' })
          .replace('/', '-');
      });

      setMonthsIds(months);
    }
  };

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
