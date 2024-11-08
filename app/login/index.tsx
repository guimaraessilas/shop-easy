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
  KeyboardAvoidingView,
  ActivityIndicator,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  TextInputProps,
  ScrollView,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { useLogin } from "@/hooks/authentication/useLogin";

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
      <Box className="bg-blue-500 flex-1" />
      <Box className="bg-white flex-1" />
      <Box className="absolute" style={styles.content}>
        <Heading className="text-white text-center">
          Bem-vindo de volta!
        </Heading>
        <Text className="text-white text-center m-6">
          Insira seus dados para entrar na sua conta.
        </Text>
        <Card className="max-w-md p-6 bg-white rounded-lg shadow-lg w-full">
          <KeyboardAvoidingView behavior="padding">
            <VStack className="m-3">
              {error && (
                <Text className="text-red-500 text-center">
                  Username ou senha
                </Text>
              )}
              <FormControl size="md" className="m-2">
                <FormControlLabel>
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Controller
                  control={control}
                  name="username"
                  rules={{ required: "Username é obrigatório" }}
                  render={({ field: { onChange, onBlur, value } }) => (
                    <Input className="p-2">
                      <InputField
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        className="text-base"
                        returnKeyType="next"
                        onSubmitEditing={() =>
                          passwordInputRef.current?.focus()
                        }
                      />
                    </Input>
                  )}
                />
                {errors.username && (
                  <Text className="text-red-500">
                    {errors.username.message}
                  </Text>
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
                        ref={
                          passwordInputRef as React.LegacyRef<TextInputProps>
                        }
                        value={value}
                        onBlur={onBlur}
                        onChangeText={onChange}
                        secureTextEntry={!showPassword}
                        className="text-base flex-1"
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit(onSubmit)}
                      />
                      <TouchableOpacity
                        onPress={() => setShowPassword(!showPassword)}
                      >
                        <MaterialIcons
                          name={showPassword ? "visibility" : "visibility-off"}
                          size={24}
                          color="#333"
                        />
                      </TouchableOpacity>
                    </Input>
                  )}
                />
                {errors.password && (
                  <Text className="text-red-500">
                    {errors.password.message}
                  </Text>
                )}
              </FormControl>

              <Button
                onPress={handleSubmit(onSubmit)}
                size="sm"
                className="bg-blue-500 m-3 flex-row items-center justify-center"
                disabled={isLoading || !isValid}
              >
                {isLoading ? (
                  <ActivityIndicator color="#fff" />
                ) : (
                  <ButtonText>Entrar</ButtonText>
                )}
              </Button>
            </VStack>
          </KeyboardAvoidingView>
        </Card>
      </Box>
    </VStack>
  );
};

export default Login;

const styles = StyleSheet.create({
  content: {
    alignSelf: "center",
    top: Dimensions.get("window").height / 3.5,
    marginHorizontal: 20,
  },
});
