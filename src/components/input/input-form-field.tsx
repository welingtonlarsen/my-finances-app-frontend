import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { ControllerRenderProps, FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { HTMLInputTypeAttribute, useCallback, useMemo, ChangeEvent } from 'react';

export interface TInputForm<Type extends FieldValues> {
  form: UseFormReturn<Type, any, undefined>;
  name: Path<Type>;
  label: string;
  type: HTMLInputTypeAttribute;
}

export function InputFormField<T extends FieldValues>({ form, name, label, type }: TInputForm<T>) {
  const icon = useMemo(() => {
    if (type === 'number')
      return <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>;
    return null;
  }, []);

  const handleOnChangeNumberInput = (
    event: ChangeEvent<HTMLInputElement>,
    field: ControllerRenderProps<T, Path<T>>,
  ) => {
    const value = event.target.value;
    if (value) {
      console.log(value);
      field.onChange(Number(event.target.value));
    } else {
      field.onChange('');
    }
  };

  const getInput = useCallback((field: ControllerRenderProps<T, Path<T>>) => {
    if (type === 'number')
      return (
        <Input
          className="pl-6"
          type="number"
          {...field}
          onChange={(event) => handleOnChangeNumberInput(event, field)}
        />
      );
    return <Input type={type} {...field} />;
  }, []);

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              {icon}
              {getInput(field)}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
