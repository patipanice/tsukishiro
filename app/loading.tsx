import { CircularProgress } from "@nextui-org/progress";

export default function Loading() {
    // You can add any UI inside Loading, including a Skeleton.
    return <div><CircularProgress aria-label="Loading..."/></div>
  }