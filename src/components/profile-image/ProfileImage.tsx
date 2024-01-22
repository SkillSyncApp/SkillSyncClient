import DefaultProfileImage from '../../assets/images/profile-image.png';
import classnames from 'classnames';

type ProfileImageProps = {
    src: string | undefined;
    className?: string;
}

function ProfileImage({ src, className = "" }: ProfileImageProps) {
    return <img className={classnames("circle", className)} src={src || DefaultProfileImage}/>
}

export default ProfileImage;