import { useState } from "react";
import { IconType } from "react-icons";
import { MdArrowDropDown } from "react-icons/md";
import OutsideClickHandler from "react-outside-click-handler";
import { Option } from "./Option";

interface IDropdownProps {
  icon?: IconType;
  options: React.ComponentProps<typeof Option>[];
}

export const Dropdown = (props: IDropdownProps) => {
  //
  const { icon: Icon, options } = props;

  const [menuVisible, setMenuVisible] = useState(false);

  return (
    <OutsideClickHandler
      onOutsideClick={() => {
        if (menuVisible) setMenuVisible(false);
      }}
    >
      <div className="relative">
        <button onClick={() => setMenuVisible((vis) => !vis)}>
          {Icon ? (
            <Icon className="w-8 h-8 text-gray-400" />
          ) : (
            <MdArrowDropDown className="w-8 h-8 text-gray-400" />
          )}
        </button>
        {menuVisible && (
          <div className="absolute right-0 mt-3 overflow-hidden bg-white rounded-md shadow-md md:-right-2">
            {options.map((props) => (
              <Option key={props.text} {...props} />
            ))}
          </div>
        )}
      </div>
    </OutsideClickHandler>
  );
};
