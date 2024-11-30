import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <CircularProgress aria-label="Loading..."  label="กำลังโหลด" size="lg"/>
    </div>
  );
}
