'use client';
import Link from 'next/link';
import { useTheme } from '@/context/ThemeContext';
import { authClient } from "@/lib/auth-client"; 
import { useRouter } from 'next/navigation';

export default function Navbar() {
    const { theme, toggleTheme } = useTheme();
    const router = useRouter();

    // BetterAuth সেশন ডাটা
    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    const handleLogout = async () => {
        await authClient.signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/');
                }
            }
        });
    };

    if (isPending) {
        return <div className="navbar bg-base-100 dark:bg-slate-900 h-16 shadow-sm"></div>;
    }

    return (
        <div className="navbar bg-base-100 dark:bg-slate-900 border-b border-base-200 dark:border-slate-800 shadow-sm px-4 md:px-8 transition-colors duration-300">
            {/* Logo & Brand Name */}
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden text-base-content dark:text-white">
                        <svg xmlns="http://w3.org" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 dark:bg-slate-800 rounded-box w-52 text-base-content dark:text-slate-200">
                        
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/books">All Books</Link></li>
                        
                        {user && (
                            <>
                                <li><Link href="/add-book">Add Book</Link></li>
                                <li><Link href="/my-books">My Books</Link></li>
                                <li><Link href="/my-borrows">My Borrows</Link></li>
                            </>
                        )}
                    </ul>
                </div>
                <Link href="/" className="text-xl font-bold tracking-wider text-primary dark:text-emerald-400">
                    BookNook
                </Link>
            </div>

        
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1 gap-2 font-medium text-base-content dark:text-slate-200">
                  
                    <li><Link href="/">Home</Link></li>
                    <li><Link href="/books">All Books</Link></li>
                   
                    {user && (
                        <>
                            <li><Link href="/add-book">Add Book</Link></li>
                            <li><Link href="/my-books">My Books</Link></li>
                            <li><Link href="/my-borrows">My Borrows</Link></li>
                        </>
                    )}
                </ul>
            </div>

            
            <div className="navbar-end gap-4">
          
                <button onClick={toggleTheme} className="btn btn-ghost btn-circle text-base-content dark:text-white">
                    {theme === 'light' ? (
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>
                    ) : (
                        <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m0 13.5V21m8.966-8.966h-2.25m-13.5 0H3m16.5 9.966-1.591-1.591M21.75 12a9.75 9.75 0 0 1-9.75 9.75m0-19.5A9.75 9.75 0 0 1 21.75 12ZM4.242 4.242 5.833 5.833m12.334 12.334-1.591-1.591M4.242 19.758l1.591-1.591M18.167 5.833 16.576 4.242" /></svg>
                    )}
                </button>

                
                {!user ? (
                    <div className="flex gap-2">
                        <Link href="/login" className="btn btn-outline btn-sm sm:btn-md border-primary text-primary hover:bg-primary dark:border-emerald-400 dark:text-emerald-400 dark:hover:bg-emerald-400 dark:hover:text-slate-900 transition-all">
                            Login
                        </Link>
                        <Link href="/register" className="btn btn-primary btn-sm sm:btn-md text-white dark:bg-emerald-500 dark:border-none dark:hover:bg-emerald-600 transition-all">
                            Register
                        </Link>
                    </div>
                ) : (
                    <div className="dropdown dropdown-end">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar border-2 border-primary dark:border-emerald-400">
                            <div className="w-10 rounded-full">
                                <img src={user.image || 'https://unsplash.com'} alt="User Profile" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-3 shadow bg-base-100 dark:bg-slate-800 text-base-content dark:text-slate-200 rounded-box w-52 gap-1">
                            <li className="font-bold px-2 py-1 border-b border-base-200 dark:border-slate-700">{user.name}</li>
                            <li><Link href="/my-profile" className="mt-2">My Profile</Link></li>
                            <li><button onClick={handleLogout} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30">Logout</button></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
}
