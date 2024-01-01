'use client';
import { UserAuth } from '../context/AuthContext';
import { useRouter } from 'next/navigation';
import '../globals.css';
import Navbar from '../components/Navbar';
import { MdSaveAs } from 'react-icons/md';

export default function Create() {
    const router = useRouter();
    // const [missing, setMissing] = useState(false);
    const { addNote } = UserAuth();
    // const [loading, setLoading] = useState(true);

    const handleSubmit = async (title, content) => {
        if (addNote(title, content)) router.push('/notes');
    };

    return (
        <main className="flex min-h-screen">
            <Navbar />
            <div className="flex flex-col items-center justify-center flex-1">
                <div className="w-full max-w-xs">
                    <h1 className="text-5xl font-bold text-center">Create note</h1>
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
                            />
                        </div>
                        <div class="flex items-center justify-between">
                            <button
                                onClick={() =>
                                    handleSubmit(
                                        document.getElementById('title').value,
                                        document.getElementById('content').value
                                    )
                                }
                                class="rounded-full bg-white font-bold py-2 px-4 cursor-pointer capitalize text-gray-950 hover:scale-105 hover:text-gray-500 duration-200 link-underline"
                                type="button"
                            >
                                <MdSaveAs className="inline-block" /> Save Note
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </main>
    );
}
