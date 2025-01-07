import {
  Image,
  ImageSourcePropType,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { memo, useEffect } from 'react';
import { COLORS } from '@/constants/colors';
import { Finances, IFinanceGroup } from '@/types/types';
import { format, parse } from 'date-fns';
import { formatCurrency } from 'react-native-format-currency';
import { EXPENSES_ICONS } from '@/constants/icons/expense_icons';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import Reanimated, {
  SharedValue,
  useAnimatedStyle,
} from 'react-native-reanimated';
import { INCOME_ICONS } from '@/constants/icons/income_icons';
import { Link, useRouter } from 'expo-router';
import * as ContextMenu from 'zeego/context-menu';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

const AnimatedTouchableOpacity =
  Reanimated.createAnimatedComponent(TouchableOpacity);

const FinanceItem = memo((group: IFinanceGroup) => {
  const formattedTotal = formatCurrency({
    amount: +group.total.toFixed(2),
    code: 'PLN',
  });

  const formattedDate = format(
    parse(group.date, 'd-M-yyyy', new Date()),
    'd MMM yyyy'
  );

  return (
    <View style={{ paddingBottom: 10 }}>
      <View style={styles.itemContainer}>
        <Text style={{ color: COLORS.darkGray, fontWeight: '500' }}>
          {formattedDate}
        </Text>
        <Text style={{ color: COLORS.darkGray, fontWeight: '500' }}>
          {formattedTotal[1]}
        </Text>
      </View>
      <View>
        {group.items.map((item, index) => (
          <ContextFinanceItemAction key={index} {...item} />
        ))}
      </View>
    </View>
  );
});

export default FinanceItem;

function swipeableAction(
  type: 'left' | 'right',
  prog: SharedValue<number>,
  drag: SharedValue<number>
) {
  const styleAnimation = useAnimatedStyle(() => {
    return {
      transform: [
        type === 'right'
          ? { translateX: drag.value + 100 }
          : { translateX: drag.value - 100 },
      ],
    };
  });

  return (
    <AnimatedTouchableOpacity
      style={[
        styles.swipeableAction,
        styleAnimation,
        { backgroundColor: type === 'right' ? 'red' : COLORS.primary },
      ]}
      onPress={() =>
        type === 'left' ? console.log('Archive') : console.log('Delete')
      }
    >
      <Text style={styles.swipeableActionText}>
        {type === 'left' ? 'Archive' : 'Delete'}
      </Text>
    </AnimatedTouchableOpacity>
  );
}

const FinanceItemAction = (item: Finances) => {
  const [category, name] = item.icon_type.split('/');
  // editing and viewing the content of the item on push!!!!
  return (
    <GestureHandlerRootView>
      <ReanimatedSwipeable
        friction={2}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        renderRightActions={(prog, drag) =>
          swipeableAction('right', prog, drag)
        }
        renderLeftActions={(prog, drag) => swipeableAction('left', prog, drag)}
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
                style={{ width: 50, height: 50 }}
              />
              <View style={{ maxWidth: '70%' }}>
                <Text
                  style={{ fontWeight: '500', fontSize: 18 }}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.name}
                </Text>

                <Text
                  style={{
                    fontSize: 12,
                    color: COLORS.darkGray,
                    textTransform: 'capitalize',
                    width: '100%',
                  }}
                >
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

export const ContextFinanceItemAction = (item: Finances) => {
  const router = useRouter();

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        <FinanceItemAction {...item} />
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item
          key="edit"
          onSelect={() =>
            router.push({
              pathname: `/(finances)/add-finance`,
              params: { id: item.id, type: 'edit' },
            })
          }
        >
          <ContextMenu.ItemTitle>Edit</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: 'slider.vertical.3', // required
              pointSize: 24,
              weight: 'semibold',
              scale: 'medium',
            }}
          ></ContextMenu.ItemIcon>
        </ContextMenu.Item>
        <ContextMenu.Item key="delete" destructive>
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: 'minus.circle', // required
              pointSize: 24,
              weight: 'semibold',
              scale: 'medium',

              // can also be a color string. Requires iOS 15+
              hierarchicalColor: {
                dark: 'blue',
                light: 'green',
              },
              // alternative to hierarchical color. Requires iOS 15+
              paletteColors: [
                {
                  dark: 'blue',
                  light: 'green',
                },
              ],
            }}
          ></ContextMenu.ItemIcon>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

const styles = StyleSheet.create({
  swipeableAction: {
    width: 100,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  swipeableActionText: {
    color: 'white',
    fontWeight: '800',
    textAlign: 'center',
  },
  swipeable: {
    height: 50,
    backgroundColor: 'papayawhip',
    alignItems: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingBottom: 10,
  },
  activityItemInnerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 10,
    backgroundColor: 'white',
  },
  activityItemBody: { flexDirection: 'row', alignItems: 'center', gap: 15 },
});
