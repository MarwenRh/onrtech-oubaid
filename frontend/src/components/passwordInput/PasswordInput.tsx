import React, { useState } from "react";
import { BiHide, BiShow } from "react-icons/bi";

type Props = {
  placeholder: string;
  value: string;
  name: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onPaste?: (event: React.ClipboardEvent<HTMLInputElement>) => void;
};

const PasswordInput = ({
  placeholder,
  value,
  onChange,
  name,
  onPaste,
}: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  // Use a local variable to store the input type
  const inputType = showPassword ? "text" : "password";

  return (
    <div className="flex items-center relative border rounded w-full mb-4">
      <input
        type={inputType}
        required
        name={name}
        value={value}
        placeholder={placeholder}
        className="px-4 py-2 w-full"
        onChange={onChange}
        onPaste={onPaste}
      />
      <div
        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-700"
        onClick={() => setShowPassword(!showPassword)}
      >
        {showPassword ? <BiHide size={25} /> : <BiShow size={25} />}
      </div>
    </div>
  );
};

export default PasswordInput;
