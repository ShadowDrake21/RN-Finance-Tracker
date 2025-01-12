import { FinanceFormType, Finances } from '@/types/types';
import { supabaseClient } from './supabase.client';
import { deleteImage, updateImage, uploadImage } from './supabase.storage';
import { calcSum } from '@/utils/helpers.utils';

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

export const getFinancesByYear = async ({
  userId,
  token,
  year,
  selection = '*',
  offset,
  limit,
}: {
  userId: string;
  token: string;
  year: number;
  selection?: string;
  offset?: number;
  limit?: number;
}) => {
  const supabase = await supabaseClient(token);
  // const [month, year] = selectedMonthId.split('-');
  const startDate = new Date(Number(year), 0, 1).getTime();
  const endDate = new Date(Number(year) + 1, 0, 1).getTime() - 1;

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
    ? await uploadImage({
        userId,
        token,
        file: finance.image.replace('data:image/jpeg;base64,', ''),
      })
    : null;

  console.log('image', image, finance.image?.slice(0, 30));

  const { data, error } = await supabase
    .from('finances')
    .insert({
      user_id: userId,
      name: finance.note,
      type: finance.type,
      icon_type: finance.kind,
      price:
        finance.type === 'expense' && finance.sum ? -finance.sum : finance.sum,
      currency: finance.currency,
      image: image?.path,
      date: new Date(finance.date).getTime(),
    })
    .select();

  if (error) {
    console.log('error', error);
    return;
  }

  return data[0] as Finances;
};

export const updateFinance = async ({
  userId,
  token,
  finance,
}: {
  userId: string;
  token: string;
  finance: FinanceFormType;
}) => {
  const supabase = await supabaseClient(token);
  // const updatedImage =
  //   finance.image && finance.image.includes('data:image/jpeg;base64,')
  //     ? finance.prevImage
  //       ? await updateImage({
  //           token,
  //           file: finance.image.replace('data:image/jpeg;base64,', ''),
  //           imagePath: finance.prevImage,
  //         })
  //       : await uploadImage({
  //           userId,
  //           token,
  //           file: finance.image.replace('data:image/jpeg;base64,', ''),
  //         })
  //     : null;

  // TODO: sometimes there is no info on editing

  let updatedImage = null;
  if (finance.image && finance.image.includes('data:image/jpeg;base64,')) {
    if (finance.prevImage) {
      updatedImage = await updateImage({
        token,
        file: finance.image.replace('data:image/jpeg;base64,', ''),
        imagePath: finance.prevImage,
      });
    } else {
      updatedImage = await uploadImage({
        userId,
        token,
        file: finance.image.replace('data:image/jpeg;base64,', ''),
      });
    }
  }

  const { error, data } = await supabase
    .from('finances')
    .update({
      user_id: userId,
      name: finance.note,
      type: finance.type,
      icon_type: finance.kind,
      price:
        finance.type === 'expense'
          ? -Math.abs(finance.sum!)
          : Math.abs(finance.sum!),
      currency: finance.currency,
      image: updatedImage ? updatedImage.path : finance.image,
      date: new Date(finance.date).getTime(),
    })
    .eq('id', finance.id)
    .select();

  if (error) {
    console.log('error', error);
    return;
  }

  return data[0] as Finances;
};

export const deleteFinance = async ({
  userId,
  token,
  financeId,
  financeImage,
}: {
  userId: string;
  token: string;
  financeId: number;
  financeImage: string | null;
}) => {
  const supabase = await supabaseClient(token);

  if (financeImage) await deleteImage({ token, imagePath: financeImage });

  const { status, error } = await supabase
    .from('finances')
    .delete()
    .eq('id', financeId)
    .eq('user_id', userId);

  if (error) {
    console.log('error', error);
    return;
  }

  return status;
};

export const getFinanceSumByDay = async ({
  token,
  userId,
  type,
  selectedDate,
}: {
  token: string;
  userId: string;
  type: 'expense' | 'income';
  selectedDate: string;
}) => {
  const prices = (await getFinancesByDate({
    userId,
    token,
    date: new Date(selectedDate).getTime(),
    selection: 'price, type',
  })) as unknown as { price: number }[];

  return calcSum(type, prices);
};

export const getFinanceSumByMonth = async ({
  token,
  userId,
  type,
  selectedMonthId,
}: {
  token: string;
  userId: string;
  type: 'expense' | 'income';
  selectedMonthId: string;
}) => {
  const prices = (await getFinancesByMonth({
    userId,
    token,
    selectedMonthId,
    selection: 'price, type',
  })) as unknown as { price: number }[];

  return calcSum(type, prices);
};

export const getFinanceSumByYear = async ({
  token,
  userId,
  type,
  year,
}: {
  token: string;
  userId: string;
  type: 'expense' | 'income';
  year: number;
}) => {
  const prices = (await getFinancesByYear({
    userId,
    token,
    year,
    selection: 'price, type',
  })) as unknown as { price: number }[];

  const sumForYear = calcSum(type, prices);

  console.log('sumForYear', sumForYear);

  return sumForYear;
};
