


"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function AllBooksPage() {
    const router = useRouter();
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);


    const { data: session, isPending } = authClient.useSession();
    const user = session?.user;

    useEffect(() => {

        fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`)
            .then((res) => res.json())
            .then((data) => {
                setBooks(data || []);
                setLoading(false);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                setLoading(false);
            });
    }, []);

    const handleViewDetails = async (bookId) => {
        if (isPending) return;


        if (!session || !user) {
            router.push(`/login?redirectTo=/books/${bookId}`);
        } else {
            try {

                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token;

                if (token) {
                    localStorage.setItem('access-token', token);
                }
                router.push(`/books/${bookId}`);
            } catch (error) {
                console.error("Error securing client token:", error);
                router.push(`/books/${bookId}`);
            }
        }
    };
    return (
        <div className="bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen py-12 transition-colors duration-300">
            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="text-center max-w-xl mx-auto mb-16">
                    <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">
                        📚 All Library Books
                    </h1>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Browse through our full collection of books available for borrowing.
                    </p>
                </div>

                {loading || isPending ? (
                    <div className="flex justify-center items-center py-24">
                        <span className="loading loading-ring loading-lg text-emerald-500"></span>
                    </div>
                ) : (
                    <div>
                        {books.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                                {books.map((book) => {
                                    const currentId = book._id || book.id;
                                    return (
                                        <div key={currentId} className="group bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md hover:shadow-xl rounded-2xl overflow-hidden transition-all duration-300 flex flex-col justify-between h-[495px] w-full">
                                            <figure className="h-[52%] relative overflow-hidden bg-slate-200 dark:bg-slate-950">
                                                <img src={book.image || 'https://unsplash.com'} alt={book.title} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500" onError={(e) => { e.target.src = 'https://unsplash.com'; }} />
                                                <span className="absolute bottom-3 left-3 bg-white/90 dark:bg-slate-800/90 text-slate-800 dark:text-emerald-400 text-[11px] font-bold tracking-wide uppercase px-2.5 py-1 rounded-lg border border-slate-200/50 dark:border-slate-700 shadow-sm">{book.category}</span>
                                                <span className="absolute top-3 right-3 text-[11px] font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 backdrop-blur-md px-2.5 py-1 rounded-lg shadow-sm">Copies: {book.availableCopies ?? book.totalCopies ?? 0}</span>
                                            </figure>
                                            <div className="p-6 flex flex-col justify-between h-[48%]">
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 dark:text-white line-clamp-1 group-hover:text-emerald-500 dark:group-hover:text-emerald-400 transition-colors">{book.title}</h3>
                                                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-1.5">By <span className="font-semibold text-slate-600 dark:text-slate-300">{book.author}</span></p>
                                                </div>
                                                <div className="mt-4">
                                                    <button onClick={() => handleViewDetails(currentId)} className="btn btn-block bg-slate-900 hover:bg-slate-800 dark:bg-emerald-500 dark:hover:bg-emerald-600 border-none text-white rounded-xl font-semibold shadow-md transform active:scale-95 transition-all text-xs tracking-wider uppercase">View Details</button>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-slate-50 dark:bg-slate-900 rounded-2xl border border-dashed border-slate-300 dark:border-slate-700 shadow-sm">
                                <p className="text-base font-bold opacity-60 mb-4">No books found in the library!</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
