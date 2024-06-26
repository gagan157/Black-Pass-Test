import React from 'react';

function YouTubeVideo({ videoId }: { videoId: string }) {
    return (
        <div className="video-container">
            <iframe
                width="100%"
                height="auto"
                src={`https://www.youtube.com/embed/${videoId}`}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                frameBorder="0"
                allowFullScreen
            ></iframe>
        </div>
    );
}

export default YouTubeVideo;