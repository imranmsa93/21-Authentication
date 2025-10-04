import { Form } from "react-router-dom";
import { Link, useSearchParams, useActionData, useNavigation } from "react-router-dom";

import classes from "./AuthForm.module.css";

function AuthForm() {
  const [searchParams] = useSearchParams();
  const isLogin = searchParams.get("mode") === "login";
  const errorData = useActionData();
  const isSubmitting = useNavigation().state === "submitting";
  console.log("In AuthForm errorData ==> ", errorData);

  return (
    <>
      <Form method="post" className={classes.form}>
        <h1>{isLogin ? "Log in" : "Create a new user"}</h1>
        {errorData && errorData.errors && (
          <ul>
            {Object.values(errorData.errors).map((err) => (
              <li key={err}>{err}</li>
            ))}
          </ul>
        )}
        {errorData && errorData.message && <p>{errorData.message}</p>}
        <p>
          <label htmlFor="email">Email</label>
          <input id="email" type="email" name="email" required />
        </p>
        <p>
          <label htmlFor="image">Password</label>
          <input id="password" type="password" name="password" required />
        </p>
        <div className={classes.actions}>
          <Link to={`?mode=${isLogin ? "signup" : "login"}`}>
            {isLogin ? "Create new user" : "Login"}
          </Link>
          <button disabled = {isSubmitting}> {!isSubmitting ? 'Save' : 'Submitting'}</button>
        </div>
      </Form>
    </>
  );
}

export default AuthForm;
