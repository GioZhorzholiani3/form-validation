//!example with useState and without hooks
// import React, { useState } from "react";
// import useInput from "../hooks/use-input";

// const SimpleInput = (props) => {
//   const [enteredName, setEnteredName] = useState("");
//   // const [enteredNameIsValid, setEnteredNameIsValid] = useState(false);
//   const [enteredNameTouched, setenteredNameTouched] = useState(false);

//   const [enteredEmail, setEnteredEmail] = useState("");

//   const [enteredEmailTouched, setenteredEmailTouched] = useState(false);

//   const enteredEmailIsValid = enteredEmail.includes("@");

//   const EmailInputIsInvalid = !enteredEmailIsValid && enteredEmailTouched;

//   const enteredNameIsValid = enteredName.trim() !== "";

//   const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;

//   let formIsValid = false;

//   if (enteredNameIsValid && enteredEmailIsValid) {
//     formIsValid = true;
//   }

//   const emailChangeHandler = (event) => {
//     setEnteredEmail(event.target.value);
//   };

//   const emailInputBlurHandler = (event) => {
//     setenteredEmailTouched(true);
//   };

//   const inputChangeHandler = (event) => {
//     setEnteredName(event.target.value);
//   };

//   const nameInputBlurHandler = (event) => {
//     setenteredNameTouched(true);
//   };

//   const formSubmissionHandler = (event) => {
//     event.preventDefault();
//     setenteredNameTouched(true);

//     setenteredEmailTouched(true);

//     if (!enteredNameIsValid || !enteredEmailIsValid) {
//       return;
//     }

//     console.log(enteredName);
//     console.log(enteredEmail);
//     setEnteredName("");
//     setEnteredEmail("");
//     setenteredNameTouched(false);
//     setenteredEmailTouched(false);
//   };

//   const nameInputClasses = nameInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";

//   const emailInputClasses = EmailInputIsInvalid
//     ? "form-control invalid"
//     : "form-control";
//   return (
//     <form onSubmit={formSubmissionHandler}>
//       <div className={nameInputClasses}>
//         <label htmlFor="name">Your Name</label>
//         <input
//           type="text"
//           id="name"
//           onChange={inputChangeHandler}
//           onBlur={nameInputBlurHandler}
//           value={enteredName}
//         />
//         {nameInputIsInvalid && (
//           <p className="error-text">please fill the name filed</p>
//         )}
//       </div>

//       <div className={emailInputClasses}>
//         <label htmlFor="name">Your Email</label>
//         <input
//           type="email"
//           id="email"
//           onChange={emailChangeHandler}
//           onBlur={emailInputBlurHandler}
//           value={enteredEmail}
//         />
//         {EmailInputIsInvalid && (
//           <p className="error-text">please fill the email filed</p>
//         )}
//       </div>
//       <div className="form-actions">
//         <button disabled={!formIsValid}>Submit</button>
//       </div>
//     </form>
//   );
// };

// export default SimpleInput;

//!example with useRef
// import React, { useRef } from "react";

// const SimpleInput = (props) => {
//   const nameInputRef = useRef();

//   const formSubmissionHandler = (event) => {
//     event.preventDefault();
//     const enteredValue = nameInputRef.current.value;

//     console.log(enteredValue);

//     nameInputRef.current.value = "";
//   };
//   return (
//     <form onSubmit={formSubmissionHandler}>
//       <div className="form-control">
//         <label htmlFor="name">Your Name</label>
//         <input ref={nameInputRef} type="text" id="name" />
//       </div>
//       <div className="form-actions">
//         <button>Submit</button>
//       </div>
//     </form>
//   );
// };

// export default SimpleInput;

//

import useInput from "../hooks/use-input";

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");

  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));

  let formIsValid = false;

  if (enteredNameIsValid && enteredEmailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!enteredNameIsValid || !enteredEmailIsValid) {
      return;
    }

    console.log(enteredName);
    console.log(enteredEmail);
    resetNameInput();
    resetEmailInput();
  };

  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";

  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  return (
    <form onSubmit={formSubmissionHandler}>
      <div className={nameInputClasses}>
        <label htmlFor="name">Your Name</label>
        <input
          type="text"
          id="name"
          onChange={nameChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && (
          <p className="error-text">please fill the name filed</p>
        )}
      </div>

      <div className={emailInputClasses}>
        <label htmlFor="name">Your Email</label>
        <input
          type="email"
          id="email"
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && (
          <p className="error-text">please fill the email filed</p>
        )}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
