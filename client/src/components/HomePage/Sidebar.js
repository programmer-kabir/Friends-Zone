import { getCurrentUser } from "@/src/ulits/getUser";

const Sidebar = async ({currentUser}) => {
  console.log(currentUser);
  
  return (
    <div>
      <h1>Welcome to TrendsShop</h1>;
    </div>
  );
};

export default Sidebar;
