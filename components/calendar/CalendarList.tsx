import { View } from 'react-native';
import React from 'react';
import { IFinanceGroup } from '@/types/types';
import CalendarAgendaList from './CalendarAgendaList';
import EmptyLabel from '../ui/EmptyLabel';

const CalendarList = ({ group }: { group: IFinanceGroup | null }) => {
  return group?.items.length! > 0 ? (
    <CalendarAgendaList items={group?.items!} total={group?.total!} />
  ) : (
    <View style={{ paddingTop: 50 }}>
      <EmptyLabel />
    </View>
  );
};

export default CalendarList;
