import { useState } from "react";
import { mergeAll } from "ramda";

const useValidation = (schema, formValues) => {
  const [errors, setErrors] = useState({});
  const [isValidating, setIsValidating] = useState(false);

  const handleFormSubmit = (event, successCallback) => {
    event.preventDefault();

    if (!isValidating) setIsValidating(true);

    schema
      .validate(formValues, { abortEarly: false })
      .then(() => {
        setErrors({});
        successCallback(formValues);
      })
      .catch((err) => {
        if (err.name === "ValidationError") {
          const errs = mergeAll(
            err.inner.flatMap((e) => ({ [e.path]: e.errors }))
          );
          setErrors(errs);
        }
      });
  };

  const reValidate = () => {
    if (!isValidating) return;

    try {
      schema.validateSync(formValues, { abortEarly: false });
      setErrors({});
      return true;
    } catch (err) {
      if (err.name === "ValidationError") {
        const errs = mergeAll(
          err.inner.flatMap((e) => ({ [e.path]: e.errors }))
        );
        setErrors(errs);
        return false;
      }
    }
  };

  const resetValidation = () => {
    setIsValidating(false);
    setErrors({});
  };

  return {
    errors,
    reValidate,
    handleFormSubmit,
    resetValidation
  };
};

export default useValidation;
