import React, { useEffect } from "react";
import Sidebar from "../../../components/business/Sidebar";
import { FiImage } from "react-icons/fi";
import { AiFillDelete } from "react-icons/ai";
import { IoIosAddCircle } from "react-icons/io";
import axios from "axios";
import { updateServiceProvider } from "../../../api/serviceProvider";
import { useRecoilValue } from "recoil";
import { serviceProviderAuthState } from "../../../atoms/authAtom";
import { getServiceProvider } from "../../../api/serviceProviderSearch";

const BusinessImages = () => {
  const user = useRecoilValue(serviceProviderAuthState);

  const [profileImage, setProfileImage] = React.useState("");
  const [portfolioImages, setPortfolioImages] = React.useState([
    "",
    "",
    "",
    "",
    "",
  ]);
  const [serviceProvider, setServiceProvider] = React.useState([]);

  useEffect(() => {
    getServiceProvider(user?.id)
      .then((res) => {
        setServiceProvider(res.data);
        if (res?.data?.profileImage !== "") {
          setProfileImage(res.data.profileImage);
        }
        if (res?.data?.portfolioImages !== []) {
          const temp = portfolioImages;
          res.data.portfolioImages.map((image, index) => {
            temp[index] = image;
          });
          setPortfolioImages(res.data.portfolioImages);
        }
      })
      .catch((err) => console.log("No Service Provider"));
  }, [user.id]);

  const handleImageUpload = (e) => {
    const files = e.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "subigyan_preset");

    axios
      .post("https://api.cloudinary.com/v1_1/subigyan/image/upload", data)
      .then((response) => {
        setProfileImage(response.data.url);
        updateServiceProvider(user.id, {
          profileImage: response.data.url,
        })
          .then((res) => {
            getServiceProvider(user?.id)
              .then((res) => {
                setServiceProvider(res.data);
                if (res?.data?.profileImage !== "") {
                  setProfileImage(res.data.profileImage);
                }
              })
              .catch((err) => console.log("No Service Provider"));
          })
          .catch((err) => console.log("No Service Provider"));
      });
  };

  const handlePortfolioUpload = (e, index) => {
    const files = e.target.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "subigyan_preset");

    axios
      .post("https://api.cloudinary.com/v1_1/subigyan/image/upload", data)
      .then((response) => {
        const temp = [...portfolioImages];
        temp[index] = response.data.url;
        setPortfolioImages(temp);
        updateServiceProvider(user.id, {
          portfolioImages: temp.filter((image) => image !== ""),
        })
          .then((res) => {
            getServiceProvider(user?.id)
              .then((res) => {
                setServiceProvider(res.data);
              })
              .catch((err) => console.log("No Service Provider"));
          })
          .catch((err) => console.log("No Service Provider"));
      });
  };

  const deleteProfileImage = () => {
    setProfileImage("");
    updateServiceProvider(user.id, {
      profileImage: "",
    })
      .then((res) => {
        getServiceProvider(user?.id)
          .then((res) => {
            setServiceProvider(res.data);
          })
          .catch((err) => console.log("No Service Provider"));
      })
      .catch((err) => console.log("No Service Provider"));
  };

  const deletePortfolioImage = (index) => {
    const temp = [...portfolioImages];
    temp[index] = "";
    setPortfolioImages(temp);
    updateServiceProvider(user.id, {
      portfolioImages: temp.filter((image) => image !== ""),
    })
      .then((res) => {
        getServiceProvider(user?.id)
          .then((res) => {
            setServiceProvider(res.data);
          })
          .catch((err) => console.log("No Service Provider"));
      })
      .catch((err) => console.log("No Service Provider"));
  };

  console.log(profileImage);
  return (
    <div className="w-screen flex font-montserrat">
      <Sidebar active={"image"} />
      <div className="w-full max-h-screen overflow-y-scroll py-8 px-8  font-poppins">
        <h1 className="text-3xl font-semibold">Business Images</h1>
        <div className="w-full flex flex-col gap-8 py-8 ">
          <div>
            <h2 className="text-2xl font-medium">Profile Image</h2>
            <div className="border-2  w-fit p-5 rounded-lg mt-6 flex justify-between items-end">
              <div className="bg-gray-500 rounded-full w-36 h-36 flex flex-center ">
                {!profileImage ? (
                  <>
                    <h1>No image</h1>
                    <FiImage className="text-3xl" />
                  </>
                ) : (
                  <img
                    src={profileImage}
                    alt="Profile"
                    className="object-center rounded-full h-full w-full"
                  />
                )}
              </div>
              <div className="mt-4 flex justify-end">
                <AiFillDelete
                  className="text-4xl text-red-900 cursor-pointer"
                  onClick={deleteProfileImage}
                />

                <label htmlFor="fileInput" className="icon-label">
                  <IoIosAddCircle className="text-4xl text-green-900 cursor-pointer" />
                </label>
                <input
                  id="fileInput"
                  type="file"
                  onChange={handleImageUpload}
                  className="bg-green-400 hidden"
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-medium">Portfolio Image</h2>
            <div className="flex justify-start gap-6 flex-wrap">
              {["", "", "", "", ""].map((image, index) => {
                return (
                  <div className="border-2  w-fit p-5 rounded-lg mt-6 flex justify-between items-end">
                    <div className="bg-gray-500 rounded-lg w-36 h-36 flex flex-center overflow-hidden">
                      {portfolioImages?.[index] === "" ||
                      !portfolioImages?.[index] ? (
                        <>
                          <h1>No image</h1>
                          <FiImage className="text-3xl" />
                        </>
                      ) : (
                        <img
                          src={portfolioImages?.[index]}
                          alt="Profile"
                          className="object-contain rounded-lg"
                        />
                      )}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <AiFillDelete
                        className="text-4xl text-red-900 cursor-pointer"
                        onClick={() => deletePortfolioImage(index)}
                      />

                      <label htmlFor={index} className="icon-label">
                        <IoIosAddCircle className="text-4xl text-green-900 cursor-pointer" />
                      </label>
                      <input
                        id={index}
                        type="file"
                        onChange={(e) => handlePortfolioUpload(e, index)}
                        className="bg-green-400 hidden"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessImages;
