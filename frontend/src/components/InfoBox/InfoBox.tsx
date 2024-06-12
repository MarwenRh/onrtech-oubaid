import { ReactNode } from "react";

type Props = {
  bgColor: string;
  title: string;
  count: string;
  icon: ReactNode;
};

const InfoBox = ({ bgColor, title, count, icon }: Props) => {
  return (
    <div
      className={`${bgColor} mb-3 p-4 rounded-lg shadow-md flex items-center `}
    >
      <span className="text-white text-3xl p-4">{icon}</span>
      <div>
        <p className="text-white font-semibold">{title}</p>
        <h4 className="text-white text-2xl">{count}</h4>
      </div>
    </div>
  );
};

export default InfoBox;
