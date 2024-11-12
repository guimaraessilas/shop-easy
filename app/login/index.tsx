import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FormControl,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { MaterialIcons } from "@expo/vector-icons";
import { Heading } from "@/components/ui/heading";
import { Input, InputField } from "@/components/ui/input";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";
import { useNavigation } from "expo-router";
import { useEffect, useRef, useState } from "react";
import {
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TextInputProps,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "@/hooks/authentication/useLogin";
import { HStack } from "@/components/ui/hstack";

const Login = () => {
  const navigation = useNavigation();
  const [showPassword, setShowPassword] = useState(false);

  const passwordInputRef = useRef<TextInput>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TAuth>({
    defaultValues: {
      password: "",
      username: "",
    },
    mode: "onBlur",
  });

  const { mutate, isPending: isLoading, error } = useLogin();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const onSubmit = (data: TAuth) => {
    mutate(data);
  };

  return (
    <VStack onTouchStart={() => Keyboard.dismiss()} className="flex-1">
      <Box className="bg-blue-500" style={styles.topColor} />

      <Box className="absolute" style={styles.content}>
        <VStack style={{ marginBottom: 30 }}>
          <Heading className="text-center text-typography-0">
            Bem-vindo de volta!
          </Heading>
          <Text className="text-typography-0 text-center m-6">
            Insira seus dados para entrar na sua conta.
          </Text>
        </VStack>
        <Card className="p-6 rounded-lg shadow-lg w-full">
          <VStack className="m-3">
            {error && (
              <Text className="text-red-500 text-center">
                Username ou senha inválidos
              </Text>
            )}
            <FormControl size="md">
              <FormControlLabel>
                <FormControlLabelText>Username</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="username"
                rules={{ required: "Username é obrigatório" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input>
                    <InputField
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      returnKeyType="next"
                      onSubmitEditing={() => passwordInputRef.current?.focus()}
                    />
                  </Input>
                )}
              />
              {errors.username && (
                <HStack className="items-center">
                  <MaterialIcons name="error-outline" size={16} color="#f00" />
                  <Text className="text-red-500 flex-row items-center ml-2">
                    Campo obrigatório
                  </Text>
                </HStack>
              )}

              <FormControlLabel>
                <FormControlLabelText>Senha</FormControlLabelText>
              </FormControlLabel>
              <Controller
                control={control}
                name="password"
                rules={{ required: "Senha é obrigatória" }}
                render={({ field: { onChange, onBlur, value } }) => (
                  <Input className="p-2 flex-row items-center">
                    <InputField
                      ref={passwordInputRef as React.LegacyRef<TextInputProps>}
                      value={value}
                      onBlur={onBlur}
                      onChangeText={onChange}
                      returnKeyType="done"
                      type={showPassword ? "text" : "password"}
                      onSubmitEditing={handleSubmit(onSubmit)}
                    />
                    <TouchableOpacity
                      onPress={() => setShowPassword(!showPassword)}
                    >
                      <MaterialIcons
                        name={showPassword ? "visibility" : "visibility-off"}
                        size={20}
                        color="#333"
                      />
                    </TouchableOpacity>
                  </Input>
                )}
              />
              {errors.password && (
                <HStack className="items-center">
                  <MaterialIcons name="error-outline" size={16} color="#f00" />
                  <Text className="text-red-500 flex-row items-center ml-2">
                    Campo obrigatório
                  </Text>
                </HStack>
              )}
            </FormControl>

            <Button
              onPress={handleSubmit(onSubmit)}
              size="sm"
              className="bg-blue-500 flex-row items-center justify-center"
              disabled={isLoading || !isValid}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <ButtonText>Entrar</ButtonText>
              )}
            </Button>
          </VStack>
        </Card>
      </Box>
    </VStack>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    top: "30%",
  },
  topColor: {
    height: "50%",
  },
});
