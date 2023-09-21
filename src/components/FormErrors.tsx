import { Errors } from "../models/Errors";

interface Props {
  errors: Errors;
}

const FormErrors = ({ errors }: Props) => {
  return (
    <>
      {errors && (
        <div className="alert">
          {Object.keys(errors).map((key) => (
            <p key={key}>{errors[key][0]}</p>
          ))}
        </div>
      )}
    </>
  );
};

export default FormErrors;
