import { FinanceFormType } from '@/types/types';
import { supabaseClient } from './supabase.client';
import { uploadImage } from './supabase.storage';

export const getAllFinances = async ({
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

export const getFinancesByMonth = async ({
  userId,
  token,
  selectedMonthId,
  selection = '*',
  offset,
  limit,
}: {
  userId: string;
  token: string;
  selectedMonthId: string;
  selection?: string;
  offset?: number;
  limit?: number;
}) => {
  const supabase = await supabaseClient(token);
  const [month, year] = selectedMonthId.split('-');
  const startDate = new Date(Number(year), Number(month) - 1, 1).getTime();
  const endDate = new Date(Number(year), Number(month), 1).getTime() - 1;

  const { data: finances, error } = await supabase
    .from('finances')
    .select(selection)
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate);
  // .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching finances:', error);
    return [];
  }

  return finances;
};

export const getFinancesByDate = async ({
  userId,
  token,
  date,
  selection = '*',
  offset,
  limit,
}: {
  userId: string;
  token: string;
  date: number;
  selection?: string;
  offset?: number;
  limit?: number;
}) => {
  const supabase = await supabaseClient(token);

  const startDate = new Date(date).setHours(0, 0, 0, 0);
  const endDate = new Date(date).setHours(23, 59, 59, 999);

  const { data: finances, error } = await supabase
    .from('finances')
    .select(selection)
    .eq('user_id', userId)
    .gte('date', startDate)
    .lte('date', endDate);
  // .range(offset, offset + limit - 1);

  if (error) {
    console.error('Error fetching finances:', error);
    return [];
  }

  return finances;
};

export const getFinanceById = async ({
  userId,
  token,
  finance_id,
  selection = '*',
}: {
  userId: string;
  token: string;
  finance_id: number;
  selection?: string;
  offset?: number;
  limit?: number;
}) => {
  const supabase = await supabaseClient(token);

  const { data: finance, error } = await supabase
    .from('finances')
    .select(selection)
    .eq('id', finance_id)
    .eq('user_id', userId);

  if (error) {
    console.error('Error fetching finances:', error);
    return [];
  }

  return finance;
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
  const image = finance.image
    ? await uploadImage({ userId, token, file: finance.image })
    : null;

  const { error } = await supabase.from('finances').insert({
    user_id: userId,
    name: finance.note,
    type: finance.type,
    icon_type: finance.kind,
    price:
      finance.type === 'expense' && finance.sum ? -finance.sum : finance.sum,
    currency: finance.currency,
    image: image?.id,
    date: new Date(finance.date).getTime(),
  });

  if (error) {
    console.log('error', error);
    return;
  }
};
