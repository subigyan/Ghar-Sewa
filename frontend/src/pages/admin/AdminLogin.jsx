import React, { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import axios from "axios";
import { adminAuthState } from "../../atoms/authAtom";
import { useRecoilState } from "recoil";
import { toast } from "react-toastify";
import logo from "../../assets/images/logo.png";
import BackButton from "../../components/BackButton";
import { login } from "../../api/admin";

const AdminLogin = () => {
  const [showPassword, setShowPassoword] = useState(false);

  const [admin, setAdmin] = useRecoilState(adminAuthState);
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    password: Yup.string().required("Password is required"),
  });

  useEffect(() => {
    if (admin) {
      navigate("/admin/dashboard");
    }
  }, []);

  const formik = useFormik({
    initialValues: {
      password: "",
      name: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const { name, password } = values;
        const response = await login({ userName: name, password });
        if (response.data) {
          toast.success(response.message, {
            theme: "dark",
          });
          setAdmin(response.data);
        }
        navigate("/admin/dashboard");
        console.log(response);
      } catch (err) {
        console.log(err.response.data.message);
        toast.error(err.response.data.message, {
          theme: "dark",
        });
      }
    },
  });
  return (
    <div className="w-screen h-screen  flex font-roboto">
      <BackButton home={true} />
      <div className="w-full flex justify-center items-center p-2 bg-[#3B3B3B]/20">
        <div className="flex w-9/12 shadow-2xl h-[70%]">
          <div
            className="w-6/12  border border-gray-100 rounded-l-xl p-8 flex flex-col justify-center
          min-h-[400px]  bg-white"
          >
            <h1 className="text-5xl font-Medium  font-semibold text-gray-700">
              Admin Login
            </h1>
            <p className="text-lg mt-2 text-gray-600">
              Sign in to your account
            </p>
            <form
              className="flex flex-col w-full items-center justify-between mt-8 min-h-[180px] gap-4"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="name"
                name="name"
                label="Name"
                variant="outlined"
                size="small"
                color="grey"
                className="w-full"
                value={formik.values.name}
                onChange={formik.handleChange}
                error={formik.touched.name && Boolean(formik.errors.name)}
                helperText={formik.touched.name && formik.errors.name}
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
                fullWidth
                value={formik.values.password}
                onChange={formik.handleChange}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
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

              <div className="flex justify-end w-full">
                <button
                  className=" py-2 w-4/12  border-gray-400 rounded outline-none bg-slate-700 text-white text-xl"
                  type="submit"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
          <div className="w-6/12 bg-[#3B3B3B] flex flex-center rounded-r-xl">
            <img src={logo} alt="logo" className="w-80 bg-white" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
