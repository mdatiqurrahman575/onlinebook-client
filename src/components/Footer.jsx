"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Footer() {
    const [currentYear, setCurrentYear] = useState(2026);

    // Solves Hydration Error by setting year on client-side mount
    useEffect(() => {
        setCurrentYear(new Date().getFullYear());
    }, []);

    return (
        <footer className="bg-base-200 text-base-content border-t-2 border-gradient-to-r from-primary to-secondary relative">
            {/* Top Accent Line */}
            <div className="h-1 w-full bg-gradient-to-r from-primary via-accent to-secondary"></div>

            {/* Main Footer Container (3 Columns Layout) */}
            <div className="max-w-7xl mx-auto px-6 md:px-8 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">

                {/* Column 1: Brand Info */}
                <div className="space-y-4">
                    <Link href="/" className="flex items-center gap-2 text-2xl font-black tracking-wider text-primary">
                        <div className="p-2 bg-primary/10 rounded-xl text-primary shadow-inner">
                            <svg xmlns="http://w3.org" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
                            </svg>
                        </div>
                        <span>BookNook</span>
                    </Link>
                    <p className="text-sm leading-relaxed opacity-85">
                        A modern digital platform to explore, read, and borrow your favorite books. Easily manage listings and share the joy of reading.
                    </p>
                </div>

                {/* Column 2: Contact & Support */}
                <div>
                    <h6 className="text-base-content font-bold text-sm tracking-widest uppercase mb-4 text-primary">Contact & Support</h6>
                    <ul className="space-y-2 text-sm opacity-90">
                        <li className="flex items-center gap-2">
                            <span className="text-secondary font-bold">Email:</span> support@booknook.com
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-secondary font-bold">Phone:</span> +880 1234-567890
                        </li>
                        <li className="flex items-center gap-2">
                            <span className="text-secondary font-bold">Address:</span> Dhaka, Bangladesh
                        </li>
                    </ul>
                </div>

                {/* Column 3: Social Connect */}
                <div className="space-y-4">
                    <h6 className="text-base-content font-bold text-sm tracking-widest uppercase text-primary">Social Networks</h6>
                    <p className="text-xs opacity-80">Stay connected with us on social media for the latest library updates.</p>
                    <div className="flex gap-3">
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-circle bg-base-100 border-base-300 hover:bg-primary hover:text-white transition-all shadow-sm" aria-label="Facebook">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M9 8H7v3h2v9h3v-9h3l.5-3H12V6c0-.88.39-1 1-1h2V2h-3c-2.42 0-4 1.35-4 3.75V8z" />
                            </svg>
                        </a>
                        {/* New X Logo */}
                        <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-circle bg-base-100 border-base-300 hover:bg-neutral hover:text-white transition-all shadow-sm" aria-label="X">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="btn btn-sm btn-circle bg-base-100 border-base-300 hover:bg-pink-600 hover:text-white transition-all shadow-sm" aria-label="Instagram">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                            </svg>
                        </a>
                    </div>
                </div>

            </div>


            <div className="bg-base-300 py-4 px-6 text-center text-xs font-medium opacity-80 border-t border-base-100">
                <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
                    <p>© {currentYear} <span className="font-bold text-primary">BookNook</span> - All rights reserved by Pixel Galaxies.</p>
                    <div className="flex gap-4 text-xs opacity-70">
                        <a href="#" className="hover:underline">Privacy Policy</a>
                        <a href="#" className="hover:underline">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}
