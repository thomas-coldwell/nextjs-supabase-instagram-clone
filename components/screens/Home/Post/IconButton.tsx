import { IconType } from "react-icons";

interface IIconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
  icon: IconType;
}

export const IconButton = (props: IIconButtonProps) => {
  const { icon: Icon, children, ...rest } = props;
  return (
    <button className="mr-2 text-gray-300 hover:opacity-80" {...rest}>
      <Icon className="w-8 h-8" />
    </button>
  );
};
