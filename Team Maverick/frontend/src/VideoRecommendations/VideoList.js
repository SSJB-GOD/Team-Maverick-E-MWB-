import React, { useContext } from "react";
import GlobalContext from "../Dashboard/GlobalContext/GlobalContext";
function VideoList({ userid, videos, onVideoClick }) {
  const { state } = useContext(GlobalContext);
  const id = state.userid;
  return (
    <div className="body">
      <div id="video-list" className="video-list">
        {videos.map((video) => (
          <div
            key={video.id.videoId}
            className="video-card"
            onClick={async () => {
              try {
                const response = await fetch(
                  "http://localhost:8084/api/userscores/setScore",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                      userId: id,
                      videoName: video.snippet.description,
                      videoUrl: `https://www.youtube.com/embed/${video.id.videoId}`,
                      score: "",
                      genre: "",
                    }),
                  }
                );

                if (!response.ok) {
                  throw new Error(`HTTP error! status: ${response.status}`);
                }
                return onVideoClick(video.id.videoId);
              } catch (error) {
                return onVideoClick(video.id.videoId);
              }
            }}
          >
            <img
              src={video.snippet.thumbnails.medium.url}
              alt={video.snippet.title}
            />
            <h3>{video.snippet.title}</h3>
          </div>
        ))}
      </div>
    </div>
  );
}

export default VideoList;
