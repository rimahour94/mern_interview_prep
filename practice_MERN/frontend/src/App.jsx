import { useState } from "react";
import axios from "axios";
import "./App.css";
import { validate } from "./validate";
import { useForm } from "react-hook-form";

function App() {
  const [user, setUser] = useState({ email: "", password: "" });
  const [data, setData] = useState({});
  // const [error, setError] = useState({});

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const errors = validate(name, value);
    console.log(errors);

    // setError({ ...error, ...errors });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let error = {};

  //   if (!user?.email) {
  //     let err = validate("email", user?.email);

  //     // error = { ...err };
  //     setError({ ...error, ...err });
  //   }

  //   if (!user?.password) {
  //     let err = validate("password", user?.password);
  //     console.log(err);
  //     // error = { ...error, ...err };
  //   }
  //   // console.log(error);

  //   // setError(error);
  //   if (!error?.email && !error?.password) {
  //     try {
  //       const res = await axios.post("http://localhost:8000/create", user);
  //       setData(res?.data);
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   }
  // };

  return (
    <>
      <form onSubmit={handleSubmit((data) => console.log(data))}>
        <input
          type="email"
          {...register("email", {
            required: true,
            pattern:
              /^[a-zA-Z0-9.]{3,}[a-zA-Z0-9!@#$%^&*()_-][@][a-z]{3,}[.][a-z]{3}$/,
          })}
        />
        <p>{errors?.email && "Email is required"}</p>
        <input type="password" {...register("password")} />
        <p>{errors?.password}</p>
        <button type="submit">Submit</button>
      </form>

      <div>
        <h2>{data?.email}</h2>
        <h2>{data.password}</h2>
      </div>
    </>
  );
}

export default App;
