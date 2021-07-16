interface ITextareaProps
  extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {}

export const Textarea = (props: ITextareaProps) => {
  const { className, ...rest } = props;
  return (
    <textarea
      className={`w-full h-10 rounded-md border-2 border-gray-200 p-2 outline-none focus:border-blue-500 mb-4 ${className}`}
      {...rest}
    />
  );
};
