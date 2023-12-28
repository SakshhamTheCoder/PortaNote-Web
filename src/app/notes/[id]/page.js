'use client';
import { UserAuth } from '../../context/AuthContext';
import { useEffect, useState } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { getFirestore, getDoc, doc } from 'firebase/firestore';
import { firebase_app } from '../../firebase';
import Navbar from '../../components/Navbar';
import { useRouter } from 'next/navigation';

export default function View() {
    const router = useRouter();
    const db = getFirestore(firebase_app);
    const id = useParams().id;
    const { editNote, user } = UserAuth();
    const [note, setNote] = useState({});
    useEffect(() => {
        const fetchData = () => {
            getDoc(doc(db, user.uid, `${id}`))
                .then((querySnapshot) => {
                    let data = querySnapshot.data();
                    data.id = id;
                    setNote(data);
                })
                .catch((error) => {
                    console.log('Error getting documents: ', error);
                });
        };
        if (user == null) router.push('/');
        else fetchData();
    }, [user]);

    const handleSubmit = async (id, title, content) => {
        if (editNote(id, title, content)) router.push('/notes');
    };

    return (
        <main className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-full max-w-xs">
                    <h1 className="text-5xl font-bold text-center">View/Edit your PortaNote</h1>
                </div>
            </div>
            <div className="flex flex-col items-center justify-center flex-1">
                <div class="w-full max-w-4xl">
                    <form class="bg-transparent border border-gray-500 shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div class="mb-4">
                            <label class="block text-sm font-bold mb-2" for="title">
                                Title
                            </label>
                            <input
                                class="bg-transparent shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="title"
                                type="text"
                                placeholder="Enter title here"
                                defaultValue={note.title}
                            />
                        </div>
                        <div class="mb-6">
                            <label class="block text-sm font-bold mb-2" for="content">
                                Content
                            </label>
                            <textarea
                                class="h-32 bg-transparent shadow appearance-none border rounded w-full py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                                id="content"
                                type="text"
                                placeholder="Enter content here"
                                defaultValue={note.content}
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                onClick={() =>
                                    handleSubmit(
                                        `${note.id}`,
                                        document.getElementById('title').value,
                                        document.getElementById('content').value
                                    )
                                }
                                class="rounded-full bg-white font-bold py-2 px-4 cursor-pointer capitalize text-gray-950 hover:scale-105 hover:text-gray-500 duration-200 link-underline"
                                type="button"
                            >
                                Save
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
