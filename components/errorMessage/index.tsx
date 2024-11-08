import { VStack } from "@/components/ui/vstack";
import { Text } from "@/components/ui/text";

type TErrorMessage = {
  message: string;
};
const ErrorMessage = ({ message }: TErrorMessage) => {
  return (
    <VStack className="flex-1 justify-center items-center">
      <Text className="text-red-600 text-center">{message}</Text>
    </VStack>
  );
};
export default ErrorMessage;
