import Image from "next/image";

function Hero() {
  return (
    <header className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 bg-center bg-cover bg-no-repeat sm:p-16 py-16 px-8 flex justify-center lg:items-center max-lg:flex-col w-full sm:gap-16 gap-0 overflow-hidden hero-container">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-20 left-10 w-2 h-2 bg-pink-400 rounded-full animate-pulse"></div>
        <div className="absolute top-40 right-20 w-1 h-1 bg-cyan-400 rounded-full animate-ping"></div>
        <div className="absolute bottom-32 left-20 w-1.5 h-1.5 bg-yellow-400 rounded-full animate-pulse"></div>
        <div className="absolute bottom-20 right-32 w-1 h-1 bg-purple-400 rounded-full animate-ping"></div>
      </div>
      
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30"></div>
      
      <div className="flex-1 flex flex-col gap-10 relative z-10">
        <div className="transform hover:scale-105 transition-transform duration-500">
          <Image
            src="./logo.svg"
            alt="logo"
            width={101}
            height={96}
            className="object-contain drop-shadow-2xl"
          />
        </div>
        <h1 className="sm:text-6xl text-5xl text-white lg:max-w-lg font-bold leading-[120%] transform hover:scale-[1.02] transition-all duration-300">
          Explore The{" "}
          <span className="relative inline-block">
            <span className="red-gradient animate-pulse">Diverse Realms</span>
            <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-pink-600 rounded-lg blur opacity-25 animate-pulse"></div>
          </span>{" "}
          of Anime Magic
        </h1>
      </div>
      
      <div className="lg:flex-1 relative w-full h-[50vh] justify-center z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-purple-500/20 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="relative w-full h-full transform hover:scale-105 transition-all duration-700 hover:rotate-1 floating-anime">
          <Image 
            src="/anime.png" 
            alt="anime" 
            fill 
            className="object-contain drop-shadow-2xl" 
          />
        </div>
      </div>
    </header>
  );
}

export default Hero;