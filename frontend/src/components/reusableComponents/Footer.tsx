import {
  FaLinkedin,
  FaFacebookSquare,
  FaGithubSquare,
  FaInstagram,
  FaTwitterSquare,
} from "react-icons/fa";
import FooterLinks from "./FooterLinks";
import SocialMediaIcon from "./SocialMediaIcon";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const solutions = [
    t("Analytics"),
    t("Marketing"),
    t("Commerce"),
    t("Insights"),
  ];
  const support = [
    t("Pricing"),
    t("Documentation"),
    t("Guides"),
    t("API_Status"),
  ];
  // const company = [t("about"), t("Blog"), t("Jobs"), t("Press"), t("Careers")];
  const legal = [t("Claim"), t("Policy"), t("Terms")];

  return (
    <div className="py-16 px-4 grid lg:grid-cols-3 gap-8 text-gray-800 dark:bg-slate-900">
      <div>
        <h1 className="w-full text-3xl font-bold text-blue-700">ONRTECH.</h1>
        <p className="dark:text-white py-4 font-bold text-l">
          {t("Description")}
        </p>
        <div className="flex justify-between md:w-[75%] my-6">
          <SocialMediaIcon Icon={FaFacebookSquare} />
          <SocialMediaIcon Icon={FaInstagram} />
          <SocialMediaIcon Icon={FaTwitterSquare} />
          <SocialMediaIcon Icon={FaGithubSquare} />
          <SocialMediaIcon Icon={FaLinkedin} />
        </div>
      </div>
      <div className="lg:col-span-2 flex justify-between mt-6">
        <FooterLinks linksList={solutions} sectionName={t("Solution")} />
        <FooterLinks linksList={support} sectionName={t("Support")} />
        {/* <FooterLinks linksList={company} sectionName={t("Company")} /> */}
        <FooterLinks linksList={legal} sectionName={t("Legal")} />
      </div>
    </div>
  );
};

export default Footer;
