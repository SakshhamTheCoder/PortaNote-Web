import { Poppins } from 'next/font/google';
import './globals.css';
import { AuthContextProvider } from './context/AuthContext';
import { getSelectorsByUserAgent } from 'react-device-detect';
import { headers } from 'next/headers';

const poppins = Poppins({ subsets: ['latin'], display: 'swap', weight: ['500'] });

export const metadata = {
    title: 'PortaNote',
    description: 'A note-taking app accessible on the go',
};

export default function RootLayout({ children }) {
    const { isMobile } = getSelectorsByUserAgent(headers().get('user-agent') ?? '');
    return (
        <html lang="en">
            <body className={poppins.className}>
                {isMobile ? (
                    <>
                        <main className="flex min-h-screen text-center">
                            <div className="flex flex-col items-center justify-center flex-1">
                                <h1 className="text-6xl font-bold">PortaNote Web is only available on desktop</h1>
                                <p className="mt-3 text-xl">
                                    Please use a desktop browser to access this app or install the mobile app
                                </p>
                            </div>
                        </main>
                    </>
                ) : (
                    <AuthContextProvider>{children}</AuthContextProvider>
                )}
            </body>
        </html>
    );
}

