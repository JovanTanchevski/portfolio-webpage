// Home section component - landing page
function Home() {
  return (
    <div className="h-full flex flex-col justify-center items-center text-center z-10 relative">
      <h1 className="text-4xl md:text-6xl font-mono font-bold mb-4">
        Hey! Nice to meet you.
      </h1>
      <p className="text-sm md:text-base text-gray-400 font-mono max-w-2xl mt-12 text-justify">
        Born in 1999 in Bitola, Macedonia. I believe web design can be more diverse and inspiring. 
        With a missing to present the possibilities of web design, 
        I'm pirsuing new expressions through experiments and thoughts.
      </p>
    </div>
  );
}

export default Home;

