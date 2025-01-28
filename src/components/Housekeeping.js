import React from 'react'

const Housekeeping = () => {
  return (
    <div className=" w-full mx-auto p-6   bg-black bg-opacity-30 text-white rounded-xl shadow-lg ">
      <h2 className="text-2xl font-semibold mb-4">Solved Logs</h2>
      <div className="space-y-4">
        {/* {logs.map((log, index) => ( */}
        {/* <div key={index} className="log-entry bg-stone-700 p-4 rounded-lg shadow-md"> */}
        <div className="log-entry  border-l-4 border border-stone-600 border-l-red-500 p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
            {/* <span className="text-gray-400 text-sm">{log.timestamp}</span> */}
            <span className="text-gray-400 text-sm">07/Mar/2024:03:14:15 </span>
            {/* <span className={`text-sm font-semibold ${log.level === 'error' ? 'text-red-500' : 'text-blue-500'}`}> */}
              <span className={`text-sm font-semibold  text-red-500`}>
               "GET /index.html HTTP/1.1" 200
              </span>
            </div>
            {/* <p className="text-gray-200">{log.message}</p> */}
            <p className="text-gray-200">            <p className="text-gray-200">The href attribute requires a valid value to be accessible. </p>            </p>
          </div>
        {/* ))} */} 


        <div className="log-entry border border-stone-600 border-l-4 border-l-green-500 p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
            {/* <span className="text-gray-400 text-sm">{log.timestamp}</span> */}
            <span className="text-gray-400 text-sm">07/Mar/2024:03:14:15 </span>
            {/* <span className={`text-sm font-semibold ${log.level === 'error' ? 'text-red-500' : 'text-blue-500'}`}> */}
              <span className={`text-sm font-semibold  text-green-500`}>
               "GET /index.html HTTP/1.1" 200
              </span>
            </div>
            {/* <p className="text-gray-200">{log.message}</p> */}
            <p className="text-gray-200">            <p className="text-gray-200">The href attribute requires a valid value to be accessible. </p>            </p>
          </div>


          <div className="log-entry border border-stone-600 border-l-4 border-l-green-500 p-4 rounded-xl shadow-md">
        <div className="flex justify-between items-center mb-2">
            {/* <span className="text-gray-400 text-sm">{log.timestamp}</span> */}
            <span className="text-gray-400 text-sm">07/Mar/2024:03:14:15 </span>
            {/* <span className={`text-sm font-semibold ${log.level === 'error' ? 'text-red-500' : 'text-blue-500'}`}> */}
              <span className={`text-sm font-semibold  text-green-500`}>
               "GET /index.html HTTP/1.1" 200
              </span>
            </div>
            {/* <p className="text-gray-200">{log.message}</p> */}
            <p className="text-gray-200">            <p className="text-gray-200">The href attribute requires a valid value to be accessible. </p>            </p>
          </div>
      </div>
    </div>
      
  )
}

export default Housekeeping
