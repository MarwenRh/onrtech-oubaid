import React from "react";

interface SocialMediaIconProps {
  Icon: React.ElementType;
}

const SocialMediaIcon: React.FC<SocialMediaIconProps> = ({ Icon }) => {
  return (
    <div>
      <Icon
        size={30}
        className="dark:text-white dark:hover:text-blue4 hover:cursor-pointer hover:text-blue-600"
      />
    </div>
  );
};

export default SocialMediaIcon;
