import React from "react"
const Video = ({ videoSrcURL, videoTitle, ...props }) => (

  <>

    {videoSrcURL &&
      
      <div className="work-video">

          <iframe
          src={"https://www.youtube.com/embed/" + videoSrcURL + "?rel=0&amp;autoplay=1&mute=1&controls=0&loop=1&modestbranding=1&showinfo=0&rel=0"}
          title={videoTitle}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          frameBorder="0"
          webkitallowfullscreen="true"
          mozallowfullscreen="true"
          allowFullScreen
          width="846"
          height="528"
          />
      </div>
      
    }

  </>
  
)
export default Video