"use client";
import { UserAuth } from "../context/AuthContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignUp() {
    const router = useRouter();
    const { pSignUp } = UserAuth();

    const handleSignUp = async (email, password, cpassword) => {
        // if (!email || !password) return setMissing(true);
        if (!email || !password) return alert('Please enter a valid email and password.');
        if (password !== cpassword) return alert('Passwords do not match.');
        if (await pSignUp(email, password)) router.push('/home');
    };

    return (
        <main className="flex min-h-screen">
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-full max-w-xs">
                    <h1 className="text-5xl font-bold text-center">Sign up to PortaNote</h1>
                </div></div>
            <div className="flex flex-col items-center justify-center flex-1">

                <div class="w-full max-w-lg">
                    <form class="bg-transparent border border-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2" for="username">
                                Email
                            </label>
                            <input class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="user@email.com" />
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2" for="password">
                                Password
                            </label>
                            <input class="bg-transparent shadow appearance-none border hidden:border-red-500 rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="********" />
                            <p class="hidden text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2" for="cpassword">
                                Confirm Password
                            </label>
                            <input class="bg-transparent shadow appearance-none border hidden:border-red-500 rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="cpassword" type="password" placeholder="********" />
                            <p class="hidden text-red-500 text-xs italic">Please choose a password.</p>
                        </div>
                        <div class="flex items-center justify-between">
                            <button onClick={
                                () => handleSignUp(document.getElementById('username').value,
                                    document.getElementById('password').value,
                                    document.getElementById('cpassword').value
                                )
                            } class="rounded-full bg-white font-bold py-2 px-4 cursor-pointer capitalize text-gray-950 hover:scale-105 hover:text-gray-500 duration-200 link-underline" type="button">
                                Sign Up
                            </button>
                            <a class="inline-block align-baseline font-bold text-sm hover:scale-105 hover:text-gray-500 duration-200 link-underline" href="#">
                                Already have an account? Sign in
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}