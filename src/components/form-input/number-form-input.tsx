import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { ChangeEvent } from 'react';

export interface TInputForm<Type extends FieldValues> {
  form: UseFormReturn<Type, any, undefined>;
  name: Path<Type>;
  label: string;
}

export function NumberFormInput<T extends FieldValues>({ form, name, label }: TInputForm<T>) {
  const handleOnChangeNumberInput = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    let value = event.target.value;

    if (value) {
      field.onChange(Number(value));
    } else {
      field.onChange('');
    }
  };

  const handleNumberKeyDown = (event) => {
    if (event.key === ',') {
      event.preventDefault();
    }
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
              <Input
                className="pl-6"
                type="number"
                onKeyDown={handleNumberKeyDown}
                {...field}
                onChange={(event) => handleOnChangeNumberInput(event, field)}
              />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
