import { StyleSheet } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Calendar, CalendarUtils } from 'react-native-calendars';
import BottomSheet, { BottomSheetView } from '@gorhom/bottom-sheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { COLORS } from '@/constants/colors';
import { useFinanceForm } from '@/contexts/FinanceFormContext';

const INITIAL_DATE = new Date().toISOString();

const CalendarModal = ({
  visible,
  setVisible,
  firstDate,
}: // date,
// setDate,
{
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  firstDate: Date;
  // date: string;
  // setDate: React.Dispatch<React.SetStateAction<string>>;
}) => {
  // useEffect(() => {
  //   console.log('date', date);
  // }, [date]);

  const {
    financeForm: { date },
    setField,
  } = useFinanceForm();
  const bottomSheetRef = useRef<BottomSheet>(null);

  const getDate = (count: number, passedDate: string) => {
    const date = new Date(passedDate);
    const newDate = date.setDate(date.getDate() + count);
    return CalendarUtils.getCalendarDateString(newDate);
  };

  const onDayPress = (day: { dateString: React.SetStateAction<string> }) => {
    setField('date', day.dateString);
    bottomSheetRef.current?.close();
  };

  useEffect(() => {
    if (visible) {
      bottomSheetRef.current?.expand();
    }
  }, [visible]);

  return (
    <GestureHandlerRootView style={StyleSheet.absoluteFillObject}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={['50%']}
        enablePanDownToClose
        onClose={() => setVisible(false)}
        index={2}
        handleStyle={{ paddingTop: 10, paddingBottom: 0 }}
        containerStyle={{
          paddingBottom: 75,
        }}
      >
        <BottomSheetView>
          <Calendar
            enableSwipeMonths
            onDayPress={onDayPress}
            hideExtraDays
            firstDay={1}
            current={INITIAL_DATE}
            minDate={firstDate.toISOString()}
            maxDate={getDate(0, INITIAL_DATE)}
            disableAllTouchEventsForDisabledDays
            markingType={'period'}
            markedDates={{
              [getDate(0, date)]: {
                color: COLORS.primary,
                textColor: COLORS.extraDarkPrimary,
              },
            }}
          />
        </BottomSheetView>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default CalendarModal;
