import { FinanceFormType } from '@/types/types';
import { supabaseClient } from './supabase.client';
import { uploadImage } from './supabase.storage';

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
    date: finance.date,
  });

  if (error) {
    console.log('error', error);
    return;
  }
};
