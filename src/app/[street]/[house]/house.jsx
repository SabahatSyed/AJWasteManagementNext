"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Button from "../../../components/Button";
import { useParams, useRouter } from "next/navigation";
import Modal from "react-modal";

const RecyclingModal = ({ isOpen, closeModal, Label = 1, data }) => {
  const label = 1;
  const modalStyles = {
    content: {
      width: '50%', // Set the desired width here
      margin: 'auto', // Center the modal horizontally
    },
  };
  return (
    <Modal style={modalStyles} isOpen={isOpen} onRequestClose={closeModal} contentLabel={Label}>
      <div className=" flex flex-col items-center justify-around h-2/3">
        <Image
          height={96}
          width={96}
          quality={100}
          src={`/assets/${Label}.png`}
        />
        {data.split(",").length > 0 ? (
          data
            .split(",")
            .map((item,index) => (
              <p key={index} className="text-xl text-justify text-gray-700 px-6 font-extrabold font-sans flex-wrap">
                - {item}
              </p>
            ))
        ) : (
          <p className="text-xl text-justify text-gray-700 px-6 font-extrabold font-sans flex-wrap">
            {data}
          </p>
        )}
      </div>
    </Modal>
  );
};
const House = ({ data }) => {
  const router = useRouter();
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const { street, house } = useParams();
  const [currentStreet, setCurrentStreet] = useState(null);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [streets, setStreets] = useState([]);
  const [houses, setHouses] = useState([]);
  const [info, setInfo] = useState("");
  const [Label, setLabel] = useState("");
  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    const fetchStreets = async () => {
      try {
        setStreets(
          Array.from(new Set(data?.map((bin) => bin.location.split(", ")[1])))
        );
        setHouses(data);
        const houseno = house?.replace(/%20/g, " ");
        const streetno = street?.replace(/%20/g, " ");
        setCurrentHouse(
          data.find(
            (item) =>
              item.location.includes(streetno) && item.location.includes(houseno)
          )
        );
      } catch (error) {
        console.error("Error fetching streets:", error.message);
      }
    };
    // Fetch streets data when the component mounts
    fetchStreets();
  }, []);

  

  useEffect(() => {
    if (currentHouse) if (currentHouse.fill_level > 90) recycle();
  }, [currentHouse]);

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

  const recycle = () => {
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
      const recycleSteps = [
        "Sending alert to Dubai municipality Waste Department",
        "Dubai municipality Waste Department sending truck to pick garbage",
        "Truck departed",
        "Waste delivered to Dubai Recyclers and is being recycled",
        "Recycling Complete, sending recycled plastic waste to company 1, recycled wires waste to company 2, general recycled waste to Mr Skips | Solid Waste, glass recycled waste to company 4",
        `${Math.floor(
          Math.random() * 1000
        )} AED amount is generated in revenue`,
        `${Math.floor(
          Math.random() * 10
        )} kilos waste was recycled and it generated around ${Math.floor(
          Math.random() * 1000
        )} AED. Within the span of 1 year, our revenue will be ${Math.floor(
          Math.random() * 10000
        )} AED.`,
      ];

      let stepIndex = 0;

      const performRecyclingStep = () => {
        if (stepIndex < recycleSteps.length) {
          const currentStep = recycleSteps[stepIndex];
          setLabel(stepIndex + 1);
          setInfo(currentStep);
          openModal();

          // Move to the next step after a timeout
          setTimeout(() => {
            stepIndex++;
            performRecyclingStep();
          }, 5000); // 5-second delay for each step
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
          setCurrentHouse((prev)=>({
            ...prev, 
            recycled: currentHouse.recycled + 1, 
            recycling_in_progress: false, 
            fill_level: 0
          }))
          const randomCompany = getRandomCompany();
          closeModal()
          alert(
            `Waste from ${currentHouse.bin_id} has been recycled by Dubai municipality Waste Department Circulars.`
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
    <div className="md:w-3/6 lg:w-1/3 flex flex-col h-full bg-white mx-auto px-2">
      <div className=" grid grid-cols-3 place-items-center">
        <div>
          <Image width={100} height={100} alt="logo" src={"/assets/logo.png"} />
        </div>
        <div>
          {" "}
          <p className="text-2xl font-semibold text-black"></p>
        </div>
        <div className="cursor-pointer" onClick={() => router.push("/")}>
          <Image
            width={30}
            height={30}
            alt="logout"
            src={"/assets/logout.png"}
          />
        </div>
      </div>
      <div>
        <RecyclingModal
          isOpen={modalIsOpen}
          closeModal={closeModal}
          Label={Label}
          data={info}
        />
        <div className="p-10 py-5">
          {currentHouse && (
            <div>
              <div className="px-7 grid grid-cols-3">
                <div className="col-span-3 text-2xl font-bold text-center text-[#82BE42]">
                  {street.replace(/%20/g, " ")}
                </div>
              </div>

              <div className=" bg-gradient-to-b from-[#83C03A] to-[#9abe6d] flex flex-col rounded-md p-10 gap-6 mt-4">
                <p className="text-2xl font-bold text-center text-[#1C7B3C]">
                  {currentHouse.location}
                </p>
                <p className="text-xl text-white">{`Bin ID: ${currentHouse.bin_id}`}</p>
                <p className="text-xl text-white">{`Fill Level: ${currentHouse.fill_level}`}</p>
                <p className="text-xl text-white">{`Recycled: ${currentHouse.recycled}`}</p>
                <p className="text-xl text-white">{`Recycling in Progress: ${currentHouse.recycling_in_progress}`}</p>
                <p className="text-xl text-white">{`Wasted: ${currentHouse.wasted}`}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default House;
