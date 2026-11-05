
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client"; 

export default function AddBookPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);


    const { data: session, isPending } = authClient.useSession();
    const loggedInUser = session?.user;

 
    const handleAddBook = async (e) => {
        e.preventDefault();
        setLoading(true);

        const form = e.target;
        const bookData = {
            title: form.title.value,
            author: form.author.value,
            category: form.category.value,
            image: form.image.value,
            quantity: form.quantity.value,
            description: form.description.value,
            userName: loggedInUser?.name || "Anonymous",
            userEmail: loggedInUser?.email
        };

        try {

            const tokenResponse = await authClient.token();
            const token = tokenResponse?.data?.token;

            const headers = { "Content-Type": "application/json" };
            if (token) {
                headers["Authorization"] = `Bearer ${token}`; 
            }


            const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/books`, {
                method: "POST",
                headers: headers,
                body: JSON.stringify(bookData),
            });

            const data = await res.json();

            if (res.ok) {
                alert("Book Added Successfully!");
                form.reset();
                router.push("/books");
            } else {
                alert(data.message || "Something went wrong!");
            }
        } catch (err) {
            console.error("Error adding book:", err);
            alert("Failed to connect to the server.");
        } finally {
            setLoading(false);
        }
    };

    
    if (isPending) {
        return (
            <div className="flex justify-center items-center min-h-[60vh]">
                <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
        );
    }


    if (!loggedInUser) {
        return (
            <div className="text-center py-20 min-h-[60vh]">
                <p className="text-error font-bold text-lg mb-4">Access Denied!</p>
                <p className="text-sm opacity-70">Please login to your account to add a new book to the library.</p>
            </div>
        );
    }
    return (
        <div className="max-w-2xl mx-auto px-4 py-12 min-h-[70vh]">
            <div className="bg-base-100 shadow-2xl border border-base-200 p-8 rounded-3xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-black text-primary mb-2">✨ Add New Book</h1>
                    <p className="text-xs opacity-75">Fill up the details below to add a book into library collection.</p>
                </div>

                <form onSubmit={handleAddBook} className="space-y-4">
                    {/* Book Title */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1 text-xs opacity-80">Book Title</label>
                        <input type="text" name="title" required placeholder="Enter book title" className="input input-bordered input-md w-full rounded-xl" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Author Name */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-1 text-xs opacity-80">Author Name</label>
                            <input type="text" name="author" required placeholder="Enter author name" className="input input-bordered input-md w-full rounded-xl" />
                        </div>
                        {/* Quantity/Copies */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-1 text-xs opacity-80">Total Copies (Quantity)</label>
                            <input type="number" name="quantity" min="1" required placeholder="e.g. 5" className="input input-bordered input-md w-full rounded-xl" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Category */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-1 text-xs opacity-80">Category</label>
                            <select name="category" required className="select select-bordered select-md w-full rounded-xl">
                                <option value="Fiction">Fiction</option>
                                <option value="Science">Science</option>
                                <option value="History">History</option>
                                <option value="Kids">Kids</option>
                                <option value="Others">Others</option>
                            </select>
                        </div>
                        {/* Image URL */}
                        <div className="form-control">
                            <label className="label-text font-bold mb-1 text-xs opacity-80">Book Cover Image URL</label>
                            <input type="url" name="image" required placeholder="https://example.com" className="input input-bordered input-md w-full rounded-xl" />
                        </div>
                    </div>

                    {/* Short Description */}
                    <div className="form-control">
                        <label className="label-text font-bold mb-1 text-xs opacity-80">Short Description</label>
                        <textarea name="description" required placeholder="Write a short summary about this book..." className="textarea textarea-bordered textarea-md w-full h-24 rounded-xl" />
                    </div>

                    {/* User Info Fields (Read Only) */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 opacity-70">
                        <div className="form-control">
                            <label className="label-text font-medium mb-1 text-[11px]">Adder Name</label>
                            <input type="text" value={loggedInUser?.name || ""} readOnly className="input input-bordered input-sm bg-base-200 cursor-not-allowed rounded-lg" />
                        </div>
                        <div className="form-control">
                            <label className="label-text font-medium mb-1 text-[11px]">Adder Email</label>
                            <input type="email" value={loggedInUser?.email || ""} readOnly className="input input-bordered input-sm bg-base-200 cursor-not-allowed rounded-lg" />
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="pt-4">
                        <button type="submit" disabled={loading} className="btn btn-primary btn-block text-white font-bold rounded-xl tracking-wide">
                            {loading ? "Adding Book to Database..." : "Add Book Now"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
