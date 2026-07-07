import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
};

/** Consistent page gutter + max width across the whole site. */
export function Container({ children, className, as: Tag = "div" }: ContainerProps) {
  return <Tag className={cn("container-x", className)}>{children}</Tag>;
}
