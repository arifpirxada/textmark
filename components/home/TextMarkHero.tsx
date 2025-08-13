import Image from 'next/image';
import Link from 'next/link';

const TextMarkHero = () => {
  return (
    <section className=" min-h-screen flex items-center mt-8 lg:mt-0">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
          
          <div className="w-full lg:w-2/5 order-1 lg:order-2">
            <div className="relative">
              <Image
                src="/laptop image.webp"
                alt="Modern workspace with laptop showing Text Mark application"
                width={600}
                height={400}
                className="rounded-lg shadow-2xl w-full h-auto"
                priority
              />
            </div>
          </div>

          <div className="w-full lg:w-1/2 order-2 lg:order-1 text-center lg:text-left">
            <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight mb-6">
              Welcome to Text Mark - Free Markdown Note taking tool
            </h1>
            
            <p className="text-gray-300 text-xl leading-relaxed mb-8 max-w-2xl lg:max-w-none">
              Text Mark is a sleek, modern note-taking application designed for 
              writers, developers, researchers, and anyone who values clean, 
              distraction-free writing. Built with markdown at its core, it combines the 
              simplicity of plain text with the power of rich formatting.
            </p>
            
            <Link href="/" className="inline-flex cursor-pointer items-center gap-2 bg-gray-800 hover:bg-gray-700 text-white px-8 py-4 rounded-lg transition-colors duration-200 font-medium text-lg group">
              Start Taking Notes
              <svg 
                className="w-5 h-5 transform transition-transform group-hover:translate-x-1" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M17 8l4 4m0 0l-4 4m4-4H3" 
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TextMarkHero;