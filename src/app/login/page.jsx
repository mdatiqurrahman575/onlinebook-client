"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";

export default function LoginPage() {
    const router = useRouter();
    const [errorMsg, setErrorMsg] = useState("");
    const [loading, setLoading] = useState(false);

   
    const [showPassword, setShowPassword] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        setErrorMsg("");
        setLoading(true);

        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;

        const { data, error } = await authClient.signIn.email({
            email,
            password,
            callbackURL: "/",
        });

        if (error) {
            setErrorMsg(error.message || "Invalid email or password.");
            setLoading(false);
        } else {
            
            form.reset();
            router.push("/");
        }
    };

    const handleGoogleLogin = async () => {
        await authClient.signIn.social({
            provider: "google",
            callbackURL: "/", 
        });
    };

    return (
        <div className="flex justify-center items-center min-h-[80vh] px-4 py-8">
            <div className="card bg-base-100 w-full max-w-sm shadow-xl border p-5 md:p-6 text-base-content">

                <div className="text-center mb-5">
                    <h2 className="text-2xl font-black">Welcome Back</h2>
                    <p className="text-xs opacity-70 mt-1">Login to your BookNook account</p>
                </div>

                {errorMsg && (
                    <div className="p-3 bg-error/10 border border-error/20 text-error text-xs font-semibold rounded-lg mb-4 text-center">
                        {errorMsg}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="form-control">
                        <label className="label-text font-bold text-xs mb-1">Email Address</label>
                        <input type="email" name="email" placeholder="john@example.com" className="input input-bordered input-sm w-full" required />
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

                    <button type="submit" disabled={loading} className="btn btn-primary btn-sm btn-block text-white font-bold tracking-wide normal-case mt-2">
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

               
                <div className="divider text-xs opacity-50 my-4">OR</div>

              
                <button 
                    type="button"
                    onClick={handleGoogleLogin} 
                    className="btn btn-outline btn-sm btn-block flex items-center justify-center gap-2 border-base-content/20 hover:bg-base-200 normal-case font-bold tracking-wide"
                >
                    <svg className="h-4 w-4" viewBox="0 0 24 24" width="24" height="24" xmlns="http://w3.org">
                        <g transform="matrix(1, 0, 0, 1, 0, 0)">
                            <path d="M21.35,11.1H12v2.7h5.38c-0.24,1.28 -0.96,2.37 -2.04,3.1v2.58h3.3c1.93,-1.78 3.04,-4.4 3.04,-7.4c0,-0.71 -0.06,-1.4 -0.17,-1.98Z" fill="#4285F4" />
                            <path d="M12,20.62c2.43,0 4.47,-0.81 5.96,-2.18l-3.3,-2.58c-0.92,0.62 -2.1,0.98 -3.5,0.98c-2.69,0 -4.97,-1.82 -5.78,-4.27H1.95v2.66c1.48,2.94 4.53,4.96 8.05,4.96Z" fill="#34A853" />
                            <path d="M6.22,12.57c-0.21,-0.62 -0.33,-1.29 -0.33,-1.97s0.12,-1.35 0.33,-1.97V5.97H1.95c-0.72,1.43 -1.13,3.05 -1.13,4.76s0.41,3.33 1.13,4.76l4.27,-2.92Z" fill="#FBBC05" />
                            <path d="M12,5.16c1.32,0 2.5,0.45 3.44,1.35l2.58,-2.58C16.46,2.46 14.42,1.62 12,1.62c-3.52,0 -6.57,2.02 -8.05,4.96l4.27,2.92c0.81,-2.45 3.09,-4.27 5.78,-4.27Z" fill="#EA4335" />
                        </g>
                    </svg>
                    Continue with Google
                </button>

                <p className="text-center text-xs opacity-80 mt-4">
                    Don't have an account?{" "}
                    <Link href="/register" className="text-primary font-bold hover:underline">
                        Register
                    </Link>
                </p>

            </div>
        </div>
    );
}
