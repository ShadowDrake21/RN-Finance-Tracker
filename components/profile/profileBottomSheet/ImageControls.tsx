import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { useProfileEdit } from '@/contexts/ProfileEditContext';

const ProfileBottomSheetListImageControls = () => {
  const { selectedImage, saveSelection, cancelSelection } = useProfileEdit();

  return (
    selectedImage && (
      <View style={styles.selectedImageBtns}>
        <TouchableOpacity
          onPress={cancelSelection}
          style={[
            {
              borderColor: 'darkred',
              backgroundColor: '#ff7f7f',
            },
            styles.selectedImageBtn,
          ]}
        >
          <Text style={{ textAlign: 'center', color: '#7f0000' }}>Cancel</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={saveSelection}
          style={[
            {
              borderColor: COLORS.primary,
              backgroundColor: COLORS.lightPrimary,
            },
            styles.selectedImageBtn,
          ]}
        >
          <Text
            style={{
              textAlign: 'center',
              color: COLORS.extraDarkPrimary,
            }}
          >
            Save
          </Text>
        </TouchableOpacity>
      </View>
    )
  );
};

export default ProfileBottomSheetListImageControls;

const styles = StyleSheet.create({
  selectedImageBtns: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 15,
    paddingBottom: 20,
  },
  selectedImageBtn: { flex: 1, borderWidth: 2, padding: 10, borderRadius: 10 },
});
