import { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import Title from "./Title";
import Footer from "./Footer";
import Session from "./Session";
import LoadingPage from "./LoadingPage";

export default function Sessions({ filmID, sessionsData, setSessionsData }) {
    useEffect(() => {
        setSessionsData(null);
        axios
            .get(`https://mock-api.driven.com.br/api/v5/cineflex/movies/${filmID}/showtimes`)
            .then(({ data }) => {
                setSessionsData({ ...data });
            })
            .catch((error) => {
                alert(error);
            });
    }, []);
    if (sessionsData === null) {
        return <LoadingPage />;
    }
    const { days, posterURL, title } = sessionsData;

    return (
        <>
            <Title color="var(--black)">Selecione o horário</Title>
            <SelectSessionsContainer>
                <SelectSessions>
                    {days.map((session) => {
                        return <Session key={session.id} session={session} />;
                    })}
                </SelectSessions>
            </SelectSessionsContainer>
            <Footer posterURL={posterURL}>{title}</Footer>
        </>
    );
}
const SelectSessionsContainer = styled.section`
    width: 100%;
    position: absolute;
    top: 177px;
    bottom: 117px;
    overflow-y: scroll;
`;
const SelectSessions = styled.section`
    position: relative;
    max-width: 1240px;
    margin: 0 auto;
    padding: 0 15px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
`;
