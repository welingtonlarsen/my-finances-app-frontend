import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldValues, Path, UseFormReturn, ControllerRenderProps } from 'react-hook-form';
import { HTMLInputTypeAttribute, ReactNode } from 'react';

export interface TInputForm<Type extends FieldValues> {
  form: UseFormReturn<Type, any, undefined>;
  name: Path<Type>;
  label: string;
  type: HTMLInputTypeAttribute;
  children: ReactNode;
  placeholder?: string;
}
export default function SelectFormField<T extends FieldValues>({
  form,
  name,
  label,
  type,
  children,
  placeholder,
}: TInputForm<T>) {
  const onChange = (value: string, field: ControllerRenderProps<T, Path<T>>) => {
    if (type === 'number') {
      return field.onChange(Number(value));
    }

    return field.onChange(value);
  };

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={(value) => onChange(value, field)} defaultValue={String(field.value)}>
            <FormControl>
              <SelectTrigger>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>{children}</SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
