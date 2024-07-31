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
    let value = event.target.value;
    // value = value.replace(/\,/, ".");
    console.log('value: ', value);
    
    if (value) {
      // Converte a string modificada (value) para número e passa para field.onChange
      field.onChange(Number(value));
    } else {
      console.log('no value');
      field.onChange('');
    }
  };

  const handleNumberKeyDown = (event) => {
    // Verifica se a tecla pressionada é uma vírgula
    if (event.key === ',') {
      event.preventDefault();
    }
  };

  const getInput = useCallback((field: ControllerRenderProps<T, Path<T>>) => {
    if (type === 'number')
      return (
        <Input
          className="pl-6"
          type="number"
          onKeyDown={handleNumberKeyDown}
          {...field}
          onChange={(event) => handleOnChangeNumberInput(event, field)}
        />
      );

    if (type === 'date') return <Input type={type} {...field} className="min-w-80 appearance-none left-0" />;

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
