interface IInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const Input = (props: IInputProps) => {
  const { className, ...rest } = props;
  return (
    <input
      className={`w-full h-10 rounded-md border-2 border-gray-200 p-2 outline-none focus:border-blue-500 mb-4 ${className}`}
      {...rest}
    />
  );
};
