"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../components/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const Street = ({ data }) => {
  const router = useRouter();
  const params=useParams()
  const [logout,setLogout]=useState(false)

  const [currentStreet, setCurrentStreet] = useState(null);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [streets, setStreets] = useState([]);
  const [house, setHouses] = useState([]);
  useEffect(() => {
    const fetchStreets = async () => {
      try {
        setStreets(
          Array.from(new Set(data.map((bin) => bin.location.split(", ")[1])))
        );
        setHouses(data);
      } catch (error) {
        console.error("Error fetching streets:", error.message);
      }
    };
    // Fetch streets data when the component mounts
    fetchStreets();
    if(!localStorage.getItem("Login") || localStorage.getItem("Login")=='false'){
      router.push('/')
  }
  }, []);
  useEffect(()=>{
    if(logout)
    localStorage.setItem("Login","false")
  },[logout])
 
  const getRandomCompany = () => {
    const companies = [
      "Dubai municipality Waste Department Circulars",
      "Dubai Recycles",
      "EcoLife",
      "Mr Skips | Solid Waste",
      // Add more company names as needed
    ];

    const randomIndex = Math.floor(Math.random() * companies.length);
    return companies[randomIndex];
  };

  return (
    <div className=" md:w-3/6 lg:w-1/3 flex flex-col h-full bg-white mx-auto md:px-2">
      <div className=" grid grid-cols-3 place-items-center">
        <div>
          <Image width={100} height={100} alt="logo" src={"/assets/logo.png"} />
        </div>
        <div>
          {" "}
          <p className="text-2xl font-semibold text-black"></p>
        </div>
        <div className="cursor-pointer" onClick={() => {setLogout(true) 
          router.push("/")}}>
          <Image
            width={30}
            height={30}
            alt="logout"
            src={"/assets/logout.png"}
          />
        </div>
      </div>
      <div>
        <div className=" grid grid-cols-3 place-items-center">
          
          <p className=" col-span-3 text-2xl font-bold text-center text-[#82BE42]">
            {params?.street.replace(/%20/g, ' ')}
          </p>
        </div>

        <div className="border-gray-600 flex flex-col p-4 py-8 mx-2 md:mx-5 shadow-md gap-6 rounded-md">
          {house
            .filter((item) => item.location.includes(params?.street.replace(/%20/g, ' ')))
            .map((item, index) => (
              <div onClick={() => router.push(`/${params?.street}/${item.location.split(",")[0]}`)} key={index}>
                <div
                  className=" cursor-pointer h-full bg-[#29853C] py-5 md:p-5 grid grid-cols-3 shadow-lg rounded-md gap-10 place-items-center w-full"
                  key={index}
                >
                  <Image
                    width={30}
                    height={30}
                    alt="home"
                    src={"/assets/home.png"}
                  />
                  <p className="text-white text-xl font-semibold">
                    {item.location.split(",")[0]}
                  </p>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Street;
