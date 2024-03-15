import { useNavigate } from "react-router-dom";
import Lottie from 'react-lottie';
import NotFoundAnimation from './not-found-animation.json';
import { useRecoilState } from "recoil";
import { userState } from "../../store/atoms/userAtom";

export const NotFound = () => {
    const navigate = useNavigate();

    const user = useRecoilState(userState);

    const goHome = () => {
        if (user) {
            navigate('/', { replace: true });
        } else {
            navigate("/login", { replace: true })
        }
    }

    return (
        <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
            <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
                <div className='text-center mb-5 text-primary'>
                    <Lottie options={{ animationData: NotFoundAnimation }} />
                </div>
                <p className="text-center text-gray-700 mb-2">The page you are looking for might be in another castle.</p>
                <button className="mt-4 w-full text-center text-white text-primary" onClick={goHome}>
                    Go back to home
                </button>
            </div>
        </div>
    )
}
