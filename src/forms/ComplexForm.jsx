import { clone } from "ramda";
import { useEffect, useState } from "react";
import * as yup from "yup";
import useValidation from "../useValidation";

const schema = yup.object().shape({
  name: yup.string().trim().required("Name is required"),
  phoneNumbers: yup.array().of(
    yup.object({
      type: yup.string().trim().required("Type is required"),
      value: yup.string().trim().required("Number is required")
    })
  )
});

const defaultPhoneNumberObj = {
  type: "",
  value: ""
};

const defaultFormValues = {
  name: "",
  phoneNumbers: [clone(defaultPhoneNumberObj)]
};

const ComplexForm = () => {
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

  const handlePhoneNumberChange = (index, key, value) => {
    const newFormValues = clone(formValues);
    newFormValues.phoneNumbers = newFormValues.phoneNumbers.map(
      (number, ind) => {
        if (ind === index) number[key] = value;
        return number;
      }
    );
    setFormValues(newFormValues);
  };

  const handleSubmit = (values) => {
    console.log(values, "valid form!");
  };

  const addPhoneNumber = () => {
    const newFormValues = clone(formValues);
    newFormValues.phoneNumbers.push(defaultPhoneNumberObj);
    setFormValues(newFormValues);
  };

  const renderPhoneNumber = (phoneNumber, index) => {
    return (
      <div className="flex flex-column border p-2" key={index}>
        <div className="flex">
          <label className="w-50 text-right">Type</label>
          <div className="flex flex-column">
            <input
              type="text"
              id="phoneNumbers[type]"
              value={phoneNumber.type}
              onChange={(e) =>
                handlePhoneNumberChange(index, "type", e.target.value)
              }
            />
            {errors[`phoneNumbers[${index}].type`]}
          </div>
        </div>
        <div className="flex">
          <label className="w-50 text-right">Number</label>
          <div className="flex flex-column">
            <input
              type="text"
              id="phoneNumbers[value]"
              value={phoneNumber.value}
              onChange={(e) =>
                handlePhoneNumberChange(index, "value", e.target.value)
              }
            />
            {errors[`phoneNumbers[${index}].value`]}
          </div>
        </div>
      </div>
    );
  };

  return (
    <form onSubmit={(e) => handleFormSubmit(e, handleSubmit)}>
      <h1>Nested Form Validations!</h1>
      <div className="flex">
        <label className="w-200 text-right">Name</label>
        <div className="flex flex-column">
          <input
            type="text"
            id="name"
            value={formValues.name}
            onChange={handleFieldChange}
          />
          {errors?.name}
        </div>
      </div>
      <div className="flex">
        <label className="w-200 text-right">Phone Numbers</label>

        <div>
          {formValues.phoneNumbers.map((phoneNumber, index) =>
            renderPhoneNumber(phoneNumber, index)
          )}

          <div className="flex">
            <button type="button" onClick={addPhoneNumber}>
              + Phone Number
            </button>
          </div>
        </div>
      </div>
      <div className="flex">
        <label className="w-200 text-right"></label>
        <div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
};

export default ComplexForm;
