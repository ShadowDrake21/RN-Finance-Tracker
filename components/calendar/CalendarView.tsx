import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ExpandableCalendar, WeekCalendar } from 'react-native-calendars';

const CalendarView = ({
  weekView,
  minDate,
}: {
  weekView: boolean;
  minDate: string;
}) => {
  return weekView ? (
    <WeekCalendar firstDay={1} allowShadow={false} minDate={minDate} />
  ) : (
    <ExpandableCalendar allowShadow={false} minDate={minDate} />
  );
};

export default CalendarView;
