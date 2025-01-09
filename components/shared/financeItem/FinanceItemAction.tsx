import useDeleteFinance from '@/hooks/useDeleteFinance';
import { Finances } from '@/types/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import SwipeableFinanceAction from './SwipeableFinanceAction';

import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { COLORS } from '@/constants/colors';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { formatCurrency } from 'react-native-format-currency';
import { Link } from 'expo-router';

const FinanceItemAction = (item: Finances) => {
  const [category, name] = item.icon_type.split('/');
  const { onDelete, loading } = useDeleteFinance({
    id: item.id,
    image: item.image,
  });

  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(_, drag) => (
          <SwipeableFinanceAction type="right" drag={drag} action={onDelete} />
        )}
        renderLeftActions={(_, drag) => (
          <SwipeableFinanceAction
            type="left"
            drag={drag}
            action={() => console.log('Archive')}
          />
        )}
      >
        <Link href={`/finance-info/${item.id}`} asChild>
          <Pressable key={item.id} style={styles.activityItemInnerContainer}>
            <View style={styles.activityItemBody}>
              <Image
                source={
                  item.type === 'expense'
                    ? EXPENSES_ICONS[category][name]
                    : INCOME_ICONS[category][name]
                }
                style={styles.icon}
              />
              <View style={{ maxWidth: '70%' }}>
                <Text
                  style={styles.nameText}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>

                <Text style={styles.typeText}>
                  {item.icon_type.replace(/_/g, ' ').replace(/\//g, ' / ')}
                </Text>
              </View>
            </View>
            <Text
              style={[
                { fontWeight: '500' },
                item.price > 0
                  ? { color: COLORS.tabBarTintActive }
                  : { color: 'red' },
              ]}
            >
              {item.price > 0 && '+'}{' '}
              {
                formatCurrency({
                  amount: item.price,
                  code: 'PLN',
                })[0]
              }
            </Text>
          </Pressable>
        </Link>
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default FinanceItemAction;

const styles = StyleSheet.create({
  activityItemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  activityItemBody: { flexDirection: 'row', alignItems: 'center', gap: 15 },
  icon: { width: 50, height: 50 },
  nameText: { fontWeight: '500', fontSize: 18 },
  typeText: {
    fontSize: 12,
    color: COLORS.darkGray,
    textTransform: 'capitalize',
    width: '100%',
  },
});
