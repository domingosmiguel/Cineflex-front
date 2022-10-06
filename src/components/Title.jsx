import styled from "styled-components";

export default function Title({ children, color = "black", fontWeight = "400" }) {
    return (
        <PageTitle color={color} fontWeight={fontWeight}>
            {children}
        </PageTitle>
    );
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
    letter-spacing: 0.04em;
    color: ${({ color }) => color};
    font-weight: ${({ fontWeight }) => fontWeight};
    z-index: 2;
    text-align: center;
`;
