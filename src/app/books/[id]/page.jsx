
"use client";

import { useEffect, useState, Suspense } from "react";
import { useParams, useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

function BookDetailsContent() {
    const { id } = useParams();
    const router = useRouter();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [borrowLoading, setBorrowLoading] = useState(false);
    const [isBorrowOpen, setIsBorrowOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();

    const loggedInUser = session?.user ? {
        name: session.user.name,
        email: session.user.email
    } : {
        name: "Atik Hasan",
        email: "atik@example.com"
    };

    useEffect(() => {
        if (!id || isPending) return;

        const fetchBookDetails = async () => {
            try {
                const tokenResponse = await authClient.token();
                const token = tokenResponse?.data?.token;

                const headers = { "Content-Type": "application/json" };
                if (token) {
                    headers["Authorization"] = `Bearer ${token}`;
                }

                const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${id}`, {
                    headers: headers
                });

                const data = await res.json();
                setBook(data);
            } catch (err) {
                console.error("Error fetching book details:", err);
            } finally {
                setLoading(false);
            }
        };

        fetchBookDetails();
    }, [id, isPending]);

    const handleConfirmBorrow = async (e) => {
        e.preventDefault();
        setBorrowLoading(true);

        const form = e.target;
        const returnDate = form.returnDate.value;

        const borrowData = {
            bookId: book?._id,
            bookTitle: book?.title,
            bookImage: book?.image,
            userEmail: loggedInUser.email,
            userName: loggedInUser.name,
            borrowDate: new Date().toISOString().split('T')[0],
            returnDate: returnDate
        };

        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token;

            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

     
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/borrows`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(borrowData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Book Borrowed Successfully!");
                setIsBorrowOpen(false);

                router.push("/my-borrows");
            } else {
                alert(data.message || "Failed to borrow book");
            }
        } catch (err) {
            console.error("Error borrowing book:", err);
        } finally {
            setBorrowLoading(false);
        }
    };

    if (loading || isPending) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }

    const isAvailable = book?.availableCopies > 0;

    return (
        <div className="max-w-4xl mx-auto px-4 py-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 bg-base-100 p-6 rounded-2xl shadow-xl border border-base-200">
                <div className="w-full h-80 overflow-hidden rounded-xl bg-base-200">
                    <img src={book?.image} alt={book?.title} className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col justify-between space-y-4">
                    <div>
                        <h1 className="text-2xl font-black mb-2">{book?.title}</h1>
                        <p className="text-sm opacity-70 mb-4">By {book?.author}</p>
                        <p className="text-sm">{book?.description}</p>
                        <p className="text-xs font-semibold opacity-60 mt-2">Available Stocks: {book?.availableCopies || 0} Pcs</p>
                    </div>
                    <button onClick={() => setIsBorrowOpen(true)} disabled={!isAvailable} className="btn btn-primary text-white font-bold">
                        {isAvailable ? "Borrow This Book" : "Not Available"}
                    </button>
                </div>
            </div>

            {isBorrowOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-100 max-w-md p-6 rounded-2xl border border-base-300 shadow-2xl">
                        <div className="text-center mb-6"><h3 className="font-black text-xl text-primary">Confirm Book Borrowing</h3></div>
                        <form onSubmit={handleConfirmBorrow} className="space-y-4">
                            <div className="form-control">
                                <label className="label-text font-bold mb-1 text-xs opacity-75">User Name</label>
                                <input type="text" value={loggedInUser.name} readOnly className="input input-bordered input-sm bg-base-200/50 text-base-content/60 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1 text-xs opacity-75">User Email</label>
                                <input type="email" value={loggedInUser.email} readOnly className="input input-bordered input-sm bg-base-200/50 text-base-content/60 cursor-not-allowed" />
                            </div>
                            <div className="form-control">
                                <label className="label-text font-bold mb-1 text-xs text-primary">Return Date</label>
                                <input type="date" name="returnDate" required className="input input-bordered input-sm w-full" />
                            </div>
                            <div className="flex items-center justify-end gap-2 pt-4 border-t">
                                <button type="button" onClick={() => setIsBorrowOpen(false)} className="btn btn-ghost btn-sm">Cancel</button>
                                <button type="submit" disabled={borrowLoading} className="btn btn-primary btn-sm text-white font-bold">{borrowLoading ? "Processing..." : "Confirm"}</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default function BookDetailsPage() {
    return (
        <Suspense fallback={<div className="flex justify-center items-center min-h-[60vh]"><span className="loading loading-spinner loading-lg text-primary"></span></div>}>
            <BookDetailsContent />
        </Suspense>
    );
}

