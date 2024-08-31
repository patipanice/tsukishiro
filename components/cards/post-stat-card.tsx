import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
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

  // Convert Firestore Timestamp to JavaScript Date
  const d = date?.toDate();

  // Create a formatter for the Thai locale and timezone
  const options: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false, // Use 24-hour time format
    timeZone: "Asia/Bangkok", // Thailand time zone
  };

  const formatter = new Intl.DateTimeFormat("th-TH", options);
  const formatted = formatter.format(d);

  // Replace default formatting with desired format "dd-mm-yyyy HH:mm"
  return formatted.replace(/\//g, "/").replace(",", "");
};

interface IPostItCardProps {
  item: {
    month: string;
    id: string;
  };
  width?: number;
  isYourPost: boolean;
  onClickCardItemHandler: (id: string) => void;
}

const PostStatCard: React.FC<IPostItCardProps> = ({
  item,
  width,
  onClickCardItemHandler,
}) => {
  return (
    <Card
      className={`w-full cursor-pointer`}
      isPressable
      key={item.id}
      style={{
        // background: getRandomColorWithOpacity(item.postColor),
        width: width,
        backgroundImage: `url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?q=80&w=2946&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
      }}
      //   onPress={() => {
      //     onClickCardItemHandler(item.id);
      //   }}
    >
      <CardHeader className=""></CardHeader>
      <CardBody className="p-3 text-sm text-default-500 h-[150px] flex items-center justify-center justify-items-center">
        <p className="font-light text-xl text-gray-800 dark:text-white line-clamp-8">
          {item.month}
        </p>
      </CardBody>
      <CardFooter></CardFooter>
    </Card>
  );
};

export default PostStatCard;
