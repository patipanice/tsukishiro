import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { IAdviceForm } from "@/types";
import { PinIcon } from "./icons/PinIcon";

// Function to generate random hex color
const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// Function to create solid color with opacity
export const getRandomColorWithOpacity = (_color: string) => {
  const color = _color ? _color : getRandomColor();
  // const opacity = Math.random(); // Opacity between 0 and 1
  return `${color}${Math.round(60).toString(16).padStart(2, "0")}`;
};

interface IPostItCardProps {
  item: Pick<IAdviceForm,'name'|'id'|'message'| 'postColor'>;
  width?: number;
  onClickCardItemHandler: (id: string) => void;
}

const PostItCard: React.FC<IPostItCardProps> = ({
  item,
  width,
  onClickCardItemHandler,
}) => {
  return (
    <Card
      isPressable
      className="w-full cursor-pointer"
      key={item.id}
      onPress={() => {
        onClickCardItemHandler(item.id);
      }}
      style={{
        background: getRandomColorWithOpacity(item.postColor),
        width: width,
      }}
    >
      <CardHeader className="flex gap-3">
        <PinIcon />
      </CardHeader>
      <CardBody className="p-3 text-sm text-default-500 h-[150px]">
        <p className="font-light text-gray-800 dark:text-white line-clamp-8">
          {item.message}
        </p>
      </CardBody>
      <CardFooter>
        <p className="text-end font-light text-xs text-gray-500">
          {item.name || "ไม่ระบุตัวตน"} | {item.id.substring(0, 5)}
        </p>
      </CardFooter>
    </Card>
  );
};

export default PostItCard;
