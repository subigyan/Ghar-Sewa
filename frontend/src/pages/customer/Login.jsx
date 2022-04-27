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
import { login } from "../../api/customer";
import { useNavigate } from "react-router-dom";
import BackButton from "../../components/BackButton";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "../../assets/images/logo.png";
import loginIng from "../../assets/images/login.png";

const Login = () => {
  const [showPassword, setShowPassoword] = useState(false);
  const [user, setUser] = useRecoilState(authState);

  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });

  useEffect(() => {
    AOS.init({ duration: 700 });
    if (user) {
      navigate("/");
    }
  }, []);

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    password: Yup.string()
      .min(
        8,
        "Password must be at least 8 characters and contain at least one letter and one number"
      )
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
        console.log("data");
        if (response) {
          console.log("token", response?.data);
          setUser(response?.data);
          toast.success(response.message);
          navigate("/");
        }
      } catch (err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message);
      }
    },
  });

  return (
    <div className="w-screen h-screen  flex  justify-center items-center relative">
      <BackButton />
      <div className="absolute h-screen left-0 -z-10 w-8/12 rounded-r-full bg-[#3B3B3B] md:block hidden "></div>
      <div className="absolute h-1/2 top-0 left-0 -z-10 w-8/12 rounded-r-full bg-[#3B3B3B] md:hidden block"></div>
      <div className="absolute h-1/2 bottom-0 right-0 -z-10 w-8/12 rounded-l-full bg-[#3B3B3B] md:hidden block"></div>

      <div className="md:flex w-5/12 hidden h-full  flex-center flex-col  ">
        <img
          src={loginIng}
          alt="login"
          className="w-[90%] min-w-[350px] ml-20 "
          data-aos="zoom-in"
          data-aos-duration="700"
        />
      </div>

      <div className="md:w-7/12 flex flex-col justify-center items-center p-2">
        <div
          className="md:w-[500px] w-[350px] shadow-2xl bg-white border border-gray-100 rounded-md flex flex-col justify-center  px-8 pb-8 py-4"
          data-aos="fade-left"
          data-aos-duration="700"
        >
          <div className="w-full flex items-center justify-center ">
            <img src={logo} alt="" className="w-[250px] bg-white mb-4" />
          </div>
          <h1 className="text-3xl font-medium">Login</h1>
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

            <button
              className="bg-gray-300 py-2 w-full border-2 border-gray-400 rounded mt-4"
              type="submit"
            >
              Login
            </button>
          </form>
          <p className="mt-5 text-center">
            Dont have an account?{" "}
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
