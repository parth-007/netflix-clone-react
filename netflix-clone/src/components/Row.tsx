import React, { useEffect, useState } from 'react';
import YouTube from 'react-youtube';
/* eslint-disable */
const movieTrailer = require('movie-trailer');
import { instance } from '../axios';
import { BASE_PATH, youtubePlayerOptions } from '../constants';
import { Movie } from '../interfaces';
import './Row.scss';

function Row(props: {
  title: string;
  fetchURL: string;
  isLargeRow?: boolean;
}): JSX.Element {
  const { title, fetchURL, isLargeRow } = props;
  const [movies, setMovies] = useState<Movie[]>([]);
  const [trailerUrl, setTrailerUrl] = useState<string>('');

  const handleClick = (movie: Movie) => {
    console.log(movie);
    if (trailerUrl) {
      setTrailerUrl('');
    } else {
      movieTrailer(movie?.name || '')
        .then((url: string) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams?.get('v') as string);
        })
        .catch((error: string) => console.log(error));
    }
  };
  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchURL);
      setMovies(request.data.results);
      return request;
    }
    fetchData();
  }, [fetchURL]);

  return (
    <div className="row">
      {/* Title */}
      <h2>{title}</h2>

      {/* Containers and Posters */}
      <div className="row-posters">
        {/* Several row posters */}

        {movies.map((movie: Movie, index: number) => (
          <img
            id={index.toString()}
            key={movie.id}
            className={`row-poster ${isLargeRow && 'row-poster-large'}`}
            src={`${BASE_PATH}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            onClick={() => handleClick(movie)}
            alt={movie.name}
          />
        ))}
      </div>

      {trailerUrl && (
        <YouTube videoId={trailerUrl} opts={youtubePlayerOptions} />
      )}
    </div>
  );
}

export default Row;
