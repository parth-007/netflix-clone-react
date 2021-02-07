import React, { useState, useEffect } from 'react';
import { instance } from '../axios';
import { BASE_PATH } from '../constants';
import { Movie } from '../interfaces';
import { requests } from '../requests';
import { getRandomNumber, getTruncatedDescription } from '../utils';
import './Banner.scss';

function Banner(): JSX.Element {
  const [movie, setMovie] = useState<Movie>();

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(requests.fetchNetflixOriginals);
      const resultLength: number = request.data.results.length;

      const randomNumber: number = getRandomNumber(resultLength - 1);
      setMovie(request.data.results[randomNumber]);

      return request;
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: 'cover',
        backgroundImage: `url(${BASE_PATH}${movie?.backdrop_path})`,
        backgroundPosition: 'center center',
      }}
    >
      <div className="banner-contents">
        {/* Title */}
        <h1 className="banner-title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner-buttons">
          <button className="banner-button">Play</button>
          <button className="banner-button">My List</button>
        </div>

        <h1 className="banner-description">
          {getTruncatedDescription(movie?.overview as string, 150)}
        </h1>
        {/* Description */}
      </div>

      <div className="banner-fade-bottom"></div>
    </header>
  );
}

export default Banner;
