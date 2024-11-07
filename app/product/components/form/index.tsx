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
    formState: { errors },
  } = useForm<TProduct>({
    defaultValues: {
      title: data?.title || "",
      description: data?.description || "",
      price: data?.price || 0,
      discountPercentage: data?.discountPercentage || 0,
      thumbnail: data?.thumbnail || "",
    },
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
                <Text className="text-red-500">Nome é obrigatório</Text>
              )}

              <FormControlLabel>
                <FormControlLabelText>Descrição</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="description"
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

              <FormControlLabel>
                <FormControlLabelText>Preço (R$)</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="price"
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

              <FormControlLabel>
                <FormControlLabelText>Desconto (%)</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="discountPercentage"
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

              <FormControlLabel>
                <FormControlLabelText>Url da imagem</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="thumbnail"
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
            </FormControl>
          </ScrollView>
        </VStack>
      </KeyboardAvoidingView>

      <Box className="m-3">
        <Button
          onPress={() => setIsOpen(true)}
          className="flex-row bg-blue-500 rounded-lg px-4 py-2 mb-3"
        >
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default ProductForm;
