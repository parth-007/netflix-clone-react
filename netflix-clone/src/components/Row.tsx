import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { instance } from '../axios';
import { BASE_PATH } from '../constants';
import { Movie } from '../interfaces';
import './Row.scss';

function Row(props: { title: string; fetchURL: string; isLargeRow?: boolean }) {
  const { title, fetchURL, isLargeRow } = props;
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const request = await instance.get(fetchURL);
      console.log(request);
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
      <div className="row__posters">
        {/* Several row posters */}

        {movies.map((movie: Movie, index: number) => (
          <img
            id={index.toString()}
            key={movie.id}
            className={`row__poster ${isLargeRow && 'row__posterLarge'}`}
            src={`${BASE_PATH}${
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
    </div>
  );
}

export default Row;
