import StreetPage from "./street";
import { fetchStreets } from "@/api/fetchdata";
const Street =async () => {
    const data=await fetchStreets()
  return(
    <div className=" min-h-screen max-h-fit ">
        <StreetPage data={data}/>
    </div>
  );
};

export default Street;