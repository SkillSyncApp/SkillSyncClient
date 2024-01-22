import { ArrowLeftStartOnRectangleIcon as SignOutIconOutlined } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';
import ProfileImage from '../../components/profile-image/ProfileImage';
import { logout as logoutRequest, resetTokens } from '../../services/authService';
import { userState } from '../../store/atoms/userAtom';

function Profile() {
    const navigate = useNavigate();
    const user = useRecoilValue(userState);
    const resetUserState = useResetRecoilState(userState);

    const logoutMutation = useMutation(logoutRequest);

    const logout = async () => {
        try {
            await logoutMutation.mutateAsync();
            resetTokens();
            resetUserState();
            navigate('/login', { replace: true });
        } catch (err) {
            toast.error('Failed to sign out');
        }
    };

    return <div className="flex-1 bg-lightgray flex flex-col items-center p-[70px]">
        <ProfileImage src={user.image} className='w-[200px] h-[200px] object-cover drop-shadow-lg' />
        <h2 className="pt-5 font-bold text-2xl">{user.name}</h2>
        <h4 className="opacity-60">{user.email}</h4>
        <p className="opacity-80 max-w-[400px] mt-5 text-[14px] text-center">{user.bio}</p>
        <div onClick={logout} className="mt-auto flex gap-1 items-center text-[#d9455c] cursor-pointer transition"><SignOutIconOutlined width={18} />Sign out</div>
    </div>
}

export default Profile;
