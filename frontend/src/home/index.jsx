import Header from '@/components/ui/custom/Header'
import { UserButton } from '@clerk/clerk-react'
import { AtomIcon, Edit, Share2 } from 'lucide-react'
import React from 'react'
import Tilt from 'react-parallax-tilt'

function Home() {
  return (
    <div>
      <Header />
      <div>
        {/* <img src={'/grid.svg'} className="absolute z-[-10] w-full" 
        width={1200} height={300} /> */}

        <section className="z-50">
          <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-12 lg:px-12">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Build Your Resume <span className="text-primary">With AI</span>
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 xl:px-48 dark:text-gray-400">
              Effortlessly Craft a Standout Resume with Our AI-Powered Builder
            </p>
            <div className="flex flex-col mb-6 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a
                href="/dashboard"
                className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-primary hover:bg-primary focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
              >
                Get Started
                <svg
                  className="ml-2 -mr-1 w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </a>
            </div>

            <div className="flex justify-center">
              <Tilt
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="#ffffff"
                glarePosition="right"
                scale={1.03}
                transitionSpeed={400}
                className="mt-2 mb-4"
              >
                <div className="w-full max-w-screen-md h-24 bg-gradient-to-r from-primary to-purple-600 rounded-xl shadow-lg flex items-center justify-center border border-gray-200">
                  <p className="text-white text-2xl font-bold text-center px-6 tracking-wide">
                    ⚡ Supercharge Your Career with AI-Powered Resumes ⚡
                  </p>
                </div>
              </Tilt>
            </div>
          </div>
        </section>

        <section className="py-6 bg-white z-50 px-4 mx-auto max-w-screen-xl text-center lg:py-12 lg:px-12">
          <h2 className="font-bold text-3xl">How it Works?</h2>
          <h2 className="text-md text-gray-500">Build your resume in just 3 simple steps</h2>

          <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <AtomIcon className="h-8 w-8" />
              <h2 className="mt-4 text-xl font-bold text-black">Write Your Resume Content</h2>
              <p className="mt-1 text-sm text-gray-600">
                Start by entering your details, skills, and experiences. Our AI will guide you to create a professional resume.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Edit className="h-8 w-8" />
              <h2 className="mt-4 text-xl font-bold text-black">Edit & Customize</h2>
              <p className="mt-1 text-sm text-gray-600">
                Use our intuitive editor to tweak and perfect your resume. Add sections, rearrange content, and choose from multiple templates.
              </p>
            </a>

            <a
              className="block rounded-xl border bg-white border-gray-200 p-8 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
              href="#"
            >
              <Share2 className="h-8 w-8" />
              <h2 className="mt-4 text-xl font-bold text-black">Download & Share</h2>
              <p className="mt-1 text-sm text-gray-600">
                Once you're satisfied, download your resume in PDF format or share it directly with employers.
              </p>
            </a>
          </div>
        </section>
      </div>
    </div>
  )
}

export default Home
