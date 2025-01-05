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

export const downloadImage = async ({
  user_id,
  token,
  imagePath,
}: {
  user_id: string;
  token: string;
  imagePath: string;
}) => {
  console.log('in getImageUrl');
  const supabase = await supabaseClient(token);
  const { data, error } = await supabase.storage
    .from('finance-images')
    .download(`${user_id}/${imagePath}`);

  if (error) {
    console.error('Error downloading image:', error);
  } else if (data) {
    try {
      return new Promise<string>((resolve, reject) => {
        const fr = new FileReader();
        fr.readAsDataURL(data);
        fr.onload = function () {
          resolve(fr.result as string);
        };
        fr.onerror = function () {
          reject('error');
        };
      });
    } catch (error) {
      console.error('Error reading image:', error);
    }
  } else {
    console.error('No data or error returned');
  }
  return null;
};
