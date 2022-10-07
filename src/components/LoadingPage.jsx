import styled, { keyframes } from "styled-components";

export default function LoadingPage() {
    return (
        <LoaderContainer>
            <Loader />
        </LoaderContainer>
    );
}

const spin = keyframes`
0%,
    100% {
      box-shadow: .2em 0px 0 0px currentcolor;
    }
    12% {
      box-shadow: .2em .2em 0 0 currentcolor;
    }
    25% {
      box-shadow: 0 .2em 0 0px currentcolor;
    }
    37% {
      box-shadow: -.2em .2em 0 0 currentcolor;
    }
    50% {
      box-shadow: -.2em 0 0 0 currentcolor;
    }
    62% {
      box-shadow: -.2em -.2em 0 0 currentcolor;
    }
    75% {
      box-shadow: 0px -.2em 0 0 currentcolor;
    }
    87% {
      box-shadow: .2em -.2em 0 0 currentcolor;
    }
`;
const LoaderContainer = styled.div`
    position: absolute;
    top: 0;
    display: flex;
    height: 100vh;
    width: 100vw;
`;
const Loader = styled.span`
    transform: rotateZ(45deg);
    perspective: 300px;
    border-radius: 50%;
    width: 150px;
    height: 150px;
    color: var(--orange);
    margin: auto;

    :before,
    :after {
        content: "";
        display: block;
        position: absolute;
        top: 0;
        left: 0;
        width: inherit;
        height: inherit;
        border-radius: 50%;
        transform: rotateX(70deg);
        animation: 1s ${spin} linear infinite;
    }
    :after {
        color: var(--lightGray);
        transform: rotateY(70deg);
        animation-delay: 0.4s;
    }
`;
