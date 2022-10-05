import React from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import SeatDataInput from "./SeatDataInput";
import Seat from "./Seat";
import Title from "./Title";
import Button from "./Button";

export default function Reservation({ timeData, selectedSeats, SetSelectedSeats }) {
    const { day, movie, name, seats } = timeData;
    const navigate = useNavigate();
    function handleSeatSelection(seat) {
        seat.selected = !seat.selected;
        if (!seat.selected) {
            const filteredSeats = selectedSeats.filter(
                (selectedSeat) => !(selectedSeat.idAssento === seat.id)
            );
            SetSelectedSeats([...filteredSeats]);
            return;
        }
        const newSelectedSeats = [...selectedSeats, { idAssento: seat.id, nome: "", cpf: "" }];
        SetSelectedSeats([...newSelectedSeats]);
    }
    function SubtitleGeneration() {
        const possibleSeatStatus = 3;
        const subsText = ["Selecionado", "Disponível", "Indisponível"];
        const color = [
            { borderColor: "var(--darkGreen)", backGroundColor: "var(--midGreen)" },
            { borderColor: "var(--darkGray)", backGroundColor: "var(--lightGray)" },
            { borderColor: "var(--darkYellow)", backGroundColor: "var(--lightYellow)" },
        ];
        const subtitles = [];
        for (let i = 0; i < possibleSeatStatus; i++) {
            subtitles.push(
                <SubtitleDiv key={i}>
                    <Seat subtitle={true} color={color[i]} />
                    <SubtitleTxt>{subsText[i]}</SubtitleTxt>
                </SubtitleDiv>
            );
        }
        return subtitles;
    }
    function checkoutSucceed({ data }) {
        console.log(data);
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
                        <Seat key={seat.id} seat={seat} handleSeatSelection={handleSeatSelection}>
                            {seat.name}
                        </Seat>
                    ))}
                </SeatsDisplay>
                <SeatsSubtitleContainer>{SubtitleGeneration()}</SeatsSubtitleContainer>
                <AllInputContainer>
                    {selectedSeats.map((selSeat) => (
                        <InputContainer key={selSeat.idAssento}>
                            <SeatDataInput
                                selSeat={selSeat}
                                selectedSeats={selectedSeats}
                                SetSelectedSeats={SetSelectedSeats}
                                type={"nome"}
                            >{`Nome do comprador (assento ${
                                selSeat.idAssento % 100 < 50
                                    ? selSeat.idAssento % 100
                                    : (selSeat.idAssento % 100) - 50
                            }):`}</SeatDataInput>
                            <SeatDataInput
                                selSeat={selSeat}
                                selectedSeats={selectedSeats}
                                SetSelectedSeats={SetSelectedSeats}
                                type={"cpf"}
                            >{`CPF do comprador (assento ${
                                selSeat.idAssento % 100 < 50
                                    ? selSeat.idAssento % 100
                                    : (selSeat.idAssento % 100) - 50
                            }):`}</SeatDataInput>
                        </InputContainer>
                    ))}
                </AllInputContainer>
                <ButtonContainer>
                    <Button
                        data={""}
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
`;
const InputContainer = styled.div``;
const ButtonContainer = styled.div`
    max-width: 900px;
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
`;
