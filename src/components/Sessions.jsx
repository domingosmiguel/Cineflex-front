import Title from "./Title";
import styled from "styled-components";
import Footer from "./Footer";

export default function Sessions(props) {
    return (
        <SelectSessions>
            <Title color="var(--black)">Selecione o horário</Title>
            <Footer />
        </SelectSessions>
    );
}
const SelectSessions = styled.section``;
