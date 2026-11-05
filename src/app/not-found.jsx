"use client";

import Link from "next/link";

export default function NotFound() {
    return (
        <div className="min-h-[75vh] flex flex-col justify-center items-center px-6 text-center text-base-content">
            <div className="space-y-4 max-w-md">
                <h1 className="text-8xl font-black text-primary tracking-widest animate-bounce">
                    404
                </h1>
                <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                    Page Not Found
                </h2>
                <p className="text-sm opacity-70">
                    Sorry, the page you are looking for doesn't exist or has been moved to a new destination.
                </p>
                <div className="pt-4">
                    {/* Requirement: Back to Home Page Button */}
                    <Link
                        href="/"
                        className="btn btn-primary px-8 text-white font-bold shadow-md normal-case"
                    >
                        Back to Home
                    </Link>
                </div>
            </div>
        </div>
    );
}
