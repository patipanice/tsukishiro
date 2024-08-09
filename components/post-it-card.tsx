import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/react";
import { IAdviceForm } from "@/types";

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

export const formattedDate = (date: any) => {
  if (!date) return "";

  const d = date?.toDate();

  // Helper function to pad single-digit numbers with leading zero
  const pad = (num: number) => num.toString().padStart(2, "0");

  const day = pad(d.getUTCDate());
  const month = pad(d.getUTCMonth() + 1); // Months are zero-based
  const year = d.getUTCFullYear();

  return `${day}-${month}-${year}`;
};

interface IPostItCardProps {
  item: Pick<
    IAdviceForm,
    "name" | "id" | "message" | "postColor" | "createdAt"
  >;
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
      className="w-full cursor-pointer"
      isPressable
      key={item.id}
      style={{
        background: getRandomColorWithOpacity(item.postColor),
        width: width,
      }}
      onPress={() => {
        onClickCardItemHandler(item.id);
      }}
    >
      <CardHeader className="flex gap-3"></CardHeader>
      <CardBody className="p-3 text-sm text-default-500 h-[150px]">
        <p className="font-light text-gray-800 dark:text-white line-clamp-8">
          {item.message}
        </p>
      </CardBody>
      <CardFooter>
        <div className="w-full flex items-center justify-between">
          <p className="text-end font-light text-xs text-gray-400">
            {item.name || "ไม่ระบุตัวตน"} | {item.id.substring(0, 5)}
          </p>
          <p className="text-xs font-light text-gray-400">
            {item?.createdAt && formattedDate(item?.createdAt)}
          </p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default PostItCard;
