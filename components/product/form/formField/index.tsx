import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { InputField, Input } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { Textarea, TextareaInput } from "@/components/ui/textarea";
import {
  Control,
  FieldError,
  Controller,
  RegisterOptions,
} from "react-hook-form";
import { TextInputProps } from "react-native";

type FormFieldProps = {
  name: keyof TProduct;
  label: string;
  control: Control<TProduct>;
  error?: FieldError;
  rules: Omit<
    RegisterOptions<TProduct, keyof TProduct>,
    "valueAsNumber" | "valueAsDate" | "setValueAs" | "disabled"
  >;
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
      render={({ field: { onChange, onBlur, value } }) => {
        {
          return inputProps?.multiline ? (
            <Textarea size="md">
              <TextareaInput
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
                {...(inputProps as TextInputProps)}
              />
            </Textarea>
          ) : (
            <Input className="my-1">
              <InputField
                onChangeText={onChange}
                onBlur={onBlur}
                value={String(value)}
                {...inputProps}
              />
            </Input>
          );
        }
      }}
    />
    {error && <Text className="text-red-500">{error.message}</Text>}
  </FormControl>
);

export default FormField;
