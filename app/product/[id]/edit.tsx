import { Text } from "@/components/ui/text";
import { TProduct } from "@/types/TProduct";
import { useLocalSearchParams } from "expo-router";
import products from "../../../mocks/products.json";
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
import { numberToBLR } from "@/utils/numberToBLR";

const Edit = () => {
  const { id } = useLocalSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  const { product } = useProducts({ productId: Number(id) });
  const { data, error, isLoading } = product;

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
          <FormControl size="md" className="m-2">
            <FormControlLabel>
              <FormControlLabelText>Nome</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField value={data?.title} />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Descrição</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="text" multiline value={data?.description} />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Preço (R$)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                keyboardType="numeric"
                value={String(data?.price)}
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Desconto (%)</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField
                type="text"
                value={String(data?.discountPercentage)}
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Url da imagem</FormControlLabelText>
            </FormControlLabel>
            <Input>
              <InputField type="text" value={data?.thumbnail} />
            </Input>
          </FormControl>
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

export default Edit;
