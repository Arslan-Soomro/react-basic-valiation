import useFormValidation from "../hooks/useFormValidation";

function SignupForm() {
  const { formData, isFormValid } = useFormValidation({
    initialFormData: {
      username: {
        required: {
          value: true,
          message: "Username is required",
        },
        minLength: {
          value: 3,
          message: "Username must be at least 3 characters",
        },
        maxLength: {
          value: 15,
          message: "Username must be less than 15 characters",
        },
      },
      password: {
        required: {
          value: true,
          message: "Password is required",
        },
        minLength: {
          value: 6,
          message: "Password must be at least 6 characters",
        },
        maxLength: {
          value: 15,
          message: "Password must be less than 15 characters",
        },
      },
    },
  });

  function handleSubmit(e) {
    e.preventDefault();
    if (isFormValid()) {
      alert("You Form is Submitted!");
      e.target.reset();
    } else {
      alert("Please resolve the errors in form");
    }
    console.log("FormData: ", formData);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          {...formData?.username?.handlers}
        />
        {formData?.username?.error ? <p>{formData.username?.error}</p> : null}
        <input
          name="password"
          placeholder="Password"
          {...formData?.password?.handlers}
        />
        {formData?.password?.error ? <p>{formData?.password?.error}</p> : null}
        <button type="submit">Signup</button>
      </form>
    </div>
  );
}

export default SignupForm;
