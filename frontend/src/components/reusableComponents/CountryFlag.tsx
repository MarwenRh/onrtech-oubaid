import ReactCountryFlag from "react-country-flag";
type props = {
  code: string;
};
const Flag = ({ code }: props) => {
  return (
    <ReactCountryFlag
      className="pr-1 "
      style={{
        fontSize: "1.5em",
        lineHeight: "1.5em",
      }}
      countryCode={code}
      svg
    />
  );
};

export default Flag;
