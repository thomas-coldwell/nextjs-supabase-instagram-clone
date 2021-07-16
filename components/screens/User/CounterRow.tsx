import useResponsive from "../../../utils/useResponsive";
import { Counter } from "./Counter";

interface ICounterProps {
  _count: {
    followings: number;
    followers: number;
    posts: number;
  };
}

export const CounterRow = ({ _count }: ICounterProps) => {
  //
  const { isSmallMobile } = useResponsive();

  return (
    <div className="flex flex-row items-center justify-around flex-1 max-w-xs">
      {!isSmallMobile && <Counter count={_count.posts} label="Posts" />}
      <Counter count={_count.followers} label="Followers" href="/followers" />
      <Counter count={_count.followings} label="Following" href="/followers" />
    </div>
  );
};
