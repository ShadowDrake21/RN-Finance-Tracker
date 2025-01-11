import { ImageBackground, View } from 'react-native';
import React, { PropsWithChildren } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { liniarGradientColors } from '@/constants/gradients';

const ScreenWrapper = ({ children }: PropsWithChildren) => {
  return (
    <View style={{ flex: 1 }}>
      <ImageBackground
        blurRadius={10}
        source={require('@/assets/images/dashboard-bg.png')}
        style={{ flex: 1 }}
      >
        <LinearGradient colors={liniarGradientColors} style={{ flex: 1 }}>
          {children}
        </LinearGradient>
      </ImageBackground>
    </View>
  );
};

export default ScreenWrapper;
