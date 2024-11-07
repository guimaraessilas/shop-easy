import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { InputField, Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Control, FieldError, Controller } from "react-hook-form";

type FormFieldProps = {
  name: keyof TProduct;
  label: string;
  control: Control<TProduct>;
  error?: FieldError;
  rules: any;
  inputProps?: Partial<React.ComponentProps<typeof InputField>>;
};

const FormField = ({
  name,
  label,
  control,
  error,
  rules,
  inputProps,
}: FormFieldProps) => (
  <FormControl size="md" className="m-2">
    <FormControlLabel>
      <FormControlLabelText>{label}</FormControlLabelText>
    </FormControlLabel>
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <Input className="my-1">
          <InputField
            onChangeText={onChange}
            onBlur={onBlur}
            value={String(value)}
            {...inputProps}
          />
        </Input>
      )}
    />
    {error && <Text className="text-red-500">{error.message}</Text>}
  </FormControl>
);

export default FormField;
