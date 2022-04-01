import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import AOS from "aos";
import "aos/dist/aos.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { register } from "../../services/customerAuth";
import axios from "axios";
import { useRecoilState } from "recoil";
import authState from "../../atoms/authAtom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Register = () => {
  let navigate = useNavigate();
  const [user, setUser] = useRecoilState(authState);

  useEffect(() => {
    AOS.init({ duration: 1500 });
    if (user) {
      navigate("/");
    }
  }, []);

  const [showPassword, setShowPassoword] = useState(false);
  const [showConPassword, setShowConPassoword] = useState(false);

  const validationSchema = Yup.object({
    name: Yup.string()
      .max("30", "Name is too long")
      .required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Most contain minimum eight characters, at least one letter and one number"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
    // agree: Yup.boolean().oneOf(
    //   [true],
    //   "You must agree to the terms and conditions"
    // ),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      // alert(JSON.stringify(values, null, 2));
      // const response = await register({ name, email, password });
      try {
        const { name, email, password } = values;
        const response = await register({ name, email, password });
        console.log(response);
        if (response) {
          setUser(response?.data);
          toast.success(response.message);
        }
      } catch (err) {
        toast.error(err.response.data.message);
      }

      // console.log(response.data, user);
    },
  });

  return (
    <div className="w-screen h-screen  flex  justify-center items-center">
      <div className="md:flex w-1/2 hidden bg-[#B2D0A9] h-full  justify-center flex-col items-center ">
        <h1>Welcome</h1>
        {/* <img src={img} alt="" className="w-[80%]" /> */}
      </div>
      <div className="md:w-1/2 flex justify-center items-center p-2">
        <div
          className="md:w-[500px] w-[350px] shadow-2xl rounded-md p-4 flex flex-col justify-center"
          data-aos="fade-left"
        >
          <h1 className="text-3xl font-semibold">Sign Up</h1>
          <form
            className="flex flex-col w-full items-center justify-between mt-8 min-h-[280px] space-y-3"
            onSubmit={formik.handleSubmit}
          >
            {/* {console.log(formik.touched.email)} */}

            <TextField
              id="name"
              name="name"
              label="Full Name"
              variant="outlined"
              size="small"
              color="grey"
              className="w-full border rounded-sm"
              value={formik.values.name}
              onChange={formik.handleChange}
              error={formik.touched.name && Boolean(formik.errors.name)}
              helperText={formik.touched.name && formik.errors.name}
              onBlur={formik.handleBlur}
            />
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
              className="w-full border  rounded-sm "
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
            <TextField
              id="confirmPassword"
              name="confirmPassword"
              label="Confirm Password"
              type={`${showConPassword ? "text" : "password"}`}
              variant="outlined"
              size="small"
              color="grey"
              className="w-full border  rounded-sm "
              value={formik.values.confirmPassword}
              onChange={formik.handleChange}
              error={
                formik.touched.confirmPassword &&
                Boolean(formik.errors.confirmPassword)
              }
              helperText={
                formik.touched.confirmPassword && formik.errors.confirmPassword
              }
              onBlur={formik.handleBlur}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="start"
                    onClick={() => setShowConPassoword(!showConPassword)}
                    className="cursor-pointer"
                  >
                    {showConPassword ? (
                      <MdVisibility size={25} />
                    ) : (
                      <MdVisibilityOff size={25} />
                    )}
                  </InputAdornment>
                ),
              }}
            />

            {/* <input
              type="text"
              className="w-full h-10 border border-gray-400 px-4 rounded-sm "
              placeholder="Full Name"
            />
            <input
              type="email"
              className="w-full h-10 border border-gray-400 px-4 rounded-sm "
              placeholder="Email"
            />
            <input
              type="text"
              className="w-full h-10 border border-gray-400 px-4 rounded-sm "
              placeholder="Password"
            />
            <input
              type="text"
              className="w-full h-10 border border-gray-400 px-4 rounded-sm "
              placeholder="Confirm Password"
            /> */}
            {/* <div className="flex  items-center w-full mt-4">
              <input
                type="checkbox"
                className="h-4 w-4 p-0"
                name="agree"
                id="agree"
              />
              <p className="ml-5">I agree with the terms and conditions.</p>
            </div> */}
            <button className="bg-gray-300 py-2 w-full border-2 border-gray-400 rounded mt-4">
              Sign Up
            </button>
          </form>
          <p className="mt-5 text-center">
            Already Have an account?{" "}
            <a className="bg-blue text-blue-400" href="/login">
              Log in
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;