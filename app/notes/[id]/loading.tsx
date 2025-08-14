const Loading = () => {
  return (
    <div className="h-screen bg-gray-900 text-white">
      {/* Desktop Layout */}
      <div className="hidden md:flex h-full">
        <div className="w-64 bg-gray-800 p-4 space-y-4">
          <div className="flex gap-2 mb-6">
            <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
            <div className="h-8 w-20 bg-gray-700 rounded animate-pulse"></div>
          </div>
          
          <div className="space-y-2">
            {Array.from({ length: 7 }).map((_, i) => (
              <div key={i} className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-gray-700 rounded animate-pulse"></div>
                <div className="h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-600 p-2 rounded">
            <div className="h-4 bg-gray-500 rounded animate-pulse w-20"></div>
          </div>
        </div>
        
        <div className="flex-1 flex flex-col">
          <div className="bg-gray-800 p-4 border-b border-gray-700">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-24 bg-gray-700 rounded animate-pulse"></div>
              <div className="flex space-x-1">
                {Array.from({ length: 15 }).map((_, i) => (
                  <div key={i} className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="flex-1 flex">
            <div className="flex-1 p-6 space-y-4">
              <div className="h-6 bg-gray-700 rounded animate-pulse w-32 mb-6"></div>
              
              <div className="space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse mt-1"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 space-y-2">
                <div className="h-4 bg-gray-700 rounded animate-pulse w-8"></div>
              </div>
            </div>
            
            <div className="w-1/2 bg-gray-800 p-6 border-l border-gray-700">
              <div className="h-8 bg-gray-700 rounded animate-pulse w-32 mb-6"></div>
              
              <div className="space-y-4">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="flex items-start space-x-3">
                    <div className="w-4 h-4 bg-gray-700 rounded animate-pulse mt-1"></div>
                    <div className="h-4 bg-gray-700 rounded animate-pulse flex-1"></div>
                  </div>
                ))}
                <div className="h-4 bg-gray-700 rounded animate-pulse w-8 mt-6"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Layout */}
      <div className="md:hidden flex flex-col h-full">
        <div className="bg-gray-800 p-4 border-b border-gray-700">
          <div className="flex items-center justify-between">
            <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
            
            <div className="h-6 bg-gray-700 rounded animate-pulse w-24"></div>
            
            <div className="flex space-x-2">
              <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-700 rounded animate-pulse"></div>
            </div>
          </div>
        </div>
        
        <div className="flex-1 p-4 space-y-4 overflow-y-auto">
          <div className="h-8 bg-gray-700 rounded animate-pulse w-48 mb-6"></div>
          
          <div className="space-y-4">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-start space-x-3">
                <div className="w-4 h-4 bg-gray-700 rounded-full animate-pulse mt-1 flex-shrink-0"></div>
                <div className="space-y-2 flex-1">
                  <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
                  {i % 2 === 0 && (
                    <div className="h-4 bg-gray-700 rounded animate-pulse w-3/4"></div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 space-y-4">
            <div className="h-4 bg-gray-700 rounded animate-pulse w-20"></div>
            <div className="space-y-2">
              <div className="h-4 bg-gray-700 rounded animate-pulse w-full"></div>
              <div className="h-4 bg-gray-700 rounded animate-pulse w-2/3"></div>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-800 p-3 border-t border-gray-700">
          <div className="flex justify-center space-x-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="w-10 h-8 bg-gray-700 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;