import { ArrowLeftStartOnRectangleIcon as SignOutIconOutlined } from '@heroicons/react/24/outline';

function Profile() {
    return <div className="flex-1 bg-lightgray flex flex-col items-center p-[70px]">
        <img className="circle w-[200px] h-[200px] object-cover drop-shadow-lg" src="https://variety.com/wp-content/uploads/2022/11/Harry-Styles.jpg?w=1000" />
        <h2 className="pt-5 font-bold text-2xl">Amit Brickman</h2>
        <h4 className="opacity-60">amitbrickman@gmail.com</h4>
        <p className="opacity-80 max-w-[400px] mt-5 text-[14px] text-center">haretra diam. Etiam dignissim diam quis enim lobortis. Nec dui nunc mattis enim. Ullamcorper eget nulla facilisi etiam dignissim. Magna sit amet purus gravida quis blandit turpis cursus. Et ultrices neque ornare aenean euismod elementum. Nullam ac tortor vitae purus faucibus ornare suspendisse sed nisi. Blandit libero volutpat sed cras. Purus viverra accumsan in nisl nisi. Fringilla ut morbi tincidunt augue interdum velit euismod in. V</p>
        <div className="mt-auto flex gap-1 items-center hover:text-[#d9455c] cursor-pointer transition"><SignOutIconOutlined width={18} />Sign out</div>
    </div>
}

export default Profile;