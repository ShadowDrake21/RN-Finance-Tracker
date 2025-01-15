import useDeleteFinance from '@/hooks/useDeleteFinance';
import { Finances } from '@/types/types';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ReanimatedSwipeable from 'react-native-gesture-handler/ReanimatedSwipeable';
import SwipeableFinanceAction from './SwipeableFinanceAction';
import { useEffect } from 'react';
import usePulseAnimation from '@/hooks/usePulseAnimation';
import AnimatedMessage from '@/components/ui/AnimatedMessage';
import FinanceItemActionLink from './FinanceItemActionLink';

const FinanceItemAction = (item: Finances) => {
  const [category, name] = item.icon_type.split('/');
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
        {loading ? (
          <AnimatedMessage animatedStyle={animatedStyle} text="Deleting..." />
        ) : (
          <FinanceItemActionLink item={item} category={category} name={name} />
        )}
      </ReanimatedSwipeable>
    </GestureHandlerRootView>
  );
};

export default FinanceItemAction;
