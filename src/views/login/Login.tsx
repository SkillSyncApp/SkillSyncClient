import FacebookIcon from '../../icons/FacebookIcon';
import GoogleIcon from '../../icons/GoogleIcon';
import { useNavigate } from "react-router-dom";
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const login = () => {
        navigate('/', { replace: true });
    };

    return <div className="bg-lightgray h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
        <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
            <h1 className="text-2xl mb-3 font-bold">Login</h1>
            <div className='mb-3'>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-700">Email</label>
                <input id="email" />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-700">Password</label>
                <input id="password" type="password" />
            </div>
            <button onClick={login} className='mt-4 w-full'>Login</button>
            <div className='mb-6 mt-5 flex items-center'>
                <div className='divider' />
                <span className='whitespace-pre text-[14px] mx-2'>or login with</span>
                <div className='divider' />
            </div>
            <div className='flex gap-2 justify-center'>
                <div className="login-provider shadow-lg">
                    <GoogleIcon width={20} />
                    Google
                </div>
                <div className="login-provider shadow-lg">
                    <FacebookIcon width={25} />
                    Facebook
                </div>
            </div>
        </div>
    </div>
}

export default Login;