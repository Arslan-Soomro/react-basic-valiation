export function validate(inputRules, inputValue) {

    let inputError = "";

    for( const rule in inputRules){
        if (rule === "required" && inputValue?.length === 0) {
            inputError = inputRules[rule].message || "This field is required";
        }else if(rule === "minLength" && inputValue?.length < inputRules[rule].value){
            inputError = inputRules[rule].message || `This field must be at least ${inputRules[rule].value} characters long`;
        }else if(rule === "maxLength" && inputValue?.length > inputRules[rule].value){
            inputError = inputRules[rule].message || `This field must be less than ${inputRules[rule].value} characters long`;
        }else if(rule === "pattern" && !inputRules[rule].value.test(inputValue)){
            inputError = inputRules[rule].message || "This field is invalid";
        }
    }

    return inputError;
}