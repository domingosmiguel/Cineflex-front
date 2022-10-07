import { useNavigate } from "react-router-dom/dist";
import { useContext } from "react";
import styled from "styled-components";

import DataContext from "../dataContext";

export default function Poster({ movie }) {
    const { id, posterURL, title } = movie;
    const { setFilmId } = useContext(DataContext);
    const navigate = useNavigate();

    function handlePosterClick() {
        setFilmId(id);
        navigate(`/film/${id}`);
    }
    return (
        <MoviePoster
            data-identifier="movie-outdoor"
            onClick={handlePosterClick}
            src={posterURL}
            alt={title}
        />
    );
}

const MoviePoster = styled.img`
    width: 145px;
    height: 209px;
    padding: 8px;
    margin: 10px;
    box-shadow: 0px 2px 4px 2px rgba(0, 0, 0, 0.1);
    border-radius: 3px;
    cursor: pointer;
`;
