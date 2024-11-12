import ErrorMessage from "@/components/errorMessage";
import Loader from "@/components/loader";
import OptionItem from "@/components/optionItem";
import ConfirmationAlert from "@/components/confirmationModal";
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
import { router } from "expo-router";
import { useState } from "react";

const Settings = () => {
  const { isLoading, error } = useFindUserByToken();
  const { user, logout } = authStore((state) => state);

  const [isOpen, setIsOpen] = useState(false);

  const toggleAlertVisibility = () => setIsOpen(!isOpen);

  const handleLogout = () => {
    logout();
    router.replace("/login");
  };

  if (isLoading) {
    return <Loader />;
  }

  if (error && !user) {
    return <ErrorMessage message="Erro ao carregar dados do usuário." />;
  }

  return (
    <Box className="flex-1">
      <ConfirmationAlert
        action={handleLogout}
        actionText="Sair"
        actionType="warning"
        description="Você tem certeza que deseja sair da conta?"
        isOpen={isOpen}
        onClose={toggleAlertVisibility}
        title="Sair da conta"
      />
      <Box className="h-64 bg-blue-500" />

      <VStack
        className="flex-1"
        style={{
          backgroundColor: "white",
          marginTop: -20,
          borderTopRightRadius: 16,
          borderTopLeftRadius: 16,
        }}
      >
        <VStack className="items-center" style={{ marginTop: -60 }}>
          <Avatar size="2xl">
            <AvatarFallbackText>{`${user?.firstName} ${user?.lastName}`}</AvatarFallbackText>
            <AvatarImage
              source={{
                uri: user?.image,
              }}
            />
          </Avatar>
        </VStack>
        <VStack className="items-center mb-4">
          <Text className="text-lg font-bold">
            {`${user?.firstName} ${user?.lastName}`}
          </Text>
          <Text>{user?.email}</Text>
        </VStack>
        <VStack className="m-2">
          <OptionItem icon="person" label="Meus dados" />
          <OptionItem icon="notifications" label="Notificações" />
          <OptionItem icon="edit-document" label="Termos de uso" />
        </VStack>

        <Box className="m-2">
          <Button
            onPress={toggleAlertVisibility}
            className="bg-red-500 rounded-lg"
          >
            <Text className="text-typography-0 font-bold">Sair da conta</Text>
          </Button>
        </Box>
      </VStack>
    </Box>
  );
};
export default Settings;
