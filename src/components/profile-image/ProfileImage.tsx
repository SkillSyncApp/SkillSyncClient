import DefaultProfileImage from './default-image.png';
import classnames from 'classnames';

type ProfileImageProps = {
    src?: string;
    className?: string;
}

function ProfileImage({ src, className = "" }: ProfileImageProps) {
    const source = src ?? DefaultProfileImage;

    return <img className={classnames("circle object-cover", className)} src={source}/>
}

export default ProfileImage;