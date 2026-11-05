'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

// Swiper CSS
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 min-h-screen transition-colors duration-300">


      <section className="w-full h-[70vh] md:h-[80vh] px-4 md:px-8 py-6">
        {mounted && (
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            navigation={true}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="h-full w-full rounded-3xl overflow-hidden shadow-2xl"
          >
   
            <SwiperSlide>

              <div
                className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-center p-6 px-12 md:px-24"
                style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('https://unsplash.com')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>


                <div className="max-w-2xl z-10 flex flex-col items-center justify-center">
                  <span className="text-emerald-400 font-bold tracking-widest text-xs uppercase bg-emerald-500/20 px-3 py-1 rounded-full mb-5 inline-block">
                    ✨ Next-Gen Library
                  </span>
                  <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-4 text-white leading-tight">
                    Welcome to <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">BookNook Portal</span>
                  </h1>
                  <p className="text-xs md:text-sm mb-8 text-slate-200 leading-relaxed max-w-lg mx-auto">
                    Dive into an automated workspace architecture designed to seamlessly bridge brilliant minds with the world's finest literature.
                  </p>
                  <Link href="/books" className="btn btn-sm md:btn-md bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 border-none text-white px-8 rounded-xl font-bold shadow-lg shadow-emerald-500/30 transition-all transform hover:-translate-y-0.5">
                    Explore Inventory
                  </Link>
                </div>
              </div>
            </SwiperSlide>

            {/* Slide 2 */}
            <SwiperSlide>
              <div
                className="w-full h-full bg-cover bg-center flex flex-col items-center justify-center text-center p-6 px-12 md:px-24"
                style={{ backgroundImage: "linear-gradient(rgba(15,23,42,0.75), rgba(15,23,42,0.75)), url('https://unsplash.com')" }}
              >
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none"></div>

                <div className="max-w-2xl z-10 flex flex-col items-center justify-center">
                  <span className="text-sky-400 font-bold tracking-widest text-xs uppercase bg-sky-500/20 px-3 py-1 rounded-full mb-5 inline-block">
                    🔒 JWT Encrypted
                  </span>
                  <h1 className="text-3xl md:text-6xl font-black tracking-tight mb-4 text-white leading-tight">
                    Borrow & Return <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-indigo-400">With Absolute Ease</span>
                  </h1>
                  <p className="text-xs md:text-sm mb-8 text-slate-200 leading-relaxed max-w-lg mx-auto">
                    Track active operations, manage secure operational logs, and instantly return assets with lightning-fast backend precision.
                  </p>
                  <Link href="/books" className="btn btn-sm md:btn-md bg-gradient-to-r from-sky-500 to-indigo-500 border-none text-white px-8 rounded-xl font-bold shadow-lg shadow-sky-500/30 transition-all transform hover:-translate-y-0.5">
                    Browse Books
                  </Link>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        )}
      </section>

      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="text-center max-w-xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">🛠️ Automated Operation Pipeline</h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">Discover how simple it is to explore, authenticate, and lease knowledge blocks inside our system.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 flex items-center justify-center text-lg font-black mb-6 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-white transition-all">01</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Query Digital Index</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Browse our fully public literature index grid. Read summarized overviews and real-time copy values instantly.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-sky-500/10 dark:bg-sky-500/20 text-sky-600 dark:text-sky-400 flex items-center justify-center text-lg font-black mb-6 border border-sky-500/20 group-hover:bg-sky-500 group-hover:text-white transition-all">02</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">JWT Verification</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Secure your terminal session through BetterAuth. Claims verification protects active operations and locks private routes.</p>
          </div>

          <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400 flex items-center justify-center text-lg font-black mb-6 border border-purple-500/20 group-hover:bg-purple-500 group-hover:text-white transition-all">03</div>
            <h3 className="text-xl font-bold mb-3 text-slate-900 dark:text-white">Dynamic Asset Lease</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">Confirm your dates inside our quick modal. Watch system storage counters adapt and auto-update across your private space.</p>
          </div>
        </div>
      </section>

 
      <section className="bg-white dark:bg-slate-900 border-t border-b border-slate-200/60 dark:border-slate-800/60 py-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mb-3">📚 Explore Core Disciplines</h2>
            <p className="text-sm text-slate-500 dark:text-slate-400">We structure community literature into precise technical domains for structured knowledge development.</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center hover:scale-105 transition-transform cursor-pointer">
              <span className="text-3xl mb-3 block">🔬</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Science</h4>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center hover:scale-105 transition-transform cursor-pointer">
              <span className="text-3xl mb-3 block">🎨</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Fiction</h4>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center hover:scale-105 transition-transform cursor-pointer">
              <span className="text-3xl mb-3 block">📜</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">History</h4>
            </div>
            <div className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 text-center hover:scale-105 transition-transform cursor-pointer">
              <span className="text-3xl mb-3 block">🧸</span>
              <h4 className="font-bold text-slate-900 dark:text-white text-base">Kids</h4>
            </div>
          </div>
        </div>
      </section>


      <section className="container mx-auto px-4 md:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <span className="text-emerald-500 font-bold uppercase tracking-wider text-xs bg-emerald-500/10 px-3 py-1 rounded-md mb-4 inline-block">Platform Stability</span>
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 dark:text-white mb-6 tracking-tight leading-tight">Engineered For Fluid Operations.</h2>
            <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 leading-relaxed">BookNook delivers an uncompromising single-page-application interface that remains persistent across navigation routing. No refresh delays, no authentication loss on route reload.</p>
            <div className="flex gap-8 border-t border-slate-200 dark:border-slate-800 pt-6 mt-8">
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-white block">100%</span>
                <span className="text-xs text-slate-400 uppercase tracking-wide">SPA Route Reload Safety</span>
              </div>
              <div>
                <span className="text-3xl font-black text-slate-900 dark:text-white block">&lt; 50ms</span>
                <span className="text-xs text-slate-400 uppercase tracking-wide">JWT Guard Validation</span>
              </div>
            </div>
          </div>
          <div className="bg-gradient-to-tr from-slate-900 to-slate-800 p-8 rounded-3xl text-white shadow-xl border border-white/5 relative overflow-hidden h-64 flex flex-col justify-center">
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-2xl"></div>
            <p className="italic text-lg text-slate-300 mb-6 leading-relaxed">"The structural uniformity across light and dark modes, paired with dynamic modal configurations, makes managing digital rentals surprisingly delightful."</p>
            <h4 className="font-bold text-emerald-400 text-sm">- Technical Review Panel</h4>
          </div>
        </div>
      </section>

    </div>
  );
}

