import { StyleSheet, View } from 'react-native';
import React from 'react';
import { COLORS } from '@/constants/colors';
import Carousel from 'pinar';
import { Dimensions } from 'react-native';
import { expensesItems } from '@/static/expenses.static';
import FinanceSliderList from './FinanceSliderList';
import { incomeItems } from '@/static/income.static';
import { useFinanceForm } from '@/contexts/FinanceFormContext';

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
    <Carousel
      ref={carouselRef}
      showsControls={false}
      width={deviceWidth - 40}
      height={getMaxLength() > 5 ? 250 : 150}
      renderDots={({ index, total }) => {
        return total > 1 ? (
          <View style={[styles.dotsContainer]}>
            {Array.from({ length: total }).map((_, dotIndex) => (
              <View
                key={dotIndex}
                style={[
                  dotIndex === index ? styles.activeDot : styles.inactiveDot,
                ]}
              />
            ))}
          </View>
        ) : (
          <></>
        );
      }}
    >
      {items.map((item, index) => (
        <FinanceSliderList key={index} category={item} />
      ))}
    </Carousel>
  );
};

export default FinanceSlider;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.lightGray,
  },
  controlsContainer: {
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  controlBtn: {
    width: '100%',
    textTransform: 'uppercase',
    fontSize: 16,
  },
  dotsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20,
  },
  activeDot: {
    backgroundColor: COLORS.primary,
    width: 13,
    height: 13,
    borderRadius: 50,
  },
  inactiveDot: {
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    width: 13,
    height: 13,
    borderRadius: 50,
  },
});
