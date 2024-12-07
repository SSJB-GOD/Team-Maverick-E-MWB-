import React, { useState, useEffect } from 'react';
import "./NewsApp.css"
import axios from 'axios';

const NewsApp = () => {
  const [articles, setArticles] = useState([]);
  const [searchQuery, setSearchQuery] = useState('mental health');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchNews = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://newsapi.org/v2/everything', {
        params: {
          q: query,
          apiKey: 'e1ee6aae511348b9b935d80633fda865',
          pageSize: 10
        }
      });
      setArticles(response.data.articles);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news. Please try again.');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNews(searchQuery);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchNews(searchQuery);
  };

  return (
    <div className="news-app">
      <header className="news-app__header">
        <h1 style={{color:"black"}}>You Know What?</h1>
        <form onSubmit={handleSearch} className="news-search-form">
          <input 
            type="text" 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for news topics"
            className="news-search-input"
          />
          <button type="submit" className="news-search-button">
            Search
          </button>
        </form>
      </header>
  
      {loading && <div className="loading">Loading news...</div>}
      {error && <div className="error">{error}</div>}
  
      <div className="news-app__content">
        {articles.map((article, index) => (
          <div key={article.url || index} className="news-article">
            {article.urlToImage && (
              <img 
                src={article.urlToImage} 
                alt={article.title} 
                onError={(e) => e.target.style.display = 'none'}
              />
            )}
            <h2>{article.title}</h2>
            <p>{article.description}</p>
            <a href={article.url} target="_blank" rel="noopener noreferrer">
              Read more
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsApp;