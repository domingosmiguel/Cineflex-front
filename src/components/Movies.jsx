import styled from "styled-components";
import axios from "axios";
import { useState } from "react";
import Poster from "./Poster";

export default function Movies(props) {
    const [moviesData, setMoviesData] = useState([]);
    function moviesSuccessfullyLoad({ data }) {
        setMoviesData([...data]);
    }
    function couldNotLoadMovies(error) {
        alert(error);
    }
    axios
        .get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
        .then(moviesSuccessfullyLoad)
        .catch(couldNotLoadMovies);

    return (
        <MoviesPostersContainer>
            <MoviePosters>
                {moviesData.map((movie) => (
                    <Poster key={movie.id} movie={movie} />
                ))}
            </MoviePosters>
        </MoviesPostersContainer>
    );
}

const MoviesPostersContainer = styled.div`
    position: sticky;
    top: 170px;
    bottom: 0;
    margin-top: -10px;
    width: 100vw;
    height: 100%;
    overflow-y: scroll;
`;

const MoviePosters = styled.div`
    max-width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin: 0 auto;
`;
