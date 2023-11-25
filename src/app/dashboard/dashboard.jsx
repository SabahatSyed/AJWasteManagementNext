'use client'
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Button from "../../components/Button";
import { useRouter } from 'next/navigation';

const Dashboard = ({data}) => {
  const router=useRouter()
  const [currentStreet, setCurrentStreet] = useState(null);
  const [currentHouse, setCurrentHouse] = useState(null);
  const [streets, setStreets] = useState([]);
  const [house, setHouses] = useState([])
  const [logout,setLogout]=useState(false)
  useEffect(() => {
    const fetchStreets = async () => {
        try {
            
          setStreets(Array.from(new Set(data.map(bin => bin.location.split(', ')[1]))));
          setHouses(data)
        } catch (error) {
          console.error('Error fetching streets:', error.message);
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
  

  
  return (
    <div className=' flex flex-col h-full bg-white mx-auto px-2'>
        <div className='w-11/12 md:w-3/6 lg:w-1/3 mx-auto'> 
      <div className=' grid grid-cols-3 place-items-center' >
        <div><Image width={100} height={100} alt='logo' src={"/assets/logo.png"} /></div>
       <div> <p className='text-2xl font-semibold text-black' ></p></div>
        <div className='cursor-pointer' onClick={()=>{setLogout(true) 
            router.push('/')}}><Image width={30} height={30} alt='logout'  src={"/assets/logout.png"} /></div>
      </div>
      
      <div>
      <div className=" grid grid-cols-3 place-items-center">
                <Image className='col-start-3 cursor-pointer' onClick={()=>router.push('dashboard')} alt="back" width={26} height={26} src="/assets/refresh.png"/>

        </div>
        <div  className='p-10 py-5'>
        
            <div className='border-gray-600  flex flex-col gap-10 w-5/6 mx-auto'
            >
              {streets.map((item, index) => (
                <div key={index} onClick={() => router.push(`/${item}`)} >
                  <div className='cursor-pointer h-full bg-[#29853C] p-5 shadow-lg rounded-lg gap-6 flex items-center w-full'
                  >
                    <Image  width={30} height={30} alt='street' src={"/assets/street.png"} /><p  className='text-white text-xl font-semibold'>{item}</p>
                  </div>
                </div>
              ))}
            </div >
          
         
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;