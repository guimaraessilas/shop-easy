import { Text } from "@/components/ui/text";
import { TProduct } from "@/types/TProduct";
import { useLocalSearchParams } from "expo-router";
import products from "../../../mocks/products.json";
import { KeyboardAvoidingView, ScrollView } from "react-native";
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

const Edit = () => {
  const { id } = useLocalSearchParams();

  const product: TProduct | undefined = products.products.find(
    (p: TProduct) => p.id === Number(id)
  );

  if (!product) {
    return <Text>Product not found</Text>;
  }

  const [isOpen, setIsOpen] = useState(false);

  return (
    <Box className="flex-1 justify-between bg-white">
      <EditAlert isOpen={isOpen} onClose={() => setIsOpen(false)} />
      <KeyboardAvoidingView>
        <VStack className="m-3">
          <FormControl size="md" className="m-2">
            <FormControlLabel>
              <FormControlLabelText>Nome</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField
                type="text"
                keyboardType="default"
                returnKeyType="next"
              />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Descrição</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField type="text" multiline />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Preço (R$)</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField type="text" keyboardType="numeric" />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Desconto (%)</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField type="text" />
            </Input>
            <FormControlLabel>
              <FormControlLabelText>Url da imagem</FormControlLabelText>
            </FormControlLabel>
            <Input className="my-1">
              <InputField type="text" />
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
