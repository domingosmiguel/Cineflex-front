import axios from "axios";
import { useContext } from "react";
import { useNavigate } from "react-router-dom/dist";
import styled from "styled-components";

import DataContext from "../dataContext";
import Button from "./Button";

export default function Session({ session, setTimeData }) {
    const { id, weekday, date, showtimes } = session;
    const { setSessionId } = useContext(DataContext);
    const navigate = useNavigate();

    function getSessionDataSuccess({ data }) {
        setTimeData({ ...data });
        navigate(`/film/${id}`);
    }
    function failedToGetSessionData(error) {
        alert(error);
    }
    function handleSessionButtonClick(timeId) {
        setSessionId(timeId);
        axios
            .get("https://mock-api.driven.com.br/api/v5/cineflex/showtimes/ID_DA_SESSAO/seats")
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
                    <Button key={time.id} timeId={time.id} setSessionId={setSessionId}>
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
    padding: 0 10px;
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
