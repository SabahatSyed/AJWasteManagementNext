import DashboardPage from "./dashboard";
import { fetchStreets } from "@/api/fetchdata";
const Dashboard =async () => {
    const data=await fetchStreets()
  return(
    <div className=" min-h-screen max-h-fit ">
        <DashboardPage data={data}/>
    </div>
  );
};

export default Dashboard;