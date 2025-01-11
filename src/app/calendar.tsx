import { StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { CalendarProvider } from 'react-native-calendars';
import { Stack } from 'expo-router';
import CustomSwitch from '@/components/ui/CustomSwitch';
import { useFetchFinancesByDate } from '@/hooks/fetch-finances-by-date.hook';
import CustomActivityIndicator from '@/components/ui/CustomActivityIndicator';
import { useUser } from '@clerk/clerk-expo';
import CalendarView from '@/components/calendar/CalendarView';
import CalendarList from '@/components/calendar/CalendarList';

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
        <CalendarView weekView={weekView} minDate={minDate} />
        {loading ? (
          <CustomActivityIndicator size="large" style={{ marginTop: 20 }} />
        ) : (
          <CalendarList group={group} />
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
