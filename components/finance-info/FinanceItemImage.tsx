import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import ImageView from 'react-native-image-viewing';

const FinanceItemImage = ({ image }: { image: string }) => {
  const [visible, setIsVisible] = useState(false);
  return (
    <View>
      <Text style={styles.imageTitle}>Attached image</Text>
      <Pressable onPress={() => setIsVisible(true)}>
        <Image
          source={{ uri: image }}
          style={{ width: '100%', aspectRatio: 1 }}
        />
      </Pressable>
      <ImageView
        images={[{ uri: image }]}
        imageIndex={0}
        visible={visible}
        onRequestClose={() => setIsVisible(false)}
        animationType="slide"
        presentationStyle="fullScreen"
      />
    </View>
  );
};

export default FinanceItemImage;

const styles = StyleSheet.create({
  imageTitle: { fontSize: 18, fontWeight: '700', paddingBottom: 10 },
});
