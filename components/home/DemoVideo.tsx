const DemoVideo = () => {
  return (
    <div className="flex px-2 py-16 justify-center items-center">
      <video 
        width="1000"
        height="612" 
        autoPlay 
        muted 
        loop 
        playsInline 
        controls={false}
        className="rounded-sm"
      >
        <source src="/video/demo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
}

export default DemoVideo;