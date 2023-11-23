"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../components/Button";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const street = ({ data }) => {
  const router = useRouter();
  const params=useParams()
  console.log("params",params,data)

  const [currentStreet, setCurrentStreet] = useState(null);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [streets, setStreets] = useState([]);
  const [house, setHouses] = useState([]);
  useEffect(() => {
    // Fetch streets data when the component mounts
    fetchStreets();
  }, []);

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

  const recycle = async () => {
    try {
      if (currentHouse.recycling_in_progress) {
        console.warn("Recycling is already in progress.");
        return;
      }

      // Update local state to indicate recycling in progress
      setHouses((prevHouses) =>
        prevHouses.map((house) =>
          house.bin_id === currentHouse.bin_id &&
          house.location === currentHouse.location
            ? { ...house, recycling_in_progress: true }
            : house
        )
      );

      // Simulate recycling steps with alerts and timeouts
      const recycleSteps = ["Sorting", "Cleaning", "Melting", "Reforming"];
      let stepIndex = 0;

      const performRecyclingStep = () => {
        if (stepIndex < recycleSteps.length) {
          const currentStep = recycleSteps[stepIndex];
          const randomCompany = getRandomCompany();
          alert(
            `Recycling process for ${currentHouse.bin_id} at ${randomCompany}: ${currentStep}`
          );

          // Move to the next step after a timeout
          setTimeout(() => {
            stepIndex++;
            performRecyclingStep();
          }, 2000); // 2-second delay for each step
        } else {
          // Recycling process completed, update local state
          setHouses((prevHouses) =>
            prevHouses.map((house) =>
              house.bin_id === currentHouse.bin_id &&
              house.location === currentHouse.location
                ? {
                    ...house,
                    recycling_in_progress: false,
                    recycled: house.recycled + 1,
                    fill_level: 0,
                  }
                : house
            )
          );
          const randomCompany = getRandomCompany();
          alert(
            `Waste from ${currentHouse.bin_id} has been recycled by ${randomCompany}.`
          );
        }
      };

      // Start the recycling process
      performRecyclingStep();
    } catch (error) {
      console.error("Error recycling:", error.message);
      // Display an error message to the user
    }
  };

  return (
    <div className=" md:w-3/6 lg:w-1/3 flex flex-col h-full bg-white mx-auto px-2">
      <div>
        <div className=" grid grid-cols-3 place-items-center">
          
          <p className=" col-span-3 text-2xl font-bold text-center text-[#82BE42]">
            {params?.street.replace(/%20/g, ' ')}
          </p>
        </div>

        <div className="border-gray-600 flex flex-col p-4 py-8 mx-5 shadow-md gap-6 rounded-md">
          {house
            .filter((item) => item.location.includes(params?.street.replace(/%20/g, ' ')))
            .map((item, index) => (
              <div onClick={() => router.push(`/${params?.street}/${item.location.split(",")[0]}`)} key={index}>
                <div
                  className=" cursor-pointer h-full bg-[#29853C] p-5 grid grid-cols-3 shadow-lg rounded-md gap-10 place-items-center w-full"
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

export default street;
