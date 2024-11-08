import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import { FieldError, useForm } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, TextInputProps } from "react-native";
import { useState } from "react";
import ConfirmationAlert, {
  ConfirmationAlertProps,
} from "../../confirmationModal";
import FormField from "./formField";
import useProductFormInputs from "./useProductFormInputs";

type TProductProps = {
  data?: Partial<TProduct>;
  onSubmit: (data: Partial<TProduct>) => void;
};

const ProductForm = ({ data, onSubmit }: TProductProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isDirty },
  } = useForm<TProduct>({
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      price: data?.price || 0,
      discountPercentage: data?.discountPercentage || 0,
      thumbnail: data?.thumbnail || "",
    },
    mode: "onChange",
  });

  const buttonStyle = isValid && isDirty ? "bg-blue-500" : "bg-gray-500";

  const alertProps: ConfirmationAlertProps = {
    actionText: !data ? "Cadastrar" : "Editar",
    title: !data ? "Cadastrar Produto" : "Editar Produto",
    description: !data
      ? "Você tem certeza que deseja cadastrar esse produto? Essa ação não poderá ser desfeita."
      : "Você tem certeza que deseja editar esse produto? Essa ação não poderá ser desfeita.",
    isOpen: isOpen,
    action: handleSubmit(onSubmit),
    onClose: () => setIsOpen(false),
    actionType: "default",
  };

  const inputs = useProductFormInputs();

  return (
    <Box className="flex-1 justify-between bg-white">
      <ConfirmationAlert {...alertProps} />
      <KeyboardAvoidingView>
        <VStack className="m-3">
          <ScrollView>
            {inputs.map((input) => (
              <FormField
                key={input.name}
                name={input.name}
                label={input.label}
                control={control}
                error={errors[input.name] as FieldError}
                rules={input.rules}
                inputProps={{
                  ...input.inputProps,
                  ref: input.inputRef as React.RefObject<TextInputProps>,
                }}
              />
            ))}
          </ScrollView>
        </VStack>
      </KeyboardAvoidingView>

      <Box className="m-3">
        <Button
          disabled={!isValid || !isDirty}
          onPress={() => setIsOpen(true)}
          className={`flex-row rounded-lg px-4 py-2 mb-3 ${buttonStyle}`}
        >
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
