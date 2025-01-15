import { Text } from 'react-native';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { format } from 'date-fns';

const ProfileBottomSheetListBasicInfo = () => {
  const { user } = useUser();
  return (
    <>
      <Text style={{ paddingBottom: 10 }}>
        Email: {user?.emailAddresses[0].emailAddress}
      </Text>
      <Text style={{ paddingBottom: 10 }}>
        Last Sign In:{' '}
        {user?.lastSignInAt
          ? format(user?.lastSignInAt, "dd/MM/yyyy 'at' HH:mm")
          : 'No data'}
      </Text>
    </>
  );
};

export default ProfileBottomSheetListBasicInfo;
