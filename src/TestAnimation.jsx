const TestAnimation = () => {
    return (
      <div className="p-8">
        <div className="animate-bounce bg-blue-500 text-white p-4 rounded mb-4">
          Tailwind Built-in Animation (should work)
        </div>
        
        <div className="animate-float bg-red-500 text-white p-4 rounded mb-4">
          Custom Float Animation
        </div>
        
        <div className="animate-slide-in bg-green-500 text-white p-4 rounded">
          Custom Slide-in Animation
        </div>
      </div>
    );
  };
  
  export default TestAnimation;
  