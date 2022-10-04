import styled from "styled-components";

export default function Title({ children, color }) {
    return <PageTitle color={color}>{children}</PageTitle>;
}

const PageTitle = styled.p`
    height: 110px;
    display: flex;
    align-items: center;
    font-size: 24px;
    line-height: 28px;
    color: ${({ color }) => color};
`;
