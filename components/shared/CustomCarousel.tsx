import React, { ReactElement } from 'react';
import Carousel, { Props } from 'pinar';

type CustomCarouselProps = {
  children: ReactElement | ReactElement[];
  carouselProps: Partial<Props> & {
    ref?: React.MutableRefObject<Carousel | null>;
  };
};

const CustomCarousel = ({ children, carouselProps }: CustomCarouselProps) => {
  return (
    <Carousel showsControls={false} {...carouselProps}>
      {children}
    </Carousel>
  );
};

export default CustomCarousel;
