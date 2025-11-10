// Info section component - personal information and bio
function Info() {
  return (
    <div className="h-full flex flex-col z-10 relative overflow-hidden">
      <div className="max-w-3xl mx-auto w-full h-full flex flex-col">
        <h1 className="text-3xl md:text-5xl font-mono font-bold mb-8">Info</h1>
        <div className="flex-1 overflow-y-auto space-y-6 text-gray-300 font-mono pr-2">
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">About</h2>
            <p className="mb-4">
              I am a front-end developer born in 1999 in Bitola, Macedonia.
            </p>
            <p className="mb-4">
              I specialize in building modern, responsive web interfaces using React, Vite, and Three.js.
            </p>
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Technologies</h2>
            <ul className="list-disc list-inside space-y-2">
              <li>React & React Hooks</li>
              <li>TypeScript</li>
              <li>Vite</li>
              <li>Tailwind CSS</li>
              <li>Three.js & WebGL</li>
              <li>Node.js & Express</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl md:text-2xl font-bold mb-4 text-white">Location</h2>
            <p>Bitola, Macedonia</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Info;

