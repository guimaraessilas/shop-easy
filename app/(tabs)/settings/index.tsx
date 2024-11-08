import OptionItem from "@/components/optionItem";
import {
  Avatar,
  AvatarFallbackText,
  AvatarImage,
} from "@/components/ui/avatar";
import { Box } from "@/components/ui/box";
import { Button } from "@/components/ui/button";
import { Text } from "@/components/ui/text";
import { VStack } from "@/components/ui/vstack";

const Settings = () => {
  return (
    <Box className="flex-1">
      <Box className="h-[200px] bg-blue-500" />

      <VStack className="items-center -mt-20 ">
        <Avatar size="2xl">
          <AvatarFallbackText>Jane Doe</AvatarFallbackText>
          <AvatarImage
            source={{
              uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80",
            }}
          />
        </Avatar>

        <Text className="text-lg font-bold">João da Silva</Text>
        <Text className="text-textLight500">joaodasilva@gmail.com</Text>
      </VStack>

      <VStack className="m-4 ">
        <OptionItem icon="person" label="Meus dados" />
        <OptionItem icon="notifications" label="Notificações" />
        <OptionItem icon="document-text" label="Termos de uso" />
      </VStack>

      <Box className="px-5">
        <Button className="bg-red-500 rounded-lg">
          <Text className="text-white font-bold">Sair da conta</Text>
        </Button>
      </Box>
    </Box>
  );
};
export default Settings;
