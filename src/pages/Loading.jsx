import React from 'react';

const Loading = () => {
    return (
        <div className=''>
            (
      <div className="flex flex-col justify-center items-center h-screen bg-gradient-to-br from-pink-300 via-purple-300 to-blue-300">
       
        <div className="relative flex justify-center items-center">
          <div className="w-32 h-32 border-8 border-transparent border-t-pink-500 border-l-purple-500 border-b-blue-500 border-r-cyan-500 rounded-full animate-spin"></div>
          <div className="absolute w-20 h-20 bg-white rounded-full shadow-inner"></div>
        </div>

        <h2 className="mt-8 text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 animate-pulse">
          Loading... Please wait 💫
        </h2>
      </div>
    );
        </div>
    );
};

export default Loading;