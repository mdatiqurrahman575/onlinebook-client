



"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyBorrowsPage() {
    const [borrowedBooks, setBorrowedBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    const { data: session, isPending } = authClient.useSession();
    const loggedInUser = session?.user;

    useEffect(() => {
        if (isPending || !loggedInUser?.email) return;

        const loadBorrowedBooks = async () => {
            try {
                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token;

                const headers = {};
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows?email=${loggedInUser.email}`, {
                    headers: headers
                });
                const data = await res.json();
                setBorrowedBooks(data || []);
            } catch (err) {
                console.error("Error fetching borrowed books:", err);
            } finally {
                setLoading(false);
            }
        };

        loadBorrowedBooks();
    }, [loggedInUser?.email, isPending]);

    const handleReturnBook = async (borrowId) => {
        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token;

            const headers = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows/${borrowId}`, {
                method: "DELETE",
                headers: headers
            });

            if (res.ok) {
                alert("Book Returned Successfully!");
                setBorrowedBooks(borrowedBooks.filter((book) => book._id !== borrowId));
            } else {
                alert("Failed to return the book.");
            }
        } catch (err) {
            console.error("Error returning book:", err);
        }
    };

    if (isPending || (loading && loggedInUser?.email)) {
        return (
            <div className="flex justify-center items-center py-20 min-h-[60vh]"><span className="loading loading-spinner loading-lg text-primary"></span></div>
        );
    }

    if (!loggedInUser) {
        return (
            <div className="text-center py-20 min-h-[60vh]"><p className="text-error font-bold">Please login to view your borrowed books.</p></div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-[60vh]">
            <div className="text-center mb-10">
                <h1 className="text-3xl font-black text-base-content mb-2 tracking-tight">My Borrowed Books</h1>
                <p className="text-sm opacity-70">Review your borrowed items, due dates, and return them when done.</p>
            </div>

            <div className="bg-base-100 shadow-xl border border-base-200 rounded-2xl overflow-hidden">
                {borrowedBooks.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                        <table className="table table-zebra w-full text-base-content">
                            <thead>
                                <tr className="bg-base-200 text-sm font-bold">
                                    <th>Book Image</th><th>Title</th><th>Borrow Date</th><th>Return Date</th><th className="text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm font-medium">
                                {borrowedBooks.map((item) => (
                                    <tr key={item._id} className="hover:bg-base-200/40 transition-colors">
                                        <td><div className="avatar"><div className="mask rounded-lg w-12 h-16 bg-base-300"><img src={item.bookImage} alt={item.bookTitle} className="object-cover" /></div></div></td>
                                        <td className="font-bold max-w-xs truncate">{item.bookTitle}</td>
                                        <td>{item.borrowDate ? new Date(item.borrowDate).toLocaleDateString() : "N/A"}</td>
                                        <td className="text-error font-semibold">{item.returnDate ? new Date(item.returnDate).toLocaleDateString() : "N/A"}</td>
                                        <td className="text-center"><button onClick={() => handleReturnBook(item._id)} className="btn btn-error btn-xs md:btn-sm text-white font-bold tracking-wide normal-case px-4 shadow-sm">Return Book</button></td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-16 px-4">
                        <p className="text-base font-bold opacity-60 mb-2">You haven't borrowed any books yet!</p>
                        <p className="text-xs opacity-50 mb-6">Explore the catalog to borrow your favorite titles.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
