import { PostStatus } from "@/enums/post.enum";
import { SVGProps } from "react";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface IAdviceForm {
  id: string;
  name: string;
  age: number;
  message: string;
  gender: number;
  feeling: number;
  period: number;
  status: PostStatus
  isPublish: boolean;
  createdAt: Date;
  postColor: string
}
