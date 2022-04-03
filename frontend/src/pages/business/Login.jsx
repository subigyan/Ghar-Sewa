import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import authState, { serviceProviderAuthState } from "../../atoms/authAtom";
import { login } from "../../api/serviceProviderAuth";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [showPassword, setShowPassoword] = useState(false);
  // const [user, setUser] = useRecoilState(authState);

  const [serviceProvider, setServiceProvider] = useRecoilState(
    serviceProviderAuthState
  );

  const navigate = useNavigate();
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

  // useEffect(() => {
  //   if (serviceProvider) {
  //     navigate("/");
  //   }
  // });
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { email, password } = values;
        // const response = await axios.post(
        //   "http://localhost:5000/api/serviceProviders/login",
        //   {
        //     email,
        //     password,
        //   }
        // );

        const response = await login({ email, password });
        if (response.data) {
          console.log("token", response?.data?.token);
          setServiceProvider(response?.data);
          toast.success("Done");
          toast.success(response.message);
        }
        console.log(response);
      } catch (err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    },
  });
  return (
    <div className="w-screen h-screen  flex ">
      <div className="w-full flex justify-center  p-2">
        <div
          className="md:w-[500px] w-[400px] shadow-2xl border border-gray-100 rounded-md p-4 flex flex-col justify-center  
          py-8 h-[400px] mt-20"
        >
          <h1 className="text-3xl font-Medium text-center font-semibold">
            Login
          </h1>
          <form
            className="flex flex-col w-full items-center justify-between mt-8 min-h-[180px] space-y-3"
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

            <button
              className="bg-gray-300 py-2 w-full border-2 border-gray-400 rounded mt-4"
              type="submit"
            >
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

export default Register;
