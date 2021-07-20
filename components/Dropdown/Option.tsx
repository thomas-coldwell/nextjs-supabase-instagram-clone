import classNames from "classnames";

interface IOptionProps extends React.HTMLAttributes<HTMLButtonElement> {
  type?: "destructive" | "normal";
  text: string;
}

export const Option = (props: IOptionProps) => {
  //
  const { type = "normal", text, ...rest } = props;

  return (
    <button
      className={classNames(
        "w-full px-4 py-2 text-sm font-medium text-left transition duration-300 whitespace-nowrap hover:text-white",
        type === "normal" ? "hover:bg-blue-400" : "hover:bg-red-400"
      )}
      {...rest}
    >
      {text}
    </button>
  );
};
