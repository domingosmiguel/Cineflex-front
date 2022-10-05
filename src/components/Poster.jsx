import { useNavigate } from "react-router-dom/dist";
import { useContext } from "react";
import styled from "styled-components";
import axios from "axios";

import DataContext from "../dataContext";

export default function Poster({ movie }) {
    const { id, posterURL, title } = movie;
    const { setFilmId, setSessionsData } = useContext(DataContext);
    const navigate = useNavigate();

    function sessionsSuccessfullyLoad({ data }) {
        setSessionsData({ ...data });
        navigate(`/film/${id}`);
    }
    function couldNotLoadSessions(error) {
        alert(error);
    }
    function handlePosterClick() {
        setFilmId(id);
        axios
            .get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${id}/showtimes`)
            .then(sessionsSuccessfullyLoad)
            .catch(couldNotLoadSessions);
    }
    return <MoviePoster onClick={handlePosterClick} src={posterURL} alt={title} />;
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
