import { useNavigate } from "react-router-dom";

export const NotFound = () => {
    const navigate = useNavigate();
  return (
        <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
            <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
                <div className='text-center mb-5 text-primary'>
                    <p className='opacity-60'>Oops! Page not found.</p>
                    <h1 className='font-bold text-4xl'>404</h1>
                </div>
                <p className="text-center text-gray-700 mb-6">The page you are looking for might be in another castle.</p>
                <button className="mt-4 w-full text-center text-white text-primary" onClick={() => navigate("/login", { replace: true })}>
                    Go back to home
                </button>
            </div>
        </div>
    )
}
