import { RefObject, useRef } from "react";
import { KeyboardType, ReturnKeyTypeOptions, TextInput } from "react-native";
import { validationRules } from "./validationRules";

type InputFieldProps = {
  name: keyof TProduct;
  label: string;
  inputRef?: RefObject<TextInput>;
  rules: any;
  inputProps: Record<string, any>;
};

const useProductFormInputs = (): InputFieldProps[] => {
  const descriptionRef = useRef<TextInput>(null);
  const priceRef = useRef<TextInput>(null);
  const discountPercentageRef = useRef<TextInput>(null);
  const thumbnailRef = useRef<TextInput>(null);

  return [
    {
      name: "title",
      label: "Nome",
      rules: validationRules.title,
      inputProps: {
        returnKeyType: "next" as ReturnKeyTypeOptions,
        onSubmitEditing: () => descriptionRef.current?.focus(),
      },
    },
    {
      name: "description",
      label: "Descrição",
      inputRef: descriptionRef,
      rules: validationRules.description,
      inputProps: {
        returnKeyType: "next" as ReturnKeyTypeOptions,
        multiline: true,
        onSubmitEditing: () => priceRef.current?.focus(),
      },
    },
    {
      name: "price",
      label: "Preço (R$)",
      inputRef: priceRef,
      rules: validationRules.price,
      inputProps: {
        keyboardType: "numeric" as KeyboardType,
        returnKeyType: "done" as ReturnKeyTypeOptions,
        onSubmitEditing: () => discountPercentageRef.current?.focus(),
      },
    },
    {
      name: "discountPercentage",
      label: "Desconto (%)",
      inputRef: discountPercentageRef,
      rules: validationRules.discountPercentage,
      inputProps: {
        keyboardType: "numeric" as KeyboardType,
        returnKeyType: "done" as ReturnKeyTypeOptions,
        onSubmitEditing: () => thumbnailRef.current?.focus(),
      },
    },
    {
      name: "thumbnail",
      label: "Url da imagem",
      inputRef: thumbnailRef,
      rules: validationRules.thumbnail,
      inputProps: {
        returnKeyType: "done" as ReturnKeyTypeOptions,
        onSubmitEditing: () => descriptionRef.current?.blur(),
      },
    },
  ];
};

export default useProductFormInputs;
