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

type DeleteAlertProps = {
  isOpen: boolean;
  onClose: () => void;
};

const DeleteAlert = ({ isOpen, onClose }: DeleteAlertProps) => {
  return (
    <AlertDialog isOpen={isOpen} onClose={onClose}>
      <AlertDialogBackdrop />
      <AlertDialogContent>
        <AlertDialogHeader>
          <Heading className="text-typography-950 font-semibold" size="md">
            Excluir Produto
          </Heading>
          <MaterialIcons
            onPress={onClose}
            name="close"
            size={20}
            color="#333"
          />
        </AlertDialogHeader>
        <AlertDialogBody className="mt-3 mb-4">
          <Text size="sm">
            Você tem certeza que deseja excluir esse produto? Essa ação não
            poderá ser desfeita.
          </Text>
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
          <Button onPress={onClose} size="sm" className="bg-red-500">
            <ButtonText>Excluir</ButtonText>
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAlert;
