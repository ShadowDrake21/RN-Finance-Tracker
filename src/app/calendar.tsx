import { StyleSheet, Text, TextStyle, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import {
  Calendar,
  CalendarList,
  Agenda,
  DateData,
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar,
} from 'react-native-calendars';

const Page = () => {
  const [selected, setSelected] = useState('');
  const [weekView, setWeekView] = useState(false);

  // const renderItem = useCallback(({ item }: any) => {
  //   return <AgendaItem item={item} />;
  // }, []);

  return (
    <CalendarProvider
      date={new Date().toISOString().split('T')[0]}
      // onDateChanged={onDateChanged}
      // onMonthChange={onMonthChange}
      showTodayButton
      // disabledOpacity={0.6}
      // theme={todayBtnTheme.current}
      // todayBottomMargin={16}
    >
      {weekView ? (
        <WeekCalendar
          // testID={testIDs.weekCalendar.CONTAINER}
          firstDay={1}
          // markedDates={marked.current}
        />
      ) : (
        <ExpandableCalendar />
      )}
      <AgendaList
        sections={[]}
        renderItem={() => (
          <View>
            <Text>something</Text>
          </View>
        )}
        // scrollToNextEvent
        sectionStyle={styles.section}
        // dayFormat={'yyyy-MM-d'}
      />
    </CalendarProvider>
  );
};

export default Page;

const styles = StyleSheet.create({
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  section: {
    // backgroundColor: lightThemeColor,
    // color: 'grey',
    // textTransform: 'capitalize',
  },
});
