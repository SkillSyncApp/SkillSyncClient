import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/userAtom";
import ProfileImage from "../profile-image/ProfileImage";

function NavBar() {
  const user = useRecoilValue(userState);
  const userImage = user ? user.image : undefined;

  return (
    <nav className="flex p-6 items-center">
      <h1 className="font-bold text-2xl text-white mr-auto">SKILLSYNC</h1>
      <Link to="/profile">
        <ProfileImage
          src={userImage}
          className="bg-white w-[40px] h-[40px] object-cover cursor-pointer"
        />
      </Link>
    </nav>
  );
}

export default NavBar;
