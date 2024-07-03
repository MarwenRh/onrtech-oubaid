import { ContactPage } from "./ContactPage";
import { FaPhoneAlt } from "react-icons/fa";
import ContactDetail from "./ContactDetail";
import { BiWorld } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaMagnifyingGlassLocation } from "react-icons/fa6";

const ContactSection = () => {
  return (
    <div className=" pt-8">
      <div className="mx-auto w-full ">
        <div className="bg-gray-200 w-11/12 lg:w-9/12  lg:h-[800px] rounded-lg shadow-md dark:bg-slate-500 mx-auto">
          {/* contact details */}
          <div className="flex w-full flex-wrap flex-row items-center justify-center lg:justify-evenly">
            <ContactDetail icon={<BiWorld />} text={"France"} />
            <ContactDetail
              icon={<FaMagnifyingGlassLocation />}
              text={"Villiers Sur Marne"}
            />
            <ContactDetail icon={<FaPhoneAlt />} text={"+33 7 50 21 83 96"} />
            <ContactDetail icon={<MdEmail />} text={"contact@onrtech.fr"} />
          </div>
          <ContactPage />
        </div>
      </div>
    </div>
  );
};
export default ContactSection;
