import { useRouter } from "next/router";
import Link from "next/link";
import classNames from "classnames";

interface ICounterProps {
  count: number;
  label: string;
  href?: string;
}

export const Counter = (props: ICounterProps) => {
  //
  const { count, label, href } = props;

  const router = useRouter();

  return (
    <button
      className={classNames(
        "flex flex-col items-center justify-center px-2 bg-white border border-white rounded-md h-14 cursor-default",
        href &&
          "transition hover:shadow-md hover:border-blue-300 cursor-pointer"
      )}
      onClick={() => href && router.push(href)}
    >
      <p className="font-medium">{count}</p>
      <p className="text-sm text-gray-800">{label}</p>
    </button>
  );
};
