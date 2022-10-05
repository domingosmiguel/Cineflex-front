import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/dist";
import styled from "styled-components";

import DataContext from "../dataContext";
import Button from "./Button";

export default function Session({ session }) {
    const { weekday, date, showtimes } = session;
    const { setTimeId, setTimeData } = useContext(DataContext);
    const navigate = useNavigate();

    function getSessionDataSuccess({ data }) {
        setTimeData({ ...data });
        navigate(`/session/${tempTimeId}`);
    }
    function failedToGetSessionData(error) {
        alert(error);
    }
    let tempTimeId;
    function handleSessionButtonClick(timeId) {
        setTimeId(timeId);
        tempTimeId = timeId;
        axios
            .get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${timeId}/seats`)
            .then(getSessionDataSuccess)
            .catch(failedToGetSessionData);
    }
    return (
        <FilmSession>
            <TextContainer>
                {weekday} - {date}
            </TextContainer>
            <ButtonsContainer>
                {showtimes.map((time) => (
                    <Button
                        key={time.id}
                        timeId={time.id}
                        handleSessionButtonClick={handleSessionButtonClick}
                    >
                        {time.name}
                    </Button>
                ))}
            </ButtonsContainer>
        </FilmSession>
    );
}

const FilmSession = styled.div`
    min-height: 113px;
    max-width: 400px;
    width: 100%;
    margin: 5px 0;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.02em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;
const TextContainer = styled.div``;
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 176px;
`;
