import React from "react"
const Video = ({ videoSrcURL, videoTitle, divClass, ...props }) => (

  <>

    {videoSrcURL &&
      
      <div className={divClass}>

        <video controls loop muted>
          <source src={videoSrcURL.publicURL} type="video/mp4" />
        </video>

      </div>
      
    }

  </>
  
)
export default Video