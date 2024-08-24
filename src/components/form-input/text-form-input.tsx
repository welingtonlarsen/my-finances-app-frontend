import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form.tsx';
import { Input } from '@/components/ui/input.tsx';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';
import { HTMLInputTypeAttribute } from 'react';

export interface TInputForm<Type extends FieldValues> {
  form: UseFormReturn<Type, any, undefined>;
  name: Path<Type>;
  label: string;
}

export function TextFormInput<T extends FieldValues>({ form, name, label }: TInputForm<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <div className="relative">
              <Input type="text" {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
