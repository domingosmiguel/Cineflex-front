import styled from "styled-components";

export default function Title({ children, color }) {
    return <PageTitle color={color}>{children}</PageTitle>;
}

const PageTitle = styled.p`
    position: sticky;
    top: 67px;
    width: 100vw;
    height: 110px;
    display: flex;
    background-color: white;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    line-height: 28px;
    color: ${({ color }) => color};
    z-index: 2;
`;
