import {
  StyleSheet,
  Text,
  TextStyle,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useCallback, useLayoutEffect, useState } from 'react';
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
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { SwitchItemType } from '@/types/types';
import CustomSwitch from '@/components/CustomSwitch';

const switchSelectorOptions: SwitchItemType[] = [
  { label: 'Week', value: 'week' },
  { label: 'Extendable', value: 'extendable' },
];

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [selected, setSelected] = useState('');
  const [weekView, setWeekView] = useState(false);

  // const renderItem = useCallback(({ item }: any) => {
  //   return <AgendaItem item={item} />;
  // }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomSwitch
              options={switchSelectorOptions}
              setValue={setWeekView}
            />
          ),
        }}
      />
      <CalendarProvider
        date={new Date().toISOString().split('T')[0]}
        // onDateChanged={onDateChanged}
        // onMonthChange={onMonthChange}
        showTodayButton
        // disabledOpacity={0.6}
        // theme={todayBtnTheme.current}
        // todayBottomMargin={16}
        style={{
          // shadowColor: 'black',
          // shadowOpacity: 0.3,
          // shadowRadius: 5,
          // shadowOffset: { width: 0, height: 3 },
          borderBottomWidth: 1,
          borderBottomColor: 'black',
        }}
      >
        {weekView ? (
          <WeekCalendar
            // testID={testIDs.weekCalendar.CONTAINER}
            firstDay={1}
            // markedDates={marked.current}
            allowShadow={false}
          />
        ) : (
          <ExpandableCalendar allowShadow={false} />
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
    </View>
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
