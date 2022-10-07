import { Link, useNavigate } from "react-router-dom/dist";
import styled from "styled-components";
import Button from "./Button";

export default function Header({ setSelectedSeats }) {
    return (
        <PageHeader>
            <Container>
                <ButtonContainer>
                    <Button>Voltar</Button>
                </ButtonContainer>
                CINEFLEX
            </Container>
        </PageHeader>
    );
}

const PageHeader = styled.header`
    position: sticky;
    top: 0;
    height: 67px;
    font-size: 34px;
    line-height: 40px;
    color: var(--orange);
    background-color: var(--lightGray);
`;
const Container = styled.div`
    position: relative;
    height: 100%;
    max-width: 1240px;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    @media (max-width: 360px) {
        padding: 0 10px;
        justify-content: space-between;
    }
`;
const ButtonContainer = styled.nav`
    position: absolute;
    left: 10px;
    overflow: hidden;
    height: fit-content;
    @media (max-width: 360px) {
        position: static;
    }
`;
