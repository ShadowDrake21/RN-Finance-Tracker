import { ActivityIndicator, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import {
  AgendaList,
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar,
} from 'react-native-calendars';
import { Stack } from 'expo-router';
import CustomSwitch from '@/components/CustomSwitch';
import AgendaItem from '@/components/AgendaItem';
import { useFetchFinancesByDate } from '@/hooks/fetch-finances-by-date.hook';
import { COLORS } from '@/constants/colors';
import CustomActivityIndicator from '@/components/CustomActivityIndicator';

const Page = () => {
  const [selected, setSelected] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [weekView, setWeekView] = useState(false);

  const { items, loading, total } = useFetchFinancesByDate(selected);

  // TODO: component responsible for only one task

  // TODO: use context

  // TODO: single responsibility principle

  // TODO: flash list
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
        onDateChanged={setSelected}
        showTodayButton
        style={{
          borderBottomWidth: 1,
          borderBottomColor: 'black',
        }}
      >
        {weekView ? (
          <WeekCalendar firstDay={1} allowShadow={false} />
        ) : (
          <ExpandableCalendar allowShadow={false} />
        )}
        {loading ? (
          <CustomActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <>
            {total && <Text>{total}</Text>}
            {items ? (
              <AgendaList
                sections={[{ title: items[0]?.date, data: items }]}
                renderItem={renderItem}
                sectionStyle={styles.section}
                scrollToNextEvent
              />
            ) : (
              <View>
                <Text>No notes on income/outcome</Text>
              </View>
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
