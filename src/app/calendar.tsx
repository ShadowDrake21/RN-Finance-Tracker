import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import {
  CalendarProvider,
  ExpandableCalendar,
  WeekCalendar,
} from 'react-native-calendars';
import { Stack } from 'expo-router';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { useFetchFinancesByDate } from '@/hooks/fetch-finances-by-date.hook';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import CalendarAgendaList from '@/components/calendar/CalendarAgendaList';
import { useAuth, useUser } from '@clerk/clerk-expo';

const Page = () => {
  const { user } = useUser();
  const [selected, setSelected] = useState(
    new Date().toISOString().split('T')[0]
  );
  const [weekView, setWeekView] = useState(false);
  const { group, loading } = useFetchFinancesByDate(selected);
  const [minDate, setMinDate] = useState('');

  useEffect(() => {
    if (!user?.createdAt) return;

    setMinDate(new Date(user?.createdAt).toISOString().split('T')[0]);
  }, []);

  return (
    <View style={styles.container}>
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
        style={styles.calendarProvider}
      >
        {weekView ? (
          <WeekCalendar firstDay={1} allowShadow={false} minDate={minDate} />
        ) : (
          <ExpandableCalendar allowShadow={false} minDate={minDate} />
        )}
        {loading ? (
          <CustomActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <>
            {group?.items.length! > 0 ? (
              <CalendarAgendaList items={group?.items!} total={group?.total!} />
            ) : (
              <View style={{ paddingTop: 50 }}>
                <Text style={styles.emptyText}>
                  No records of income/expenses on this day!
                </Text>
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
  container: { flex: 1, backgroundColor: 'white' },
  calendar: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  header: {
    backgroundColor: 'lightgrey',
  },
  emptyText: { fontWeight: '700', alignSelf: 'center' },
  calendarProvider: {
    borderBottomWidth: 1,
    borderBottomColor: 'black',
  },
});
