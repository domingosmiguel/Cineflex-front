import styled from "styled-components";

import Movies from "./Movies";
import Title from "./Title";

export default function Main(props) {
    return (
        <SelectMovie>
            <Title color="var(--black)">Selecione o filme</Title>
            <Movies />
        </SelectMovie>
    );
}

const SelectMovie = styled.section`
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
