import { clone } from "ramda";
import { useState, useEffect } from "react";
import * as yup from "yup";
import useValidation from "../useValidation";

const schema = yup.object().shape({
  email: yup
    .string()
    .trim()
    .required("Email is required")
    .email("Email is invalid"),
  password: yup.string().trim().required("Password is required")
});

const defaultFormValues = {
  email: "",
  password: ""
};

const DynamicLoginForm = () => {
  const [formValues, setFormValues] = useState(defaultFormValues);
  const { errors, handleFormSubmit, reValidate } = useValidation(
    schema,
    formValues
  );

  useEffect(() => {
    reValidate();
  }, [formValues]);

  const handleFieldChange = ({ target: { id, value } }) => {
    const newFormValues = clone(formValues);
    newFormValues[id] = value;
    setFormValues(newFormValues);
  };

  const handleSubmit = (values) => {
    console.log(values);
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e, handleSubmit)}>
      <h1>Dynamic Validations!</h1>
      <div>
        <label htmlFor="email">Email address</label>
        <input
          type="text"
          id="email"
          value={formValues.email}
          onChange={handleFieldChange}
        />
        {errors?.email}
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          id="password"
          value={formValues.password}
          onChange={handleFieldChange}
        />
        {errors?.password}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default DynamicLoginForm;
