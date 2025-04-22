import CategoryFormStep from './category-form-step';
import ExpenseFormStep from './expense-form-step';
import { ExpenseForm } from './hooks/useEditExpenseForm';
import { CategoryForm } from './hooks/useNewCategoryForm';
import { CurrentStep } from './types/types';

type TProps = {
  currentStep: CurrentStep;
  setCurrentStep: (newStep: CurrentStep) => void;
  expenseForm: ExpenseForm;
  categoryForm: CategoryForm;
};

export default function ExpenseModalSteps({ currentStep, setCurrentStep, expenseForm, categoryForm }: TProps) {
  if (currentStep === 'CATEGORY_STEP') {
    return <CategoryFormStep form={categoryForm} />;
  }

  return <ExpenseFormStep form={expenseForm} setCurrentStep={setCurrentStep} />;
}
