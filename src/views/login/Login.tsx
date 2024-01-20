import { useState } from 'react';
import toast, { Toaster } from "react-hot-toast";
import {
    useMutation
} from 'react-query';
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from 'recoil';
import FacebookIcon from '../../icons/FacebookIcon';
import GoogleIcon from '../../icons/GoogleIcon';
import { login as loginRequest, saveTokens } from '../../services/authService';
import { userState } from '../../store/atoms/userAtom';
import './Login.css';

function Login() {
    const navigate = useNavigate();

    const setUser = useSetRecoilState(userState);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginMutation = useMutation(({ email, password }: { email: string, password: string }) =>
        loginRequest(email, password));

    const login = async () => {
        try {
            const { data: loginRes } = await loginMutation.mutateAsync({
                email,
                password
            });
            saveTokens({ accessToken: loginRes.accessToken, refreshToken: loginRes.refreshToken });
            setUser(loginRes.user);
            toast.success('Logged in successfully');

            navigate('/', { replace: true });
        } catch (err) {
            toast.error('Login failed');
            console.log(err)
        }
    };

    return <div className="h-[100vh] bg-primary flex items-center justify-center flex flex-col font-display">
        <div className="w-[500px] bg-white rounded-[20px] drop-shadow-lg p-[40px]">
            <h1 className="text-2xl mb-3 font-bold">Login</h1>
            <div className='mb-3'>
                <label htmlFor="email" className="block mb-2 text-sm text-gray-700">Email</label>
                <input id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
                <label htmlFor="password" className="block mb-2 text-sm text-gray-700">Password</label>
                <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
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
        <Toaster />
    </div>
}

export default Login;