import { useContext } from "react";
import { useNavigate } from "react-router-dom/dist";
import styled from "styled-components";

import DataContext from "../dataContext";
import Button from "./Button";

export default function Session({ session }) {
    const { weekday, date, showtimes } = session;
    const { setTimeId } = useContext(DataContext);
    const navigate = useNavigate();

    function handleSessionButtonClick(timeId) {
        setTimeId(timeId);
        navigate(`/session/${timeId}`);
    }
    return (
        <FilmSession>
            <TextContainer data-identifier="session-date">
                {weekday} - {date}
            </TextContainer>
            <ButtonsContainer>
                {showtimes.map((time) => (
                    <Button
                        key={time.id}
                        data={time.id}
                        handleClick={handleSessionButtonClick}
                        identifier="hour-minute-btn"
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
    max-width: 250px;
    width: 100%;
    margin: 5px 50px;
    font-size: 20px;
    line-height: 23px;
    letter-spacing: 0.02em;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    @media (max-width: 720px) {
        margin: 5px 0;
    }
    @media (max-width: 900px) {
        margin: 5px 30px;
    }
`;
const TextContainer = styled.div``;
const ButtonsContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 176px;
`;
