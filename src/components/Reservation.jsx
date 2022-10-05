import React from "react";
import styled from "styled-components";
import Footer from "./Footer";
import Seat from "./Seat";
import Title from "./Title";

export default function Reservation({ timeData, selectedSeats, SetSelectedSeats }) {
    const { day, movie, name, seats } = timeData;
    function handleSeatSelection(seat) {
        seat.selected = !seat.selected;
        if (selectedSeats.includes(seat.id)) {
            const filteredSeats = selectedSeats.filter((id) => !(id === seat.id));
            SetSelectedSeats([...filteredSeats]);
            return;
        }
        const newSelectedSeats = [...selectedSeats, seat.id];
        SetSelectedSeats([...newSelectedSeats]);
    }

    return (
        <React.Fragment>
            <Title>Selecione o(s) assento(s)</Title>
            <SeatsContainer>
                <SeatsDisplay>
                    {seats.map((seat) => (
                        <Seat
                            key={seat.id}
                            seat={seat}
                            selectedSeats={selectedSeats}
                            handleSeatSelection={handleSeatSelection}
                        >
                            {seat.name}
                        </Seat>
                    ))}
                </SeatsDisplay>
            </SeatsContainer>
            <SeatsSubtitle></SeatsSubtitle>
            <Footer posterURL={movie.posterURL}>
                {movie.title}
                <br />
                {`${day.weekday} - ${name}`}
            </Footer>
        </React.Fragment>
    );
}

const SeatsContainer = styled.div`
    width: 100%;
    position: absolute;
    top: 177px;
    bottom: 117px;
    overflow-y: scroll;
`;
const SeatsDisplay = styled.div`
    position: relative;
    display: flex;
    flex-wrap: wrap;
    max-width: 900px;
    margin: 0 auto;
    padding: 0 25px;
`;
const SeatsSubtitle = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;
