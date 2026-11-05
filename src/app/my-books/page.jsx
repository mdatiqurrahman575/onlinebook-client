



"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";

export default function MyBooksPage() {
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedBook, setSelectedBook] = useState(null);
    const [actionLoading, setActionLoading] = useState(false);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isDeleteOpen, setIsDeleteOpen] = useState(false);

    const { data: session, isPending } = authClient.useSession();
    const loggedInUser = session?.user;

    const loadMyBooks = async () => {
        if (!loggedInUser?.email) return;
        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token;

            const headers = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-books?email=${loggedInUser.email}`, {
                headers: headers
            });
            const data = await res.json();
            setMyBooks(data || []);
        } catch (err) {
            console.error("Error loading user books:", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!isPending && loggedInUser?.email) {
            loadMyBooks();
        }
    }, [loggedInUser?.email, isPending]);
    const handleDeleteBook = async () => {
        if (!selectedBook) return;
        setActionLoading(true);
        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token;

            const headers = {};
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${selectedBook._id}`, {
                method: "DELETE",
                headers: headers
            });

            if (res.ok) {
                alert("Book Deleted Successfully!");
                setMyBooks(myBooks.filter((b) => b._id !== selectedBook._id));
                setIsDeleteOpen(false);
            }
        } catch (err) {
            console.error("Error deleting book:", err);
        } finally {
            setActionLoading(false);
            setSelectedBook(null);
        }
    };

    const handleEditBook = async (e) => {
        e.preventDefault();
        setActionLoading(true);
        const form = e.target;
        const updatedBook = {
            title: form.title.value,
            author: form.author.value,
            category: form.category.value,
            image: form.image.value,
            totalCopies: form.totalCopies.value,
            description: form.description.value,
        };

        try {
            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token;

            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`;
            }

            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books/${selectedBook._id}`, {
                method: "PATCH",
                headers: headers,
                body: JSON.stringify(updatedBook),
            });

            if (res.ok) {
                alert("Book Updated Successfully!");
                loadMyBooks();
                setIsEditOpen(false);
            }
        } catch (err) {
            console.error("Error updating book:", err);
        } finally {
            setActionLoading(false);
            setSelectedBook(null);
        }
    };

    if (isPending || (loading && loggedInUser?.email)) {
        return (
            <div className="flex justify-center py-12 min-h-[60vh] items-center"><span className="loading loading-spinner text-primary loading-lg"></span></div>
        );
    }

    if (!loggedInUser) {
        return (
            <div className="text-center py-20 min-h-[60vh]"><p className="text-error font-bold">Please login to manage your added books.</p></div>
        );
    }
    return (
        <div className="max-w-6xl mx-auto px-4 py-12 min-h-[60vh]">
            <div className="text-center mb-8"><h1 className="text-2xl font-black mb-1">My Books</h1><p className="text-xs opacity-70">Manage your books.</p></div>
            <div className="bg-base-100 shadow-md border rounded-xl overflow-hidden">
                {myBooks.length > 0 ? (
                    <div className="overflow-x-auto w-full">
                        <table className="table table-zebra w-full">
                            <thead><tr className="bg-base-200"><th>Book</th><th>Title</th><th>Category</th><th>Stock</th><th className="text-center">Actions</th></tr></thead>
                            <tbody>
                                {myBooks.map((book) => (
                                    <tr key={book._id}>
                                        <td><div className="avatar"><div className="w-10 h-14 rounded-md"><img src={book.image} alt="Book" /></div></div></td>
                                        <td className="font-bold truncate max-w-[150px]">{book.title}</td><td>{book.category}</td><td>{book.totalCopies || 0} Pcs</td>
                                        <td className="text-center space-x-1">
                                            <button onClick={() => { setSelectedBook(book); setIsEditOpen(true); }} className="btn btn-primary btn-xs text-white">Edit</button>
                                            <button onClick={() => { setSelectedBook(book); setIsDeleteOpen(true); }} className="btn btn-error btn-xs text-white">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (<div className="text-center py-12"><p className="text-sm font-bold opacity-60">No books found!</p></div>)}
            </div>

            {/* EDIT MODAL */}
            {isEditOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-100 p-5">
                        <h3 className="font-black text-sm text-primary mb-4 text-center">Update Book Details</h3>
                        {selectedBook && (
                            <form onSubmit={handleEditBook} className="space-y-3">
                                <input type="text" name="title" defaultValue={selectedBook.title} required className="input input-bordered input-sm w-full" placeholder="Title" />
                                <input type="text" name="author" defaultValue={selectedBook.author} required className="input input-bordered input-sm w-full" placeholder="Author" />
                                <input type="number" name="totalCopies" defaultValue={selectedBook.totalCopies} required className="input input-bordered input-sm w-full" placeholder="Copies" />
                                <select name="category" defaultValue={selectedBook.category} className="select select-bordered select-sm w-full" required>
                                    <option value="Fiction">Fiction</option><option value="Science">Science</option><option value="History">History</option><option value="Kids">Kids</option><option value="Others">Others</option>
                                </select>
                                <input type="url" name="image" defaultValue={selectedBook.image} required className="input input-bordered input-sm w-full" placeholder="Image URL" />
                                <textarea name="description" defaultValue={selectedBook.description} required className="textarea textarea-bordered textarea-sm w-full h-16" placeholder="Description" />
                                <div className="modal-action gap-2">
                                    <button type="submit" disabled={actionLoading} className="btn btn-primary btn-sm text-white">{actionLoading ? "Saving..." : "Save"}</button>
                                    <button type="button" onClick={() => setIsEditOpen(false)} className="btn btn-ghost btn-sm">Cancel</button>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}


            {isDeleteOpen && (
                <div className="modal modal-open">
                    <div className="modal-box bg-base-100 p-5 text-center">
                        <h3 className="font-black text-base mb-2">Are you sure?</h3><p className="text-xs opacity-70 mb-4">Permanent action.</p>
                        <div className="flex items-center justify-center gap-2">
                            <button onClick={handleDeleteBook} disabled={actionLoading} className="btn btn-error btn-sm text-white">{actionLoading ? "Deleting..." : "Yes, Delete"}</button>
                            <button type="button" onClick={() => setIsDeleteOpen(false)} className="btn btn-ghost btn-sm">Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
