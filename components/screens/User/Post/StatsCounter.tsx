import { IconType } from "react-icons";

interface IStatsCounterProps {
  icon: IconType;
  count: number;
}

export const StatsCounter = ({ icon: Icon, count }: IStatsCounterProps) => {
  return (
    <div className="flex flex-row items-center m-1 text-white md:m-3">
      <Icon className="w-4 h-4 mr-1" />
      <p className="font-medium">{count}</p>
    </div>
  );
};
