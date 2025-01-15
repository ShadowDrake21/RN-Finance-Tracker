import { View } from 'react-native';
import React, { useRef } from 'react';
import CustomCarousel from '../../shared/CustomCarousel';
import { expensesItems } from '@/static/expenses.static';
import { incomeItems } from '@/static/income.static';
import Carousel from 'pinar';
import CustomCarouselDots from '../../shared/customCarousel/CustomCarouselDots';
import CategoriesCarouselList from './CategoriesCarouselList';

const CategoriesCarousel = ({ bottom }: { bottom: number }) => {
  const carouselRef = useRef<Carousel | null>(null);
  const itemsSets = [expensesItems, incomeItems];

  return (
    <View style={{ flex: 1, paddingBottom: bottom + 40 }}>
      <CustomCarousel
        carouselProps={{
          ref: carouselRef,
          bounces: false,
          renderDots: ({ index, total }) => (
            <CustomCarouselDots
              total={total}
              index={index}
              addStyles={{ marginTop: 15 }}
            />
          ),
        }}
      >
        {itemsSets.map((items, index) => (
          <CategoriesCarouselList key={index} items={items} />
        ))}
      </CustomCarousel>
    </View>
  );
};

export default CategoriesCarousel;
