import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

export interface TInputForm<Type extends FieldValues> {
  form: UseFormReturn<Type, any, undefined>;
  name: Path<Type>;
  label: string;
}

export default function ColorFormPickerInput<T extends FieldValues>({ form, name, label }: TInputForm<T>) {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <div className="flex items-center gap-3">
            <FormControl>
              <Input type="color" {...field} className="w-12 h-10 p-1 cursor-pointer" />
            </FormControl>
            <Input {...field} className="flex-1" onChange={(e) => field.onChange(e.target.value)} />
          </div>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
