import { Button } from "@/components/ui/button";
import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Text } from "@/components/ui/text";

type OptionProps = {
  icon: keyof typeof MaterialIcons.glyphMap;
  label: string;
};

const OptionItem = ({ icon, label }: OptionProps) => (
  <Button
    variant="outline"
    className="flex-row items-center rounded-lg mb-4 border-[#BDBDBD]"
  >
    <MaterialIcons name={icon} size={24} color={"#454545"} />
    <Text className="flex-1 text-md text-textDark900">{label}</Text>
    <Ionicons name="chevron-forward" size={24} color={"#454545"} />
  </Button>
);

export default OptionItem;
