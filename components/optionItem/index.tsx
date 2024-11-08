import { Button } from "@/components/ui/button";
import { Ionicons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

const OptionItem = ({ icon, label }: any) => (
  <Button
    variant="outline"
    className="flex-row items-center rounded-lg mb-4 border-[#BDBDBD]"
  >
    <Ionicons name={icon} size={24} color={"#454545"} />
    <Text className="flex-1 text-md text-textDark900">{label}</Text>
    <Ionicons name="chevron-forward" size={24} color={"#454545"} />
  </Button>
);

export default OptionItem;
