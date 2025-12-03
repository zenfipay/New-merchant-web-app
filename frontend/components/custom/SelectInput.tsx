'use client'

import { cn } from "@/utils";
import { Control, Controller, FieldValues, Path } from "react-hook-form";
import{
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from '@/components/ui/select';
import { Label } from "./Label";
import { ErrorInfo } from "@/app/auth/components/ErrorMessage";

interface SelectInputProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  trigger: string;
  data: string[];
  className?: string;
}

export function SelectInput<T extends FieldValues>({
  control,
  label,
  name,
  trigger,
  data,
  className,
}: SelectInputProps<T>) {
  return (
    <div className="flex flex-col gap-2">
        <Label htmlFor={name} text={label} />
        <Controller
            control={control}
            name={name}
            render={({ field, fieldState }) => (
                <>
                    <Select
                        onValueChange={field.onChange} 
                        value={field.value}
                    >
                        <SelectTrigger className={cn("w-full", className)}>
                            <SelectValue placeholder={trigger} />
                        </SelectTrigger>

                        <SelectContent>
                            {data.map((item) => (
                            <SelectItem key={item} value={item}>
                                {item}
                            </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <ErrorInfo message={fieldState.error?.message} />
                </>
            )}
        />
    </div>
  );
}
