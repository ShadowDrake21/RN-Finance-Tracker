import useDeleteFinance from '@/hooks/useDeleteFinance';
import usePulseAnimation from '@/hooks/usePulseAnimation';
import { Finances } from '@/types/types';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import * as ContextMenu from 'zeego/context-menu';
import FinanceItemAction from './FinanceItemAction';

const ContextFinanceItemAction = (item: Finances) => {
  const router = useRouter();
  const { onDelete, loading } = useDeleteFinance({
    id: item.id,
    image: item.image,
  });

  useEffect(() => {
    if (loading) {
      executePulseAnimation();
    }
  }, [loading]);

  const { executePulseAnimation, animatedStyle } = usePulseAnimation({});

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {loading ? (
          <Animated.View
            style={[
              {
                paddingVertical: 15,
                paddingHorizontal: 10,
                alignSelf: 'center',
              },
              animatedStyle,
            ]}
          >
            <Animated.Text>Deleting...</Animated.Text>
          </Animated.View>
        ) : (
          <FinanceItemAction {...item} />
        )}
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item
          key="edit"
          onSelect={() =>
            router.push({
              pathname: `/finance`,
              params: { id: item.id, type: 'edit' },
            })
          }
        >
          <ContextMenu.ItemTitle>Edit</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: 'slider.vertical.3',
              pointSize: 24,
              weight: 'semibold',
              scale: 'medium',
            }}
          ></ContextMenu.ItemIcon>
        </ContextMenu.Item>
        <ContextMenu.Item key="delete" destructive onSelect={onDelete}>
          <ContextMenu.ItemTitle>Delete</ContextMenu.ItemTitle>
          <ContextMenu.ItemIcon
            ios={{
              name: 'minus.circle',
              pointSize: 24,
              weight: 'semibold',
              scale: 'medium',
            }}
          ></ContextMenu.ItemIcon>
        </ContextMenu.Item>
      </ContextMenu.Content>
    </ContextMenu.Root>
  );
};

export default ContextFinanceItemAction;
