import { currencies } from '@/content/currencies.content';
import { FinanceFormType } from '@/types/types';
import {
  createContext,
  PropsWithChildren,
  useContext,
  useReducer,
} from 'react';

type FinanceFormContextType = {
  financeForm: FinanceFormType;
  setField: (field: keyof FinanceFormType, value: any) => void;
  resetFinanceForm: () => void;
  isFormValid: () => boolean;
  isFormDirty: () => boolean;
};

const FinanceFormContext = createContext<FinanceFormContextType | undefined>(
  undefined
);

const FinanceFormInitial: FinanceFormType = {
  id: 0,
  type: 'expense',
  kind: '',
  sum: null,
  currency: currencies[0],
  note: '',
  image: null,
  date: new Date().toISOString(),
};

type Action =
  | { type: 'SET_FIELD'; field: keyof FinanceFormType; value: any }
  | { type: 'RESET_FORM' };

const financeFormReducer = (
  state: FinanceFormType,
  action: Action
): FinanceFormType => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'RESET_FORM':
      return FinanceFormInitial;
    default:
      return state;
  }
};

export const FinanceFormProvider = ({ children }: PropsWithChildren) => {
  const [financeForm, dispatch] = useReducer(
    financeFormReducer,
    FinanceFormInitial
  );

  const setField = (field: keyof FinanceFormType, value: any) => {
    dispatch({ type: 'SET_FIELD', field, value });
  };

  const resetFinanceForm = () => {
    dispatch({ type: 'RESET_FORM' });
  };

  const isFormValid = () => {
    return (
      !!financeForm.sum &&
      financeForm.sum > 0 &&
      financeForm.kind !== '' &&
      financeForm.note !== ''
    );
  };

  const isFormDirty = () => {
    return JSON.stringify(financeForm) !== JSON.stringify(FinanceFormInitial);
  };

  const addFinanceToDB = async () => {};

  return (
    <FinanceFormContext.Provider
      value={{
        financeForm,
        setField,
        resetFinanceForm,
        isFormValid,
        isFormDirty,
      }}
    >
      {children}
    </FinanceFormContext.Provider>
  );
};

export const useFinanceForm = () => {
  const context = useContext(FinanceFormContext);

  if (!context) {
    throw new Error('useFinanceForm must be within a FinanceFormProvider');
  }

  return context;
};
