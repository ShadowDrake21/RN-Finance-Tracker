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
  offset,
  limit,
}: {
  userId: string;
  token: string;
  selectedMonthId: string;
  offset: number;
  limit: number;
}) => {
  const supabase = await supabaseClient(token);
  const [month, year] = selectedMonthId.split('-');
  const startDate = new Date(Number(year), Number(month) - 1, 1).getTime();
  const endDate = new Date(Number(year), Number(month), 1).getTime() - 1;

  console.log('startDate', new Date(startDate).toLocaleDateString());
  console.log('endDate', new Date(endDate).toISOString());
  console.log('endDate', endDate);
  console.log('userId', userId);

  const { data: finances, error } = await supabase
    .from('finances')
    .select('*')
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
    price: finance.sum,
    currency: finance.currency,
    image: image?.fullPath,
    date: new Date(finance.date).getTime(),
  });

  if (error) {
    console.log('error', error);
    return;
  }
};
