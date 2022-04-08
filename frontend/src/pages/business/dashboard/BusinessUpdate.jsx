import React, { useEffect, useState } from "react";
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
import { useRecoilValue } from "recoil";
// import Map, { Marker } from "react-map-gl";
import Map from "react-map-gl";
import { MdLocationPin } from "react-icons/md";
import "mapbox-gl/dist/mapbox-gl.css";
import { Checkbox, FormControlLabel } from "@mui/material";
import Sidebar from "../../../components/business/Sidebar";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProvider } from "../../../api/serviceProviderSearch";
import { updateServiceProvider } from "../../../api/serviceProviderAuth";

const BusinessUpdate = () => {
  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#050505",
      },
    },
  });
  const user = useRecoilValue(serviceProviderAuthState);
  const [serviceProvider, setServiceProvider] = useState({}); // get service provider details

  const [viewPort, setViewPort] = useState({
    latitude: 27.70784546292888,
    longitude: 85.3255410260927,
    zoom: 16,
    width: "500px",
    height: "500px",
  });

  // console.log(serviceProvider);

  const phoneRegExp = /^((98|97)|0)[0-9]{8}$/;

  const [showPassword, setShowPassoword] = useState(false);
  const [businessType, setBusinessType] = useState("company");

  const handleSelectChange = (event) => {
    setBusinessType(event.target.value);
  };

  const serviceCategories = [
    {
      service: "Plumbing",
      occupation: "plumber",
    },
    {
      service: "Electrical Repair",
      occupation: "electrician",
    },
    {
      service: "Construction",
      occupation: "contractor",
    },
    {
      service: "Painting",
      occupation: "painter",
    },
    {
      service: "Carpenting",
      occupation: "carpenter",
    },
    {
      service: "Cleaning",
      occupation: "cleaner",
    },
    {
      service: "Auto Repair",
      occupation: "mechanic",
    },
    {
      service: "Handyman Service",
      occupation: "handyman",
    },
  ];

  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email").required("Email is required"),
    userPhone: Yup.string()
      .matches(
        phoneRegExp,
        "Phone number must be 10 characters long and start with 98 or 97"
      )
      .required("Phone number is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
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
    description: Yup.string()
      .min("50", "Description is too short")
      .max("1000", "Description is too long")
      .required("Description is required"),
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
      businessType: "company",
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
      services: [],
    },
    validationSchema: validationSchema,
    onSubmit: async () => {
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
          services,
        } = formik.values;
        console.log(formik.values, "Type:", type);
        const address = {
          neighbourhood,
          city,
          district,
          latitude: viewPort.latitude,
          longitude: viewPort.longitude,
        };

        // console.log(businessType);
        const response = await updateServiceProvider(user?.id, {
          name,
          phoneNumber,
          // email,
          // password,
          type,
          businessEmail,
          businessContactNumber,
          description,
          owner,
          address,
          services,
        });

        if (response) {
          console.log("res", response);

          // console.log(response.data);
          // console.log(response);
          if (response.success) {
            setServiceProvider(response?.data);
            toast.success(response.message);
          } else {
            toast.error(`Error: ${response.message}`);
          }
          // toast.success("Business registered successfully");
        }
      } catch (error) {
        toast.error(error.response.data.message);
      }
    },
  });

  useEffect(() => {
    getServiceProvider(user?.id)
      .then((res) => {
        setServiceProvider(res.data);
        setViewPort({
          ...viewPort,
          latitude: res?.data?.address?.latitude,
          longitude: res?.data?.address?.longitude,
        });
        formik.setValues({
          email: res?.data?.email,
          userPhone: res?.data?.phoneNumber,
          password: "",
          businessType: res?.data?.type,
          name: res?.data?.name,
          businessEmail: res?.data?.businessEmail,
          businessContactNumber: res?.data?.businessContactNumber,
          owner: res?.data?.owner || "",
          description: res?.data?.description,
          neighbourhood: res?.data?.address?.neighbourhood,
          city: res?.data?.address?.city,
          district: res?.data?.address?.district,
          longitude: "",
          latitude: "",
          services: res?.data?.services || [],
        });
      })
      .catch((err) => console.log("User Not Found"));
  }, [user.id]);

  console.log(formik);

  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"manageInfo"} />
      <ThemeProvider theme={theme}>
        <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              formik.handleSubmit();
            }}
          >
            <h1 className="text-3xl font-semibold">Update Info</h1>

            <div className="mt-6  flex flex-col bg-white">
              {/* <TextField
    required
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
  />
  */}
              <TextField
                required
                id="userPhone"
                label="Contact Number"
                type="number"
                variant="outlined"
                className="w-[full]"
                style={{ marginBottom: "30px" }}
                value={formik.values.userPhone}
                onChange={formik.handleChange}
                error={
                  formik.touched.userPhone && Boolean(formik.errors.userPhone)
                }
                helperText={formik.touched.userPhone && formik.errors.userPhone}
                onBlur={formik.handleBlur}
              />
              {/* <TextField
                
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
                helperText={formik.touched.password && formik.errors.password}
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
              /> */}
            </div>
            <div className="mt-6  flex flex-col">
              <FormControl fullWidth style={{ marginBottom: "30px" }}>
                <InputLabel id="demo-simple-select-label">
                  Business Type
                </InputLabel>
                <Select
                  name="businessType"
                  id="businessType"
                  label="Business Type"
                  onChange={(e) => {
                    formik.handleChange(e);
                    handleSelectChange(e);
                  }}
                  defaultValue={businessType || "company"}
                >
                  <MenuItem value={"individual"}>Individual</MenuItem>
                  <MenuItem value={"company"}>Company</MenuItem>
                </Select>
              </FormControl>

              <TextField
                required
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
              {businessType === "company" && (
                <TextField
                  required
                  id="owner"
                  label={`Owner Name`}
                  variant="outlined"
                  style={{ marginBottom: "30px" }}
                  value={formik.values.owner}
                  onChange={formik.handleChange}
                  error={formik.touched.owner && Boolean(formik.errors.owner)}
                  helperText={formik.touched.owner && formik.errors.owner}
                  onBlur={formik.handleBlur}
                />
              )}
              <TextField
                required
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
                  formik.touched.businessEmail && formik.errors.businessEmail
                }
                onBlur={formik.handleBlur}
              />
              <TextField
                required
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
              <div className="px-1">
                <h3 className="text-xl font-medium text-gray-600 mb-3">
                  Select Services
                </h3>
                <div
                  role="group"
                  aria-labelledby="checkbox-group"
                  className="flex justify-between w-full flex-wrap mb-7"
                >
                  {serviceCategories?.map((service, index) => (
                    <FormControlLabel
                      key={index}
                      control={
                        <Checkbox
                          name="services"
                          onChange={formik.handleChange}
                          checked={
                            formik.values?.services.indexOf(
                              service.occupation
                            ) > -1
                              ? true
                              : false
                          }
                        />
                      }
                      label={service.service}
                      value={service.occupation}
                    />
                  ))}
                </div>
              </div>
              <TextField
                required
                id="description"
                label="Description"
                variant="outlined"
                rows={5}
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
            <div className="mt-6  flex flex-col">
              <TextField
                required
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
                  formik.touched.neighbourhood && formik.errors.neighbourhood
                }
                onBlur={formik.handleBlur}
              />
              <TextField
                required
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
                required
                id="district"
                label="District"
                variant="outlined"
                className="w-[full]"
                style={{ marginBottom: "20px" }}
                value={formik.values.district}
                onChange={formik.handleChange}
                error={
                  formik.touched.district && Boolean(formik.errors.district)
                }
                helperText={formik.touched.district && formik.errors.district}
                onBlur={formik.handleBlur}
              />
              {/* <TextField
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
          style={{ marginBottom: "10px" }}
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
        <div className="flex justify-end mb-4 ">
          <button
            className="py-2 bg-violet-900 w-[150px] rounded text-white"
            onClick={() => getLocation()}
            type="button"
          >
            Get My Location
          </button>
        </div> */}
              <div className="w-full flex flex-col flex-center mb-6">
                <h2 className="mb-6 text-2xl font-medium">
                  Point Your Location
                </h2>
                <div
                  className={`w-full h-[300px] max-h-[80vh]  flex flex-center relative overflow-hidden rounded-lg `}
                >
                  <Map
                    {...viewPort}
                    // style={{ width: 600, height: 400 }}
                    mapStyle="mapbox://styles/mapbox/streets-v9"
                    mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                    onMove={(viewPort) => {
                      setViewPort(viewPort);
                    }}
                  ></Map>
                  <MdLocationPin className="text-4xl text-red-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className="px-8 py-2 bg-indigo-800 text-white rounded text-xl">
                Update
              </button>
            </div>
          </form>
        </div>
      </ThemeProvider>
    </div>
  );
};

export default BusinessUpdate;
