import HousePage from "./house";
import { fetchStreets } from "@/api/fetchdata";
const House =async () => {
    const data=await fetchStreets()
  return(
    <div className=" min-h-screen max-h-fit ">
        <HousePage data={data}/>
    </div>
  );
};

export default House;