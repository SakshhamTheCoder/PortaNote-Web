"use client";
import { UserAuth } from "./context/AuthContext";
import { useEffect } from 'react';
import { useRouter } from "next/navigation";
import Navbar from './components/Navbar';

export default function Landing() {
  const router = useRouter();
  const { user } = UserAuth();
  useEffect(() => {
    if (user != null) router.push("/home");
  }, [user]);
  return (
    <main className="flex min-h-screen">
      <Navbar />
      <div className="flex flex-col items-center justify-center flex-1">
        <h1 className="text-6xl font-bold">Welcome to PortaNote</h1>
        <p className="mt-3 text-xl">A note-taking app accessible on the go</p>
      </div>
    </main>
  );
}
