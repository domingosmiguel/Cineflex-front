import styled from "styled-components";

export default function Footer({ posterURL, children }) {
    return (
        <FooterContainer>
            <FooterBar>
                <Poster data-identifier="movie-img-preview" src={posterURL} alt="poster" />
                <p data-identifier="movie-and-session-infos-preview">{children}</p>
            </FooterBar>
        </FooterContainer>
    );
}

const FooterContainer = styled.div`
    position: absolute;
    bottom: 0;
    width: 100vw;
    height: 117px;
    background-color: var(--lightGray);
    border-top: 1px solid var(--darkGray);
    display: flex;
    align-items: center;
`;
const FooterBar = styled.div`
    max-width: 1240px;
    width: 100%;
    margin: 0 auto;
    padding: 0 10px;
    display: flex;
    align-items: center;
    font-size: 26px;
    line-height: 30px;
`;
const Poster = styled.img`
    width: 64px;
    height: 89px;
    padding: 8px;
    background-color: white;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    margin-right: 14px;
`;
