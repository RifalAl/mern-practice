import { Input, Textarea } from "@material-tailwind/react";

const InputField = ({
  formik,
  id,
  name,
  variant,
  label,
  placeholder,
  value,
  touched,
  error,
  isTextArea,
  type
}) => {
  return (
    <div>
      {isTextArea ? (
        <div className="mb-[-.5rem]">
          <Textarea
            id={id}
            name={name}
            variant={variant}
            label={label}
            placeholder={variant === "static" ? placeholder : ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value || ""}
            error={touched && error ? true : false}
            rows={6}
            labelProps={{className: "!text-[14px]"}}
          />
          {touched && error ? (
            <div className="text-xs text-red-600 ">{error}</div>
          ) : null}
        </div>
      ) : (
        <>
          <Input
            id={id}
            name={name}
            variant={variant}
            label={label}
            type={type}
            placeholder={variant === "static" ? placeholder : ""}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            value={value || ""}
            error={touched && error ? true : false}
            labelProps={{className: "!text-[14px]"}}
          />
          {touched && error ? (
            <div className="text-xs text-red-600 mt-1">{error}</div>
          ) : null}
        </>
      )}
    </div>
  );
};

export default InputField;
