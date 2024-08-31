import { PostStatus, PostType } from "@/enums/post.enum";
import { SVGProps } from "react";
import { CommentForm } from "./comment.interface";

export type IconSvgProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

export interface BasicInformationFormValues {
  message: string;
  name: string;
  age: number;
  gender: number;
  status: PostStatus;
  isPublish: boolean;
  postColor: string;
  userId?: string;
  createdAt: Date;
  updatedAt?: Date;
}

export interface IAdviceForm extends BasicInformationFormValues {
  id: string;
  feeling: number;
  period: number;
  comments?: CommentForm[]
}

export interface TopicFormValues extends BasicInformationFormValues {
  postType: PostType.TOPIC;
}

export interface QAFormValues extends BasicInformationFormValues {
  postType: PostType.QA;
}
