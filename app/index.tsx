import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import {
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
} from "@/components/ui/form-control";
import { Input, InputField } from "@/components/ui/input";
import { VStack } from "@/components/ui/vstack";
import { useNavigation } from "expo-router";
import { useEffect } from "react";

const Login = () => {
  const navigation = useNavigation();

  useEffect(() => {
    navigation.setOptions({ headerShown: false });
  }, [navigation]);

  return (
    <VStack className="flex-1 p-4 justify-center">
      <FormControl
        size="md"
        isDisabled={false}
        isReadOnly={false}
        isRequired={false}
      >
        <FormControlLabel>
          <FormControlLabelText>Password</FormControlLabelText>
        </FormControlLabel>
        <Input className="my-1">
          <InputField type="password" placeholder="password" />
        </Input>
      </FormControl>
      <Button className="w-fit self-end mt-4" size="sm">
        <ButtonText>Submit</ButtonText>
      </Button>
    </VStack>
  );
};

export default Login;
