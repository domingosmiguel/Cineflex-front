import styled from "styled-components";

export default function Seat({ children, seat, selectedSeats, handleSeatSelection }) {
    const borderColor = seat.isAvailable
        ? seat.selected
            ? "var(--darkGreen)"
            : "var(--darkGray)"
        : "var(--darkYellow)";
    const backGroundColor = seat.isAvailable
        ? seat.selected
            ? "var(--midGreen)"
            : "var(--lightGray)"
        : "var(--lightYellow)";

    return (
        <MovieSeat
            onClick={() => handleSeatSelection(seat)}
            available={seat.isAvailable}
            borderColor={borderColor}
            backGroundColor={backGroundColor}
        >
            {children}
        </MovieSeat>
    );
}

const MovieSeat = styled.div`
    pointer-events: ${({ available }) => (available ? "auto" : "none")};
    width: 26px;
    height: 26px;
    background-color: ${({ backGroundColor }) => backGroundColor};
    border: 1px solid;
    border-color: ${({ borderColor }) => borderColor};
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 9px 5px;
    cursor: pointer;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.04em;
    &.selected {
        background-color: "var(--midGreen)";
        border-color: "var(--darkGreen)";
    }
`;
