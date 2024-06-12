import { FieldError } from "react-hook-form";
type Props = {
  fieldError: FieldError | undefined;
};
const ValidationError = ({ fieldError }: Props) => {
  if (!fieldError) {
    return null;
  } else {
    return (
      <div role="alert" className="text-red-500 text-xs mt-1">
        {fieldError.message}
      </div>
    );
  }
};

export default ValidationError;
