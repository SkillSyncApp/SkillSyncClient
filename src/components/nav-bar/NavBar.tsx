import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/userAtom";
import ProfileImage from "../profile-image/ProfileImage";

function NavBar() {
  const user = useRecoilValue(userState);
  const userImage = user ? user.image : undefined;

  return (
    <nav className="flex p-6 items-center justify-between">
      <Link to="/">
        <h1 className="font-bold text-2xl text-white mr-auto cursor-pointer">SKILLSYNC</h1>
      </Link>
      <Link to="/profile">
        <ProfileImage
          src={userImage?.serverFilename}
          className="bg-white w-[40px] h-[40px] object-cover cursor-pointer"
        />
      </Link>
    </nav>
  );
}

export default NavBar;
