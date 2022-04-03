import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Nav from "../../components/business/Nav";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import { useFormik } from "formik";
import * as Yup from "yup";
import InputAdornment from "@mui/material/InputAdornment";
import { MdVisibility } from "react-icons/md";
import { MdVisibilityOff } from "react-icons/md";
import { toast } from "react-toastify";
import { serviceProviderAuthState } from "../../atoms/authAtom";
import { register } from "../../api/serviceProviderAuth";
import { useRecoilState } from "recoil";
import { Checkbox } from "@mui/material";

const steps = [
  {
    label: "User Information",
    description: `Enter user information(email address, contact number and password) for account registration.`,
  },
  {
    label: "Business Information",
    description:
      "Enter general business information such as business name, business type, business address, business contact number and business description.",
  },
  {
    label: "Business Address",
    description: `Enter your business address information to help customers find you easily.`,
  },
];

const Register = () => {
  const [serviceProvider, setServiceProvider] = useRecoilState(
    serviceProviderAuthState
  );

  const [activeStep, setActiveStep] = useState(0);

  const [businessType, setBusinessType] = useState("company");

  const handleChange = (event) => {
    setBusinessType(event.target.value);
  };

  const [showPassword, setShowPassoword] = useState(false);

  const phoneRegExp = /^((98|97)|0)[0-9]{8}$/;

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    userPhone: Yup.string()
      .matches(
        phoneRegExp,
        "Phone number must be 10 characters long and start with 98"
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Password is required")
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
        "Most contain minimum eight characters, at least one letter and one number"
      ),
    // confirmPassword: Yup.string()
    //   .oneOf([Yup.ref("password"), null], "Passwords must match")
    //   .required("Confirm Password is required"),
    businessType: Yup.string().required("Business type is required"),
    name: Yup.string()
      .max("50", "Name is too long")
      .required("Name is required"),
    businessEmail: Yup.string()
      .email("Invalid email")
      .required("Email is required"),
    businessContactNumber: Yup.string()
      .matches(
        phoneRegExp,
        "Phone number must be 10 characters long and start with 98"
      )
      .required("Phone number is required"),
    owner: Yup.string().max("30", "Name is too long"),
    description: Yup.string().max("1000", "Description is too long"),
    neighbourhood: Yup.string()
      .max("30", "Neighbourhood is too long")
      .required("Neighbourhood is required"),
    city: Yup.string()
      .max("30", "City is too long")
      .required("City is required"),
    district: Yup.string()
      .max("30", "Province is too long")
      .required("District is required"),
    longitude: Yup.number()
      .max(180, "Longitude cannot exceed 180")
      .min(-180, "Longitude cannot be less than -180"),
    latitude: Yup.number()
      .max(180, "Latitude cannot exceed 180")
      .min(-180, "Latitude cannot be less than -180"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      userPhone: "",
      password: "",
      businessType: businessType,
      name: "",
      businessEmail: "",
      businessContactNumber: "",
      owner: "",
      description: "",
      neighbourhood: "",
      city: "",
      district: "",
      longitude: "",
      latitude: "",
    },
    validationSchema: validationSchema,
    // onSubmit: (val) => console.log(val),
  });

  const handleNext = async () => {
    if (activeStep === 0) {
      if (
        formik.errors?.email ||
        formik.errors?.userPhone ||
        formik.errors?.password
      ) {
        toast.error("Please fill all the required user information fields");
        console.log("Error");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }

    if (activeStep === 1) {
      if (
        formik.errors?.name ||
        formik.errors?.businessEmail ||
        formik.errors?.businessContactNumber
      ) {
        toast.error("Please fill all the required business information fields");
        console.log("Error");
      } else {
        setActiveStep((prevActiveStep) => prevActiveStep + 1);
      }
    }

    if (activeStep === 2) {
      if (Object.keys(formik.errors).length !== 0) {
        const errors = Object.values(formik.errors);
        toast.error(
          "Please fill all the required business address fields. \n" + errors
        );
        console.log("Error");
      } else {
        // alert(JSON.stringify(formik.values));
        try {
          const {
            name,
            userPhone: phoneNumber,
            email,
            password,
            businessType: type,
            businessEmail,
            businessContactNumber,
            description,
            owner,
            neighbourhood,
            city,
            district,
            longitude,
            latitude,
          } = formik.values;
          console.log(JSON.stringify(formik.values));
          const address = {
            neighbourhood,
            city,
            district,
            longitude,
            latitude,
          };
          const response = await register({
            name,
            phoneNumber,
            email,
            password,
            type,
            businessEmail,
            businessContactNumber,
            description,
            owner,
            address,
          });
          console.log(response);

          if (response) {
            setServiceProvider(response?.data?.token);
            console.log(response.data);
            toast.success(response.message);
            // toast.success("Business registered successfully");
          }
        } catch (error) {
          toast.error(error.response.data.message);
        }
      }
    }
  };

  // console.log(formik);
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  return (
    <>
      <Nav isHome={false} />
      <div className="flex items-center justify-center mt-10">
        <div className="lg:w-8/12 md:w-10/12  flex justify-between">
          <div className="min-w-[300px] w-3/12 p-5 shadow-lg min-h-[400px]">
            <Box sx={{ maxWidth: 400 }}>
              <Stepper activeStep={activeStep} orientation="vertical">
                {steps.map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      optional={
                        index === 2 ? (
                          <Typography variant="caption">Last step</Typography>
                        ) : null
                      }
                    >
                      <span className="text-lg">{step.label}</span>
                    </StepLabel>
                    <StepContent>
                      <span className="text-sm text-gray-400">
                        {step.description}
                      </span>
                    </StepContent>
                  </Step>
                ))}
              </Stepper>
            </Box>
          </div>
          <form
            className="px-5 w-8/12  py-8 border-2 rounded-md"
            onSubmit={formik.handleSubmit}
          >
            {activeStep === 0 ? (
              <>
                <div className="flex justify-between">
                  <h1 className="text-3xl">User Information</h1>
                </div>
                <div className="mt-6  flex flex-col bg-white">
                  <TextField
                    id="email"
                    label="Email Address"
                    type="email"
                    variant="outlined"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    error={formik.touched.email && Boolean(formik.errors.email)}
                    helperText={formik.touched.email && formik.errors.email}
                    onBlur={formik.handleBlur}
                    autoFocus
                  />
                  <TextField
                    id="userPhone"
                    label="Contact Number"
                    type="number"
                    variant="outlined"
                    className="w-[full]"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.userPhone}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.userPhone &&
                      Boolean(formik.errors.userPhone)
                    }
                    helperText={
                      formik.touched.userPhone && formik.errors.userPhone
                    }
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="password"
                    name="password"
                    label="Password"
                    type={`${showPassword ? "text" : "password"}`}
                    variant="outlined"
                    color="grey"
                    className="w-full border  rounded-sm "
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.password && Boolean(formik.errors.password)
                    }
                    helperText={
                      formik.touched.password && formik.errors.password
                    }
                    onBlur={formik.handleBlur}
                    style={{ marginBottom: "30px" }}
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
                </div>
              </>
            ) : activeStep === 1 ? (
              <>
                <div className="flex justify-between">
                  <h1 className="text-3xl">Business Information</h1>
                </div>
                <div className="mt-6  flex flex-col">
                  <FormControl fullWidth style={{ marginBottom: "30px" }}>
                    <InputLabel id="demo-simple-select-label">
                      Business Type
                    </InputLabel>
                    <Select
                      labelId="type"
                      id="Type"
                      value={businessType}
                      label="Business Type"
                      onChange={handleChange}
                    >
                      <MenuItem value={"individual"}>Individual</MenuItem>
                      <MenuItem value={"company"}>Company</MenuItem>
                    </Select>
                  </FormControl>

                  <TextField
                    id="name"
                    label={`${
                      businessType === "company" ? "Business Name" : "Full Name"
                    }`}
                    variant="outlined"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    error={formik.touched.name && Boolean(formik.errors.name)}
                    helperText={formik.touched.name && formik.errors.name}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="businessEmail"
                    type="email"
                    label={`Business Email Address`}
                    variant="outlined"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.businessEmail}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.businessEmail &&
                      Boolean(formik.errors.businessEmail)
                    }
                    helperText={
                      formik.touched.businessEmail &&
                      formik.errors.businessEmail
                    }
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="businessContactNumber"
                    label={`Business Contact Number`}
                    variant="outlined"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.businessContactNumber}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.businessContactNumber &&
                      Boolean(formik.errors.businessContactNumber)
                    }
                    helperText={
                      formik.touched.businessContactNumber &&
                      formik.errors.businessContactNumber
                    }
                    onBlur={formik.handleBlur}
                  />
                  {businessType === "company" && (
                    <TextField
                      id="owner"
                      label={`Owner Name`}
                      variant="outlined"
                      style={{ marginBottom: "30px" }}
                      value={formik.values.owner}
                      onChange={formik.handleChange}
                      error={
                        formik.touched.owner && Boolean(formik.errors.owner)
                      }
                      helperText={formik.touched.owner && formik.errors.owner}
                      onBlur={formik.handleBlur}
                    />
                  )}

                  <TextField
                    id="description"
                    label="Description"
                    variant="outlined"
                    rows={3}
                    style={{ marginBottom: "30px" }}
                    multiline
                    value={formik.values.description}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.description &&
                      Boolean(formik.errors.description)
                    }
                    helperText={
                      formik.touched.description && formik.errors.description
                    }
                    onBlur={formik.handleBlur}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="flex justify-between">
                  <h1 className="text-3xl">Address</h1>
                </div>
                <div className="mt-6  flex flex-col">
                  <TextField
                    id="neighbourhood"
                    label="Neighbourhood"
                    variant="outlined"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.neighbourhood}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.neighbourhood &&
                      Boolean(formik.errors.neighbourhood)
                    }
                    helperText={
                      formik.touched.neighbourhood &&
                      formik.errors.neighbourhood
                    }
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="city"
                    label="City"
                    variant="outlined"
                    className="w-[full]"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.city}
                    onChange={formik.handleChange}
                    error={formik.touched.city && Boolean(formik.errors.city)}
                    helperText={formik.touched.city && formik.errors.city}
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="district"
                    label="District"
                    variant="outlined"
                    className="w-[full]"
                    style={{ marginBottom: "30px" }}
                    value={formik.values.district}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.district && Boolean(formik.errors.district)
                    }
                    helperText={
                      formik.touched.district && formik.errors.district
                    }
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="longitude"
                    label="Longitude"
                    type="number"
                    style={{ marginBottom: "30px" }}
                    InputProps={{
                      inputProps: {
                        max: 180,
                        min: -180,
                      },
                    }}
                    value={formik.values.longitude}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.longitude &&
                      Boolean(formik.errors.longitude)
                    }
                    helperText={
                      formik.touched.longitude && formik.errors.longitude
                    }
                    onBlur={formik.handleBlur}
                  />
                  <TextField
                    id="latitude"
                    label="Latitude"
                    type="number"
                    style={{ marginBottom: "30px" }}
                    InputProps={{
                      inputProps: {
                        max: 180,
                        min: -180,
                      },
                    }}
                    value={formik.values.latitude}
                    onChange={formik.handleChange}
                    error={
                      formik.touched.latitude && Boolean(formik.errors.latitude)
                    }
                    helperText={
                      formik.touched.latitude && formik.errors.latitude
                    }
                    onBlur={formik.handleBlur}
                  />
                </div>
              </>
            )}
            <Box sx={{ mb: 2 }}>
              <div>
                <button
                  className="px-4 py-2 bg-indigo-800 text-white rounded"
                  onClick={handleNext}
                  type="button"
                >
                  {activeStep >= steps.length - 1 ? "Submit" : "Next"}
                </button>
                <button
                  disabled={activeStep === 0}
                  className="px-4 py-2  border shadow-sm border-gray-600  rounded ml-5 disabled:text-gray-300 "
                  onClick={handleBack}
                  type="button"
                >
                  Back
                </button>
              </div>
            </Box>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
