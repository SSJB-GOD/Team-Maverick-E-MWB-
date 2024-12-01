import React, { useState } from "react";
import Categories from "./Categories";
import Header from "./Header";
import VideoList from "./VideoList";
import VideoPlayer from "./VideoPlayer";
import "./style.css";

function VideoRecommendationsApp(userid) {
  const [videos, setVideos] = useState([]);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleCategoryClick = (category) => {
    fetchVideos(category);
  };

  const fetchVideos = async (query) => {
    const API_KEY = "AIzaSyBg-Ce5WunfBq6nArAPmCyBvpr129R-2dY"; // Replace with your key
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${query}&key=${API_KEY}`;
    try {
      const response = await fetch(url);
      const data = await response.json();
      setVideos(data.items);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const handleVideoClick = (videoId) => {
    setSelectedVideo(videoId);
  };

  const handleBackClick = () => {
    setSelectedVideo(null);
  };

  return (
    <div className="body">
      <div id="app">
        <Header onSearch={fetchVideos} />
        {selectedVideo ? (
          <VideoPlayer videoId={selectedVideo} onBack={handleBackClick} />
        ) : (
          <>
            <Categories onCategoryClick={handleCategoryClick} />
            <VideoList
              userid={userid.userid}
              videos={videos}
              onVideoClick={handleVideoClick}
            />
          </>
        )}
      </div>
    </div>
  );
}

export default VideoRecommendationsApp;
