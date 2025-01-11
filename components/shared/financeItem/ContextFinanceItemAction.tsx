import useDeleteFinance from '@/hooks/useDeleteFinance';
import usePulseAnimation from '@/hooks/usePulseAnimation';
import { Finances } from '@/types/types';
import { useRouter } from 'expo-router';
import { useEffect } from 'react';
import Animated from 'react-native-reanimated';
import * as ContextMenu from 'zeego/context-menu';
import FinanceItemAction from './FinanceItemAction';
import AnimatedMessage from '@/components/ui/AnimatedMessage';

const ContextFinanceItemAction = (item: Finances) => {
  console.log('ContextFinanceItemAction');

  const router = useRouter();
  const { onDelete, loading } = useDeleteFinance({
    id: item.id,
    image: item.image,
  });

  const { executePulseAnimation, animatedStyle } = usePulseAnimation({});

  useEffect(() => {
    if (loading) {
      executePulseAnimation();
    }
  }, [loading]);

  useEffect(() => {
    console.log('loading context', loading);
  }, [router]);

  const onEditSelect = () => {
    console.log('edit select');

    if (router.canDismiss()) router.dismissAll();
    router.push({
      pathname: `/finance`,
      params: { id: item.id, type: 'edit' },
    });
  };

  return (
    <ContextMenu.Root>
      <ContextMenu.Trigger>
        {loading ? (
          <AnimatedMessage animatedStyle={animatedStyle} text="Deleting..." />
        ) : (
          <FinanceItemAction {...item} />
        )}
      </ContextMenu.Trigger>
      <ContextMenu.Content>
        <ContextMenu.Item key="edit" onSelect={onEditSelect}>
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
