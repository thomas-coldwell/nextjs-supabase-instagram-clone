import cn from "classnames";

interface IButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
}

export const Button = (props: IButtonProps) => {
  const { children, variant, className, ...rest } = props;
  return (
    <button
      className={cn(
        "flex items-center justify-center w-full h-12 rounded-md transition-all duration-300 hover:opacity-90",
        variant === "secondary" ? "bg-blue-400" : "bg-blue-600",
        props.disabled && "cursor-not-allowed opacity-50 transform-none",
        className
      )}
      {...rest}
    >
      <p className="font-medium text-white">{props.children}</p>
    </button>
  );
};
