'use client';
import Link from 'next/link';
import { Finger_Paint } from 'next/font/google';
import { UserAuth } from '../context/AuthContext';
import { MdAdd } from 'react-icons/md';

const finger_paint = Finger_Paint({ subsets: ['latin'], display: 'swap', weight: ['400'] });

const Navbar = () => {
    const { user, logOut } = UserAuth();
    return (
        <div className="flex justify-between items-center w-full h-20 px-4 text-white bg-black fixed nav select-none">
            <div>
                <h1 className="text-5xl font-signature ml-2">
                    <Link className="link-underline link-underline-black" href="/" rel="noreferrer">
                        {/* <Image
                            src={"/assets/images/PortaNote-banner-4000-1000.png"}
                            alt="Logo"
                            width="0"
                            height="0"
                            sizes="15vw"
                            className="w-full h-auto"
                            quality={100}
                        /> */}
                        <h1 className={finger_paint.className}>PortaNote</h1>
                    </Link>
                </h1>
            </div>

            <ul className="mr-4 hidden md:flex">
                {user ? (
                    <>
                        <li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-950 hover:scale-105 hover:text-gray-500 duration-200 link-underline">
                            <Link href="/create" className="rounded-full bg-white font-bold py-2 px-4">
                                <span>
                                    <MdAdd className="inline-block" /> Create Note
                                </span>
                            </Link>
                        </li>
                        <p
                            onClick={() => logOut()}
                            className="nav-links px-4 cursor-pointer font-medium hover:scale-105 hover:text-gray-500 duration-200 link-underline"
                        >
                            Welcome {user.email}
                        </p>
                    </>
                ) : (
                    <>
                        <li className="nav-links px-4 cursor-pointer capitalize font-medium hover:scale-105 hover:text-gray-500 duration-200 link-underline">
                            <Link href="/signin" className="rounded-full bg-transparent font-bold py-2 px-4">
                                Sign In
                            </Link>
                        </li>
                        <li className="nav-links px-4 cursor-pointer capitalize font-medium text-gray-950 hover:scale-105 hover:text-gray-500 duration-200 link-underline">
                            <Link href="/signup" className="rounded-full bg-white font-bold py-2 px-4">
                                Sign Up
                            </Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

export default Navbar;
