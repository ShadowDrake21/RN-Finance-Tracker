import React from 'react';

import GeneralBottomSheetView from '@/components/shared/GeneralBottomSheetView';
import CategoriesBottomSheetList from './CategoriesBottomSheetList';

const CategoriesBottomSheetView = ({ category }: { category: string }) => {
  return (
    <GeneralBottomSheetView>
      {/* (
      <CustomActivityIndicator size="large" style={{ marginVertical: 20 }} />
      ) */}
      <CategoriesBottomSheetList category={category} />
    </GeneralBottomSheetView>
  );
};

export default CategoriesBottomSheetView;
