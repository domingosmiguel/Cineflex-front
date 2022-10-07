import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "./Button";

export default function GlobalBackButton() {
    return (
        <GlobalButton>
            <Button handleClick={() => console.log("clicou")}>Voltar</Button>
        </GlobalButton>
    );
}

const GlobalButton = styled.div`
    position: absolute;
    top: 0;
    left: 3px;
    height: 67px;
    z-index: 3;
`;
