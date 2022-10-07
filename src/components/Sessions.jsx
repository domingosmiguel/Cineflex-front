import styled from "styled-components";

import Title from "./Title";
import Footer from "./Footer";
import Session from "./Session";
import React from "react";

export default function Sessions({ sessionsData }) {
    const { days, posterURL, title } = sessionsData;
    return (
        <React.Fragment>
            <Title color="var(--black)">Selecione o horário</Title>
            <SelectSessionsContainer>
                <SelectSessions>
                    {days.map((session) => {
                        return <Session key={session.id} session={session} />;
                    })}
                </SelectSessions>
            </SelectSessionsContainer>
            <Footer posterURL={posterURL}>{title}</Footer>
        </React.Fragment>
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
