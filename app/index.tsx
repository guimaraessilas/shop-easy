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
import { Link, useNavigation, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { Dimensions, KeyboardAvoidingView } from "react-native";
import { authAPI, TUser } from "@/api/auth";

const Login = () => {
  const navigation = useNavigation();
  const router = useRouter();
  const [username, setUsername] = useState("emilys");
  const [password, setPassword] = useState("emilyspass");

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  const handleSubmit = async () => {
    const user: TUser = await authAPI.login({
      username,
      password,
    });
    console.log("USER: ", user);
    if (user.id) {
      router.push("product/list");
    } else {
      alert("Credenciais inválidas");
    }
  };

  return (
    <VStack className="flex-1">
      <Box className="bg-blue-500 flex-1" />
      <Box className="bg-white flex-1" />
      <Box
        className="absolute"
        style={{
          alignSelf: "center",
          top: Dimensions.get("window").height / 3.5,
          marginHorizontal: 20,
        }}
      >
        <Heading className="text-white text-center">
          Bem-vindo de volta!
        </Heading>
        <Text className="text-white text-center m-6">
          Insira seus dados para entrar na sua conta.
        </Text>
        <Card className="max-w-md p-6 bg-white rounded-lg shadow-lg w-full">
          <KeyboardAvoidingView>
            <VStack className="m-3">
              <FormControl size="md" className="m-2">
                <FormControlLabel>
                  <FormControlLabelText>Username</FormControlLabelText>
                </FormControlLabel>
                <Input className="p-2">
                  <InputField
                    type="text"
                    keyboardType="default"
                    returnKeyType="next"
                    value={username}
                    onChangeText={(text) => setUsername(text)}
                  />
                </Input>
                <FormControlLabel>
                  <FormControlLabelText>Senha</FormControlLabelText>
                </FormControlLabel>
                <Input className="p-2">
                  <InputField
                    type={"text"}
                    value={password}
                    onChangeText={(text) => setPassword(text)}
                  />
                  <MaterialIcons size={20} color="#333" />
                </Input>
              </FormControl>

              <Button
                onPress={handleSubmit}
                size="sm"
                className="bg-blue-500 m-3"
              >
                <ButtonText>Entrar</ButtonText>
              </Button>
            </VStack>
          </KeyboardAvoidingView>
        </Card>
      </Box>
    </VStack>
  );
};

export default Login;
