import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import SeatDataInput from "./SeatDataInput";
import Seat from "./Seat";
import Title from "./Title";
import Button from "./Button";
import Modal from "./Modal";

export default function Reservation({ timeData, selectedSeats, setSelectedSeats }) {
    console.log(
        "🚀 ~ file: Reservation.jsx ~ line 14 ~ Reservation ~ selectedSeats",
        selectedSeats
    );
    const { day, movie, name, seats } = timeData;
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [seatModal, setSeatModal] = useState({});

    function verifyTypedData(seatId) {
        for (let seat of selectedSeats) {
            if (seatId === seat.idAssento && (seat.nome !== "" || seat.cpf !== "")) {
                return true;
            }
        }
        return false;
    }
    function removeSeat(seat) {
        const filteredSeats = selectedSeats.filter(
            (selectedSeat) => !(selectedSeat.idAssento === seat.id)
        );
        setSelectedSeats([...filteredSeats]);
        seat.selected = !seat.selected;
    }
    function handleSeatSelection(seat) {
        if (seat.selected) {
            const hasData = verifyTypedData(seat.id);
            if (hasData) {
                setSeatModal({ ...seat });
                setOpenModal(true);
                return;
            }
            removeSeat(seat);
            return;
        }
        const newSelectedSeats = [...selectedSeats, { idAssento: seat.id, nome: "", cpf: "" }];
        setSelectedSeats([...newSelectedSeats]);
        seat.selected = !seat.selected;
    }
    function SubtitleGeneration() {
        const possibleSeatStatus = 3;
        const subsText = ["Selecionado", "Disponível", "Indisponível"];
        const color = [
            { borderColor: "var(--darkGreen)", backGroundColor: "var(--midGreen)" },
            { borderColor: "var(--darkGray)", backGroundColor: "var(--lightGray)" },
            { borderColor: "var(--darkYellow)", backGroundColor: "var(--lightYellow)" },
        ];
        const identifier = [
            "seat-selected-subtitle",
            "seat-available-subtitle",
            "seat-unavailable-subtitle",
        ];
        const subtitles = [];
        for (let i = 0; i < possibleSeatStatus; i++) {
            subtitles.push(
                <SubtitleDiv key={i}>
                    <Seat subtitle={true} identifier={identifier[i]} color={color[i]} />
                    <SubtitleTxt>{subsText[i]}</SubtitleTxt>
                </SubtitleDiv>
            );
        }
        return subtitles;
    }
    function checkoutSucceed() {
        navigate("/success");
    }
    function checkoutFailed(error) {
        alert(error);
    }
    function checkout() {
        const ids = selectedSeats.map((selectedSeat) => selectedSeat.idAssento);
        const data = { ids: ids, compradores: selectedSeats };
        axios
            .post("https://mock-api.driven.com.br/api/v5/cineflex/seats/book-many", data)
            .then(checkoutSucceed)
            .catch(checkoutFailed);
    }
    return (
        <React.Fragment>
            <Title>Selecione o(s) assento(s)</Title>
            <SeatsContainer>
                <SeatsDisplay>
                    {seats.map((seat) => (
                        <Seat
                            key={seat.id}
                            identifier="seat"
                            seat={seat}
                            handleSeatSelection={handleSeatSelection}
                        >
                            {seat.name}
                        </Seat>
                    ))}
                </SeatsDisplay>
                <SeatsSubtitleContainer>{SubtitleGeneration()}</SeatsSubtitleContainer>
                <AllInputContainer>
                    {selectedSeats.map((selSeat) => (
                        <InputContainer key={selSeat.idAssento}>
                            <SeatDataInput
                                identifier="buyer-name-input"
                                selSeat={selSeat}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                type={"nome"}
                            >{`Nome do comprador (assento ${
                                selSeat.idAssento % 100 <= 50
                                    ? selSeat.idAssento % 100 || 50
                                    : (selSeat.idAssento % 100) - 50
                            }):`}</SeatDataInput>
                            <SeatDataInput
                                identifier="buyer-cpf-input"
                                selSeat={selSeat}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                                type={"cpf"}
                            >{`CPF do comprador (assento ${
                                selSeat.idAssento % 100 <= 50
                                    ? selSeat.idAssento % 100 || 50
                                    : (selSeat.idAssento % 100) - 50
                            }):`}</SeatDataInput>
                        </InputContainer>
                    ))}
                </AllInputContainer>
                <ButtonContainer>
                    <Button
                        identifier="reservation-btn"
                        handleClick={checkout}
                        disabled={selectedSeats.length > 0 ? false : true}
                    >
                        Reservar assento(s)
                    </Button>
                </ButtonContainer>
            </SeatsContainer>
            <Footer posterURL={movie.posterURL}>
                {movie.title}
                <br />
                {`${day.weekday} - ${name}`}
            </Footer>
            {openModal && (
                <Modal seatModal={seatModal} setOpenModal={setOpenModal} removeSeat={removeSeat} />
            )}
        </React.Fragment>
    );
}

const SeatsContainer = styled.div`
    margin-top: -5px;
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
    padding: 0 10px;
`;
const SeatsSubtitleContainer = styled.div`
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
`;
const SubtitleDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;
const SubtitleTxt = styled.p`
    font-size: 13px;
    line-height: 15px;
    letter-spacing: -0.013em;
`;
const AllInputContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    max-width: 900px;
    margin: 0 auto;
    height: fit-content;
`;
const InputContainer = styled.div`
    height: fit-content;
`;
const ButtonContainer = styled.div`
    max-width: 900px;
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
`;
