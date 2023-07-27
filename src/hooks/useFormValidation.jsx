import { useEffect, useState } from "react";
import { validate } from "../utils/validationUtils";

function useFormValidation({ initialFormData }) {
  const [formData, setFormData] = useState();

  useEffect(() => {
    const newFormData = {};
    for (const fieldName in initialFormData) {
      newFormData[fieldName] = {
        value: "",
        error: "",
        handlers: {
          onChange: (e) => {
            // Validate the New Value
            const inputValue = e.currentTarget.value;
            const inputError = validate(initialFormData[fieldName], inputValue);
            console.log(fieldName + " InputError: ", inputError);

            // Set The New Form Data
            newFormData[fieldName].value = inputValue;
            newFormData[fieldName].error = inputError;
            setFormData({ ...newFormData });
          },
        },
      };
    }
    setFormData(newFormData);
  }, []);

  function isFormValid() {
    console.log("onValidate is Running...");

    const inputErrors = [];

    for (const fieldName in initialFormData) {

      let inputValue = formData[fieldName].value;
      let inputError = formData[fieldName].error;

      if (inputError) {
        inputErrors.push({
          inputName: fieldName,
          errorMessage: inputError,
        });
      } else {
        inputError = validate(initialFormData[fieldName], inputValue);
        if (inputError) {
          inputErrors.push({
            inputName: fieldName,
            errorMessage: inputError,
          });
        }
      }
    }

    if (inputErrors?.length > 0) {
      const newFormData = { ...formData };

      for (const { inputName, errorMessage } of inputErrors) {
        newFormData[inputName].error = errorMessage;
      }

      setFormData(newFormData);
      return false;
    }

    return true;
  }

  return { formData, isFormValid };
}

export default useFormValidation;