import { useState } from "react";
import Image from "next/image";
export default function InputField({
  Label = "",
  placeholder,
  setValue,
  value,
  editable = true,
}) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  return (
    <div className="flex flex-col  justify-start gap-4 w-full">
      <p className="   text-gray-800 font-bold ">{Label}</p>
      <div
      className="flex bg-[#E4E7E9] w-full text-sm items-center justify-between rounded-lg p-2 px-3"
       
      >
        <input
          className="  bg-transparent outline-none py-2 px-4 text-[#3F5065] w-full"
          
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          type={
            (Label == "Password" || Label == "Confirm Password") &&
            !showPassword
              ? "password"
              : "text"
          }
        />
        {(Label == "Password" || Label == "Confirm Password") && (
          <div
            onClick={() => togglePasswordVisibility()}
            
          >
            {showPassword ? (
              <Image
                width={20}
                height={20}
                alt="hide"
                src={"/assets/hide.png"}
              />
            ) : (
              <Image
                width={20}
                height={20}
                alt="hide"
                src={"/assets/show.png"}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
