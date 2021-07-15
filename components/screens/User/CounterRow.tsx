import useResponsive from "../../../utils/useResponsive";
import { Counter } from "./Counter";

export const CounterRow = () => {
  //
  const { isSmallMobile } = useResponsive();

  return (
    <div className="flex flex-row items-center justify-around flex-1 max-w-xs">
      {!isSmallMobile && <Counter count={0} label="Posts" />}
      <Counter count={0} label="Followers" href="/followers" />
      <Counter count={0} label="Following" href="/followers" />
    </div>
  );
};
