"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);


    const [showPassword, setShowPassword] = useState(false);

    const validatePassword = (password) => {
        if (password.length < 6) {
            return "Password must be at least 6 characters long.";
        }
        if (!/[A-Z]/.test(password)) {
            return "Password must contain at least one uppercase letter (A-Z).";
        }
        if (!/[a-z]/.test(password)) {
            return "Password must contain at least one lowercase letter (a-z).";
        }
        return "";
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const photoUrl = form.photoUrl.value;
        const password = form.password.value;

        const passwordError = validatePassword(password);
        if (passwordError) {
            setErrorMsg(passwordError);
            setLoading(false);
            return;
        }

        const { data, error } = await authClient.signUp.email({
            email,
            password,
            name,
            image: photoUrl,
            callbackURL: "/",
        });

        if (error) {
            setErrorMsg(error.message || "Registration failed.");
            setLoading(false);
        } else {
            alert("Registration Successful!");
            form.reset();
            router.push("/");
        }
    };

    const handleGoogleLogin = async () => {
        setErrorMsg("");
        try {
            await authClient.signIn.social({
                provider: "google",
                callbackURL: "/",
            });
        } catch (err) {
            console.error(err);
            setErrorMsg("Google authentication failed.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl border p-5 md:p-6 text-base-content">

                <div className="text-center mb-5">
                    <h2 className="text-2xl font-black">Create Account</h2>
                    <p className="text-xs opacity-70 mt-1">Join BookNook Library today</p>
                </div>

                {errorMsg && (
                    <div className="p-3 bg-error/10 border border-error/20 text-error text-xs font-semibold rounded-lg mb-4 text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleRegister} className="space-y-3">
                    <div className="form-control">
                        <label className="label-text font-bold text-xs mb-1">Full Name</label>
                        <input type="text" name="name" placeholder="John Doe" className="input input-bordered input-sm w-full" required />
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold text-xs mb-1">Email Address</label>
                        <input type="email" name="email" placeholder="john@example.com" className="input input-bordered input-sm w-full" required />
                    </div>

                    <div className="form-control">
                        <label className="label-text font-bold text-xs mb-1">Photo URL</label>
                        <input type="url" name="photoUrl" placeholder="https://example.com" className="input input-bordered input-sm w-full" required />
                    </div>

                    
                    <div className="form-control">
                        <label className="label-text font-bold text-xs mb-1">Password</label>
                        <div className="relative flex items-center">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                placeholder="••••••••"
                                className="input input-bordered input-sm w-full pr-10 text-base-content"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 text-sm opacity-60 hover:opacity-100 transition-opacity focus:outline-none"
                                title={showPassword ? "Hide password" : "Show password"}
                            >
                                {showPassword ? "👁️" : "🙈"}
                            </button>
                        </div>
                    </div>

                    <button type="submit" disabled={loading} className="btn btn-primary btn-sm btn-block text-white font-bold mt-2 normal-case">
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <div className="divider text-[10px] opacity-50 uppercase my-4">OR</div>

                <button onClick={handleGoogleLogin} type="button" className="btn btn-outline btn-sm btn-block normal-case font-bold flex items-center justify-center gap-2">
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l3.66-2.85z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                <p className="text-center text-xs opacity-80 mt-4">
                    Already have an account?{" "}
                    <Link href="/login" className="text-primary font-bold hover:underline">
                        Login
                    </Link>
                </p>

            </div>
        </div>
    );
};
