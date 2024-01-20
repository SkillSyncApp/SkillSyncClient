import { Link } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/userAtom";

function NavBar() {
    const user = useRecoilValue(userState);

    return (
        <nav className='flex p-6 items-center'>
            <h1 className='font-bold text-2xl text-white mr-auto'>SKILLSYNC</h1>
            <Link to='/profile'>
                <img src={user?.image || "https://variety.com/wp-content/uploads/2022/11/Harry-Styles.jpg?w=1000"}
                    className='circle bg-white w-[40px] h-[40px] object-cover cursor-pointer' />
            </Link>
        </nav>
    )
}

export default NavBar;
