import styled from "styled-components";

export default function Button({ children, data, handleClick, disabled = false }) {
    return (
        <NiceButton disabled={disabled} onClick={() => handleClick(data)} type="button">
            {children}
        </NiceButton>
    );
}
const NiceButton = styled.button`
    display: inline-block;
    transition: all 0.2s ease-in;
    position: relative;
    overflow: hidden;
    z-index: 1;
    color: white;
    padding: 0.6em 1em;
    font-size: 18px;
    line-height: 21px;
    border-radius: 0.5em;
    background: var(--orange);
    border: 1px solid var(--orange);
    box-shadow: 6px 6px 12px #c5c5c5;
    cursor: pointer;

    &:active {
        color: #666;
        box-shadow: inset 4px 4px 12px #c5c5c5;
    }
    &:before {
        content: "";
        position: absolute;
        left: 50%;
        transform: translateX(-50%) scaleY(1) scaleX(1.25);
        top: 100%;
        width: 140%;
        height: 180%;
        background-color: rgba(0, 0, 0, 0.05);
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }
    &:after {
        content: "";
        position: absolute;
        left: 55%;
        transform: translateX(-50%) scaleY(1) scaleX(1.45);
        top: 180%;
        width: 160%;
        height: 190%;
        background-color: var(--midGreen);
        border-radius: 50%;
        display: block;
        transition: all 0.5s 0.1s cubic-bezier(0.55, 0, 0.1, 1);
        z-index: -1;
    }
    &:hover {
        color: #000;
        border: 1px solid var(--midGreen);
    }
    &:hover:before {
        top: -35%;
        background-color: var(--midGreen);
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
    &:hover:after {
        top: -45%;
        background-color: var(--midGreen);
        transform: translateX(-50%) scaleY(1.3) scaleX(0.8);
    }
`;
