import React from 'react';
import Carousel from 'pinar';
import { Dimensions } from 'react-native';
import { expensesItems } from '@/static/expenses.static';
import FinanceSliderList from './FinanceSliderList';
import { incomeItems } from '@/static/income.static';
import { useFinanceForm } from '@/contexts/FinanceFormContext';
import CustomCarousel from '@/components/shared/CustomCarousel';
import CustomCarouselDots from '@/components/shared/customCarousel/CustomCarouselDots';

const FinanceSlider = ({
  carouselRef,
}: {
  carouselRef: React.MutableRefObject<Carousel | null>;
}) => {
  const {
    financeForm: { type },
  } = useFinanceForm();
  const items = type === 'expense' ? expensesItems : incomeItems;
  const { width: deviceWidth } = Dimensions.get('window');

  const getMaxLength = () => {
    const res = items.reduce((acc, cur) => {
      return cur.items.length > acc ? cur.items.length : acc;
    }, 0);

    return res;
  };

  return (
    <CustomCarousel
      carouselProps={{
        ref: carouselRef,
        showsControls: false,
        width: deviceWidth - 40,
        height: getMaxLength() > 5 ? 250 : 150,
        renderDots: ({ index, total }) => {
          return total > 1 ? (
            <CustomCarouselDots index={index} total={total} />
          ) : (
            <></>
          );
        },
      }}
    >
      {items.map((item, index) => (
        <FinanceSliderList key={index} category={item} />
      ))}
    </CustomCarousel>
  );
};

export default FinanceSlider;
