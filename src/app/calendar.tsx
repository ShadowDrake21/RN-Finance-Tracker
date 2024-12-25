import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar,
} from 'react-native-calendars';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import CustomSwitch from '@/components/CustomSwitch';
import AgendaItem from '@/components/AgendaItem';
import { agendaItems } from '@/dummy/agendaItems';
import { useFetchFinances } from '@/hooks/fetch-finances.hook';
import { useFetchFinancesByDate } from '@/hooks/fetch-finances-by-date.hook';

const Page = () => {
  const { top } = useSafeAreaInsets();
  const [selected, setSelected] = useState(
    // new Date().toISOString().split('T')[0].slice(0, 7)
    new Date().toISOString().split('T')[0]
  );
  const [weekView, setWeekView] = useState(false);

  const { items, loading, total } = useFetchFinancesByDate(selected);

  useEffect(() => {
    // console.log(items);
  }, [items]);

  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem {...item} />;
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <Stack.Screen
        options={{
          headerRight: () => (
            <CustomSwitch
              value={weekView}
              onPress={() => setWeekView(!weekView)}
            />
          ),
        }}
      />
      <CalendarProvider
        date={new Date().toISOString().split('T')[0]}
        // onDateChanged={onDateChanged}
        onDateChanged={setSelected}
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
        {loading ? (
          <ActivityIndicator
            style={{ marginTop: 20 }}
            size="large"
            color="black"
          />
        ) : (
          <>
            {total && <Text>{total}</Text>}
            {items && (
              <AgendaList
                sections={[{ title: items[0]?.date, data: items }]}
                renderItem={renderItem}
                sectionStyle={styles.section}
                scrollToNextEvent
              />
            )}
          </>
        )}
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
