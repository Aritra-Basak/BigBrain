"use client";

import React from 'react';
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";

const LandingPage = () => {
  return (
    <div className="bg-slate-200 dark:bg-slate-950 h-screen overflow-hidden relative">
      {/* Minimalistic animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-20"
            style={{
              background: i === 0 ? '#ff80b5' : i === 1 ? '#9089fc' : '#8080ff',
              width: `${300 + i * 100}px`,
              height: `${300 + i * 100}px`,
              left: `${i * 30}%`,
              top: `${20 + i * 20}%`,
              animation: `float-minimal-${i + 1} ${20 + i * 5}s infinite linear`
            }}
          />
        ))}
      </div>

      <div className="relative isolate px-6 pt-14 lg:px-8">
        {/* Subtle gradient overlay */}
        <div
          className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem] transition-all duration-1000 ease-in-out animate-[gradient-minimal_30s_linear_infinite]"
            style={{
              clipPath: "circle(50% at 50% 50%)"
            }}
          />
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-2xl py-12 relative z-10">
          <div className="text-center">
            <div className="relative inline-block">
              <Image
                src="/logo.png"
                width="200"
                height="200"
                alt="a woman holding a document"
                className="mx-auto rounded-2xl mb-4 hover:scale-105 transition-transform duration-300"
              />
            </div>
            <h1 className="dark:text-gray-50 text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl animate-[fadeIn_1.5s_ease-out]">
              Take Control of your Documentation
            </h1>
            <p className="dark:text-gray-100 mt-6 text-lg leading-8 text-gray-600 animate-[fadeIn_2s_ease-out]">
              <span className="text-red-500 font-bold">Big Brain</span> acts as your team&apos;s second brain, storing all your docs
              and allowing easy vector search.
            </p>
            <div className="mt-10 flex items-center justify-center gap-x-6 animate-[fadeIn_2.5s_ease-out]">
              <SignInButton>
                <button className="cssbuttons-io-button"> Get started
                  <div className="icon">
                    <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                  </div>
                </button>
              </SignInButton>
            </div>
          </div>
        </div>

        {/* Bottom subtle gradient */}
        <div
          className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]"
          aria-hidden="true"
        >
          <div
            className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-20 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem] transition-all duration-1000 ease-in-out animate-[gradient-minimal_30s_linear_infinite]"
            style={{
              clipPath: "circle(50% at 50% 50%)"
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;