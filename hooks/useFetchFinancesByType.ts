import { StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useAuth } from '@clerk/clerk-expo';
import { getFinancesByType } from '@/supabase/supabase.requests';
import {
  groupFinancesByDate,
  transformFinancesFromDB,
} from '@/utils/finance-groups.utils';
import { Finances } from '@/types/types';

const useFetchFinancesByType = (type: string) => {
  const { userId, getToken } = useAuth();

  const fetchItems = async () => {
    const token = await getToken({ template: 'supabase' });

    if (!token || !userId) return;

    const finances = await getFinancesByType({
      userId,
      token,
      type,
    });

    return transformFinancesFromDB(finances);
  };

  return { fetchItems };
};

export default useFetchFinancesByType;
