import React from 'react'

interface WorkVideoProps {
  src: string
}

/**
 * Embed de vídeo (iframe ou video). Largura 846px, height 528px, border-radius 10px.
 */
export function WorkVideo({ src }: WorkVideoProps) {
  const isExternal = src.startsWith('http')
  return (
    <div className="work-video-wrapper">
      {isExternal ? (
        <iframe
          src={src}
          title="Video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      ) : (
        <video src={src} controls playsInline />
      )}
    </div>
  )
}
