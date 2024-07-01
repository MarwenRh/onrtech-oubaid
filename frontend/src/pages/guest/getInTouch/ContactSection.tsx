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

        {/* <div className="bg-blue-500 w-11/12 lg:w-2/6 lg:h-[600px] lg:rounded-b-none lg:rounded-r-lg rounded-b-lg p-4 text-center dark:bg-blue-700">
          <h2 className="text-3xl font-bold text-white mb-4">
            {t("Digital_Potential")}
          </h2>
          <p className="text-lg text-white mb-3">{t("transformingIdeas")}</p>
          <address className="text-blue-50 mb-3">
            <p>{t("line1")}</p>
            <p>{t("line2")}</p>
          </address>
          <div className="flex flex-wrap items-center justify-center mb-4">
            <div className="mr-6">
              <p className="text-gray-100">{t("phone1")}</p>
              <p className="text-gray-300">+33 7 50 21 83 96</p>
            </div>
            <div>
              <p className="text-gray-100">{t("phone2")}</p>
              <p className="text-gray-300">+33 6 25 98 27 27</p>
            </div>
          </div>
          <p className="text-gray-600 mb-4 text-lg dark:text-gray-800">
            {t("email")}
          </p>
        </div> */}
      </div>
    </div>
  );
};
export default ContactSection;
