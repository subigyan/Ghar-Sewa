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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem,
              corrupti quasi odio quibusdam optio velit aliquam commodi, ea
              autem dolorem vel eligendi et adipisci suscipit totam sequi
              accusantium unde neque cupiditate similique expedita aperiam
              repudiandae recusandae! Laboriosam impedit animi dolorum
              cupiditate facere! Neque nam modi, quis similique sequi eius ex!
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
