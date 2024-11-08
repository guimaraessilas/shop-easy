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
import { useFindUserByToken } from "@/hooks/authentication/useFindUserByToken";
import { authStore } from "@/store/authStore";

const Settings = () => {
  const { data } = useFindUserByToken();
  const { user, logout } = authStore((state) => state);

  return (
    <Box className="flex-1">
      <Box className="h-[240px] bg-blue-500" />

      <VStack className="rounded-t-xl bg-white -mt-20">
        <VStack className="items-center -mt-20">
          <Avatar size="2xl">
            <AvatarFallbackText>{`${user?.firstName} ${user?.lastName}`}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.image,
              }}
            />
          </Avatar>
        </VStack>
        <VStack className="items-center">
          <Text className="text-lg font-bold">
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Text className="text-textLight500">{user?.email}</Text>
        </VStack>
        <VStack className="m-4">
          <OptionItem icon="person" label="Meus dados" />
          <OptionItem icon="notifications" label="Notificações" />
          <OptionItem icon="document-text" label="Termos de uso" />
        </VStack>

        <Box className="px-5">
          <Button onPress={() => logout()} className="bg-red-500 rounded-lg">
            <Text className="text-white font-bold">Sair da conta</Text>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
export default Settings;
