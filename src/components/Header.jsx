import { useNavigate } from "react-router-dom/dist";
import styled from "styled-components";

export default function Header() {
    const navigate = useNavigate();
    function handleHeaderClick() {
        navigate("/");
    }
    return <PageHeader onClick={handleHeaderClick}>CINEFLEX</PageHeader>;
}

const PageHeader = styled.header`
    position: sticky;
    top: 0;
    height: 67px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 34px;
    line-height: 40px;
    color: var(--orange);
    background-color: var(--lightGray);
    cursor: pointer;
`;
