import { Text } from "@/components/ui/text";

import { useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
} from "react-native";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Button, ButtonText } from "@/components/ui/button";
import { Box } from "@/components/ui/box";
import { useState } from "react";
import EditAlert from "../components/editAlert";
import { useProducts } from "../useProducts";
import { useForm, Controller } from "react-hook-form";
import { TProduct } from "@/types/TProduct";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { product } = useProducts({ productId: Number(id) });
  const { data, error, isLoading } = product;

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

  const onSubmit = (formData: Partial<TProduct>) => {
    console.log(formData);
  };

  if (error) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <Text>Product not found</Text>
      </VStack>
    );
  }

  if (isLoading) {
    return (
      <VStack className="flex-1 justify-center items-center">
        <ActivityIndicator size="large" color="#0000ff" />
      </VStack>
    );
  }

  return (
    <Box className="flex-1 justify-between bg-white">
      <EditAlert isOpen={isOpen} onClose={() => setIsOpen(false)} />
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
          onPress={handleSubmit(onSubmit)}
          className="flex-row bg-blue-500 rounded-lg px-4 py-2 mb-3"
        >
          <ButtonText>Salvar</ButtonText>
        </Button>
      </Box>
    </Box>
  );
};

export default Edit;
