import React from "react";

interface ILayoutProps extends React.HTMLProps<HTMLDivElement> {}

export const Layout = (props: ILayoutProps) => {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center w-screen max-w-4xl overflow-x-hidden">
        <div className="flex flex-col items-center w-full">
          {props.children}
        </div>
      </div>
    </div>
  );
};
