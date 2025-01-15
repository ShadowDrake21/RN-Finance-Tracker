import React, { useCallback } from 'react';
import { AgendaList } from 'react-native-calendars';
import AgendaItem from './AgendaItem';
import { CalendarAgendaListProps } from '@/types/types';
import CalendarAgendaListFooter from './CalendarAgendaListFooter';

const CalendarAgendaList = ({ items, total }: CalendarAgendaListProps) => {
  const renderItem = useCallback(({ item }: any) => {
    return <AgendaItem {...item} />;
  }, []);

  return (
    <AgendaList
      sections={[{ title: items[0]?.date, data: items }]}
      renderItem={renderItem}
      scrollToNextEvent
      ListFooterComponent={<CalendarAgendaListFooter total={total} />}
    />
  );
};

export default CalendarAgendaList;
