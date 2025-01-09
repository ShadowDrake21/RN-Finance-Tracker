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
  setForm: (form: FinanceFormType) => void;
  resetFinanceForm: () => void;
  isFormValid: () => boolean;
  isFormDirty: () => boolean;
  isFormChanged?: boolean;
};

const FinanceFormContext = createContext<FinanceFormContextType | undefined>(
  undefined
);

let isFormChanged: boolean = false;

const FinanceFormInitial: FinanceFormType = {
  id: 0,
  type: 'expense',
  kind: '',
  sum: null,
  currency: currencies[0],
  note: '',
  image: null,
  date: new Date().toISOString(),
  action: 'create',
  prevImage: null,
};

type Action =
  | { type: 'SET_FIELD'; field: keyof FinanceFormType; value: any }
  | {
      type: 'SET_FORM';
      form: FinanceFormType;
    }
  | { type: 'RESET_FORM' };

const financeFormReducer = (
  state: FinanceFormType,
  action: Action
): FinanceFormType => {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value };
    case 'SET_FORM':
      return { ...action.form };
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

  const setForm = (form: FinanceFormType) => {
    dispatch({ type: 'SET_FORM', form });
  };

  const setField = (field: keyof FinanceFormType, value: any) => {
    dispatch({ type: 'SET_FIELD', field, value });
    if (financeForm.action === 'edit') isFormChanged = true;
  };

  const resetFinanceForm = () => {
    dispatch({ type: 'RESET_FORM' });
    isFormChanged = false;
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

  return (
    <FinanceFormContext.Provider
      value={{
        financeForm,
        setField,
        setForm,
        resetFinanceForm,
        isFormValid,
        isFormDirty,
        isFormChanged,
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
