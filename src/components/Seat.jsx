import styled from "styled-components";

export default function Seat({ children, identifier, seat, handleSeatSelection, subtitle, color }) {
    if (!subtitle) {
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
                onClick={
                    seat.isAvailable
                        ? () => handleSeatSelection(seat)
                        : () => alert("Esse assento não está disponível")
                }
                active={true}
                data-identifier={identifier}
                borderColor={borderColor}
                backGroundColor={backGroundColor}
            >
                {children}
            </MovieSeat>
        );
    }
    return (
        <MovieSeat
            active={false}
            data-identifier={identifier}
            borderColor={color.borderColor}
            backGroundColor={color.backGroundColor}
        >
            {children}
        </MovieSeat>
    );
}

const MovieSeat = styled.div`
    pointer-events: ${({ active }) => (active ? "auto" : "none")};
    width: 26px;
    height: 26px;
    background-color: ${({ backGroundColor }) => backGroundColor};
    border: 1px solid;
    border-color: ${({ borderColor }) => borderColor};
    border-radius: 13px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    font-size: 11px;
    line-height: 13px;
    letter-spacing: 0.04em;
`;
