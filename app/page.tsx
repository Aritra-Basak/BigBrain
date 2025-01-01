"use client";

import React, { useEffect, useRef } from 'react';
import { SignInButton } from "@clerk/nextjs";
import Image from "next/image";
import { Authenticated, Unauthenticated } from "convex/react";

const Particle = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // This function sets the width and height of the canvas to match the window's dimensions. It is called initially and whenever the window is resized.
    const setCanvasSize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    // Particle class -- This class represents a single particle in the animation.
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      canvasWidth: number;
      canvasHeight: number;

      constructor(width: number, height: number) {
        this.canvasWidth = width;
        this.canvasHeight = height;
        this.x = Math.random() * this.canvasWidth;
        this.y = Math.random() * this.canvasHeight;
        this.size = Math.random() * 3 + 1;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 2 - 1;
        const colors = ['#f7287e', '#6057e6', '#5cf2f0'];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      //Updates the particle's position based on its speed. It wraps the particle around the canvas edges.
      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > this.canvasWidth) this.x = 0;
        if (this.x < 0) this.x = this.canvasWidth;
        if (this.y > this.canvasHeight) this.y = 0;
        if (this.y < 0) this.y = this.canvasHeight;
      }

      //Draws the particle on the canvas using the provided rendering context.
      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    // Create particle array
    const particleArray: Particle[] = [];
    const numberOfParticles = 50;

    //This function initializes the particle array by creating a specified number of Particle instances and adding them to the particleArray
    const initParticles = () => {
      particleArray.length = 0;
      for (let i = 0; i < numberOfParticles; i++) {
        particleArray.push(new Particle(canvas.width, canvas.height));
      }
    };

    initParticles();

    // Handle resize
    window.addEventListener('resize', () => {
      if (!canvas) return;
      setCanvasSize();
      initParticles();
    });

    // Animation function -- This function is responsible for the animation loop. It clears the canvas, updates and draws each particle.
    const animate = () => {
      if (!ctx || !canvas) return;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particleArray.forEach(particle => {
        particle.update();
        particle.draw(ctx);
      });

      //requestAnimationFrame is a method provided by the browser's API that is used to create smooth animations in web applications.
      //the browser schedules the callback function to be executed before the next repaint. The browser will call this function once per frame, allowing you to update the animation state and redraw the scene.
      requestAnimationFrame(animate);
    };

    animate();

    // Cleanup
    return () => {
      //This code ensures that when the component is unmounted (i.e., removed from the DOM), the event listener for the resize event is removed. 
      //This is important for preventing memory leaks and ensuring that the application does not continue to listen for resize events when the component is no longer in use.
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute top-0 left-0 w-full h-full"
      style={{ opacity: 0.2 }}
    />
  );
};

const LandingPage = () => {
  return (
    <div className="bg-slate-200 dark:bg-slate-950 h-screen overflow-hidden relative">
      <Particle />
      
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="mx-auto max-w-2xl py-12 relative z-10">
          <div className="text-center">
            <div className="relative inline-block">
              <Image
                src="/logo.png"
                width="200"
                height="200"
                alt="logo of bigBrain"
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
              <Authenticated>
                <button className="cssbuttons-io-button" onClick={() => window.location.href='/dashboard'}> Get started
                    <div className="icon">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                    </div>
                </button>
              </Authenticated>
              <Unauthenticated>
                <SignInButton>
                  <button className="cssbuttons-io-button"> Get started
                    <div className="icon">
                      <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
                    </div>
                  </button>
                </SignInButton>
              </Unauthenticated>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;