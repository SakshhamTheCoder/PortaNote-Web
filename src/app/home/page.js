"use client";
import { UserAuth } from "../context/AuthContext";
import { useEffect, useState } from 'react';
import { useRouter } from "next/navigation";
import { getFirestore, query, getDocs, collection, orderBy } from "firebase/firestore";
import { firebase_app } from '../firebase';
import Navbar from "../components/Navbar";


export default function Home() {
    const db = getFirestore(firebase_app);
    const router = useRouter();
    const { user } = UserAuth();
    const [notes, setNotes] = useState([]);
    useEffect(() => {
        const fetchData = () => {
            getDocs(query(collection(db, user.uid), orderBy("date", "desc"))).then((querySnapshot) => {
                const newData = querySnapshot.docs.map((doc) => ({
                    ...doc.data(), id: doc.id
                }));
                setNotes(newData);
            }).catch((error) => {
                console.log("Error getting documents: ", error);
            });
        };
        if (user == null) router.push("/");
        else fetchData();
    }, [user]);

    return (
        user ?
            <main className="flex min-h-screen">
                <Navbar />
                <div className="flex flex-col items-center justify-center flex-1 mt-20">
                    <div className='grid grid-cols-3 gap-4 p-4'>
                        {
                            notes.length > 0 ?
                                notes.map((note, i) => (
                                    <div
                                        className="rounded-lg p-6 bg-neutral-700 block max-w-sm w-screen" key={i}>
                                        <h5
                                            className="mb-2 text-xl font-bold leading-tight text-neutral-50">
                                            {note.title}
                                        </h5>
                                        <p className="mb-4 font-light text-neutral-200 truncate">
                                            {note.content}
                                        </p>
                                        <p className="text-sm font-light text-neutral-200">
                                            Created at {note.date.toDate().toLocaleString()}
                                        </p>
                                    </div>


                                    // <a href="#" class="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">

                                    //     <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{note.title}</h5>
                                    //     <p class="font-normal text-gray-700 dark:text-gray-400 truncate">{note.content}</p>
                                    // </a>

                                )) :
                                <div className="flex flex-col items-center justify-center flex-1">
                                    <h1 className="text-6xl font-bold">No notes</h1>
                                    <p className="mt-3 text-xl">Create some notes by pressing the + icon</p>
                                </div>

                        }
                    </div>
                </div>


            </main>
            : <></>
    );
}
