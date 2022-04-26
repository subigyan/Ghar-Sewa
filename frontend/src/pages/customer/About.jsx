import React from "react";
import Nav from "../../components/Nav";
import aboutImage from "../../assets/images/about.jpg";

const About = () => {
  return (
    <>
      <Nav />
      <div className="lg:px-24 px-7 flex  w-screen justify-between h-screen   ">
        <div className="flex justify-between w-full">
          <div className=" md:w-1/2 flex justify-center flex-col gap-8 w-full">
            <h1 className="text-4xl font-semibold">About Ghar Sewa</h1>
            <p className="text-justify text-lg">
              Ghar Sewa is an application that aids its users to find
              maintenance and repair companies and individual contractors near
              them, as well as provides a medium for such companies and
              contractors to present their skills and services to the
              public.With high demand and increasing supply of home service
              business, Ghar Sewa application seeks to provide a platform that
              enables home service professionals to present their skills and
              service and be searchable on the internet, as well as acts as a
              portal that assists consumers in finding suitable maintenance and
              repair workers or companies as per their requirements.
            </p>
          </div>
          <div className="md:w-1/2 md:flex hidden">
            <img
              src={aboutImage}
              alt="about"
              className=" h-auto object-contain"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default About;
