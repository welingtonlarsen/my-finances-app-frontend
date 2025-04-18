import CategoryFormStep from './category-form-step';
import ExpenseFormStep from './expense-form-step';
import { CurrentStep } from './types/types';

type TProps = {
  onSubmit: any;
  currentStep: CurrentStep;
  setCurrentStep: (newStep: CurrentStep) => void;
};

export default function NewExpenseDialogSteps({ onSubmit, currentStep, setCurrentStep }: TProps) {
  if (currentStep === 'CATEGORY_STEP') {
    return <CategoryFormStep setCurrentStep={setCurrentStep} />;
  }

  return <ExpenseFormStep onSubmit={onSubmit} setCurrentStep={setCurrentStep} />;
}
