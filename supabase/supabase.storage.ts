import { supabaseClient } from './supabase.client';
import uuid from 'react-native-uuid';
import { decode } from 'base64-arraybuffer';

export const uploadImage = async ({
  userId,
  token,
  file,
}: {
  userId: string;
  token: string;
  file: string;
}) => {
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage
    .from('finance-images')
    .upload(`${userId}/${uuid.v4()}`, decode(file), {
      contentType: 'image/jpeg',
    });

  if (error) {
    console.log('error', error);
    return;
  }

  return data;
};

const loadImages = async ({
  userId,
  token,
}: {
  userId: string;
  token: string;
}) => {
  const supabase = await supabaseClient(token);
  const { data: images, error } = await supabase.storage
    .from('files')
    .list(userId);

  if (error) {
    console.log('error', error);
    return;
  }

  return images;
};
