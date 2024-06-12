import React, { ReactNode } from "react";
type Props = {
  icon: ReactNode;
  text: string;
};

const ContactDetail = ({ icon, text }: Props) => {
  return (
    <div className="flex flex-col items-center justify-center m-4 mt-8">
      <div className="text-sky-300 text-2xl lg:text-4xl">{icon}</div>
      <p className="text-slate-500 font-semibold text-xl dark:text-white">
        {text}
      </p>
    </div>
  );
};

export default ContactDetail;
