import { useUser } from "@/src/context/UserContext";

const Profile = () => {
    const currentUser = useUser()
    console.log(currentUser);
    return (
        <div>
            
        </div>
    );
};

export default Profile;