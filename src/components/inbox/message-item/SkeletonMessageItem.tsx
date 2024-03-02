import './MessageItem.css';

type SkeletonMessageItemProps = {
    type: 'sender' | 'reciever';
}

function SkeletonMessageItem({ type }: SkeletonMessageItemProps) {

    const skeletonRowStyle = `h-[10px] bg-${type === 'reciever' ? 'midgray' : 'white opacity-40'} rounded-lg mb-1`;

    return <div
        className={`message-wrapper flex drop-shadow-md items-center relative ${type === 'reciever' ? 'other' : 'me self-end'} animate-pulse`}>
        <div className="message flex flex-col rounded-lg py-3 px-4">
            <div className={`w-[220px] ${skeletonRowStyle} h-[17px] mb-3`}></div>
            <div className={`w-[130px] ${skeletonRowStyle}`}></div>
            <div className={`w-[80px] ${skeletonRowStyle}`}></div>
            <div className={`w-[180px] ${skeletonRowStyle}`}></div>
            <div className={`w-[195px] ${skeletonRowStyle}`}></div>
        </div>
    </div>
}

export default SkeletonMessageItem;