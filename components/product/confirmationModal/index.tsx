import {
  AlertDialog,
  AlertDialogBackdrop,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Heading } from "@/components/ui/heading";
import React from "react";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";
import { Button, ButtonText } from "@/components/ui/button";

type ConfirmationAlertProps = {
  isOpen: boolean;
  onClose: () => void;
  action: () => void;
  title: string;
  description: string;
  actionType: "default" | "warning";
  actionText: string;
};

const ConfirmationAlert = ({
  isOpen,
  onClose,
  action,
  title,
  description,
  actionType,
  actionText,
}: ConfirmationAlertProps) => {
  const handleAction = () => {
    action();
    onClose();
  };

  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            {title}
          </Heading>
          <MaterialIcons
            onPress={onClose}
            name="close"
            size={20}
            color="#333"
          />
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">{description}</Text>
        </AlertDialogBody>
        <AlertDialogFooter className="">
          <Button
            onPress={onClose}
            variant="outline"
            action="secondary"
            size="sm"
          >
            <ButtonText>Cancelar</ButtonText>
          </Button>
          <Button
            onPress={handleAction}
            size="sm"
            className={actionType === "default" ? "bg-blue-500" : "bg-red-500"}
          >
            <ButtonText>{actionText}</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmationAlert;
