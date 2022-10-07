import styled from "styled-components";
import axios from "axios";
import { useState, useEffect } from "react";

import Poster from "./Poster";
import LoadingPage from "./LoadingPage";

export default function Movies() {
    const [moviesData, setMoviesData] = useState(null);
    useEffect(() => {
        axios
            .get("https://mock-api.driven.com.br/api/v5/cineflex/movies")
            .then(({ data }) => {
                setMoviesData([...data]);
            })
            .catch((error) => {
                alert(error);
            });
    }, []);
    if (moviesData === null) {
        return <LoadingPage />;
    }
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
    max-width: 1650px;
    width: fit-content;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    margin: 0 auto;
`;
