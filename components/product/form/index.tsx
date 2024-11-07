import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Text } from "@/components/ui/text";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useForm, Controller } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView } from "react-native";
import { useState } from "react";
import ConfirmationAlert from "../confirmationModal";

type TProductProps = {
  data?: TProduct;
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

  return (
    <Box className="flex-1 justify-between bg-white">
      <ConfirmationAlert
        isOpen={isOpen}
        action={handleSubmit(onSubmit)}
        onClose={() => setIsOpen(false)}
        actionText="Editar"
        actionType="default"
        title="Editar Produto"
        description="Você tem certeza que deseja editar esse produto? Essa ação não poderá ser desfeita."
      />
      <KeyboardAvoidingView>
        <VStack className="m-3">
          <ScrollView>
            <FormControl size="md" className="m-2">
              <FormControlLabel>
                <FormControlLabelText>Nome</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="title"
                rules={{ required: "Nome é obrigatório" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="my-1">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              {errors.title && (
                <Text className="text-red-500">{errors.title.message}</Text>
              )}

              <FormControlLabel>
                <FormControlLabelText>Descrição</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="description"
                rules={{ required: "Descrição é obrigatória" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="my-1">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                      returnKeyType="next"
                      multiline
                    />
                  </Input>
                )}
              />
              {errors.description && (
                <Text className="text-red-500">
                  {errors.description.message}
                </Text>
              )}

              <FormControlLabel>
                <FormControlLabelText>Preço (R$)</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="price"
                rules={{ required: "Preço é obrigatório" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="my-1">
                    <InputField
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={String(value)}
                      keyboardType="numeric"
                      returnKeyType="next"
                    />
                  </Input>
                )}
              />
              {errors.price && (
                <Text className="text-red-500">{errors.price.message}</Text>
              )}

              <FormControlLabel>
                <FormControlLabelText>Desconto (%)</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="discountPercentage"
                rules={{ required: "Desconto é obrigatório" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="my-1">
                    <InputField
                      returnKeyType="next"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={String(value)}
                    />
                  </Input>
                )}
              />
              {errors.discountPercentage && (
                <Text className="text-red-500">
                  {errors.discountPercentage.message}
                </Text>
              )}

              <FormControlLabel>
                <FormControlLabelText>Url da imagem</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="thumbnail"
                rules={{ required: "Url da imagem é obrigatória" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="my-1">
                    <InputField
                      returnKeyType="next"
                      onChangeText={onChange}
                      onBlur={onBlur}
                      value={value}
                    />
                  </Input>
                )}
              />
              {errors.thumbnail && (
                <Text className="text-red-500">{errors.thumbnail.message}</Text>
              )}
            </FormControl>
          </ScrollView>
        </VStack>
      </KeyboardAvoidingView>

      <Box className="m-3">
        <Button
          disabled={!isValid && isDirty}
          onPress={() => setIsOpen(true)}
          className={`flex-row rounded-lg px-4 py-2 mb-3 ${
            isValid && isDirty ? "bg-blue-500" : "bg-gray-500"
          }`}
        >
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
