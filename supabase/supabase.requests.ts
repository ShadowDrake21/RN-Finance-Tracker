import { FinanceFormType } from '@/types/types';
import { supabaseClient } from './supabase.client';

export const getFinances = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const supabase = await supabaseClient(token);
  const { data: finances } = await supabase
    .from('finances')
    .select('*')
    .eq('user_id', userId);

  return finances;
};

export const addFinance = async ({
  userId,
  token,
  finance,
}: {
  userId: string;
  token: string;
  finance: FinanceFormType;
}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.from('finances').insert({
    user_id: userId,
    name: finance.note,
    type: finance.type,
    icon_type: finance.kind,
    price: finance.sum,
    currency: finance.currency,
    image: finance.image || null,
    date: finance.date,
  });

  if (error) {
    console.log('error', error);
    return;
  }

  return data;
};
