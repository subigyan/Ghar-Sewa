import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";

import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import authState from "../../atoms/authAtom";
import { login } from "../../services/customerAuth";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassoword] = useState(false);
  const [user, setUser] = useRecoilState(authState);
  console.log(user);
  const navigate = useNavigate();
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Most contain at least one letter and one number"
      ),
  });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        const response = await login({ email, password });
        if (response) {
          console.log("token", response?.data?.token);
          setUser(response?.data);
          toast.success(response.message);
        }
      } catch (err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    },
  });

  return (
    <div className="w-screen h-screen  flex  justify-center items-center">
      <div className="md:flex w-1/2 hidden bg-[#B2D0A9] h-full  justify-center flex-col items-center ">
        <h1>Welcome</h1>
        {/* <img src={img} alt="" className="w-[80%]" /> */}
      </div>

      <div className="md:w-1/2 flex justify-center items-center p-2">
        <div className="md:w-[500px] w-[350px] shadow-2xl border border-gray-100 rounded-md p-4 flex flex-col justify-center  ">
          <h1 className="text-3xl font-Medium">Login</h1>
          <form
            className="flex flex-col w-full items-center justify-between mt-8 min-h-[160px] space-y-3"
            onSubmit={formik.handleSubmit}
          >
            <TextField
              id="email"
              name="email"
              label="Email"
              type="email"
              variant="outlined"
              size="small"
              color="grey"
              className="w-full"
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
              onBlur={formik.handleBlur}
            />
            <TextField
              id="password"
              name="password"
              label="Password"
              type={`${showPassword ? "text" : "password"}`}
              variant="outlined"
              size="small"
              color="grey"
              // className="w-full border rounded-sm"
              fullWidth
              value={formik.values.password}
              onChange={formik.handleChange}
              error={formik.touched.password && Boolean(formik.errors.password)}
              helperText={formik.touched.password && formik.errors.password}
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={() => setShowPassoword(!showPassword)}
                    className="cursor-pointer"
                  >
                    {showPassword ? (
                      <MdVisibility size={25} />
                    ) : (
                      <MdVisibilityOff size={25} />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <button className="bg-gray-300 py-2 w-full border-2 border-gray-400 rounded mt-4">
              Login
            </button>
          </form>
          <p className="mt-5 text-center">
            Dont Have an account?{" "}
            <span className="bg-blue text-blue-400 ">
              <Link to="/register">Register</Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
