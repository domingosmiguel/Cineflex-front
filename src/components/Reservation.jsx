import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import Footer from "./Footer";
import SeatDataInput from "./SeatDataInput";
import Seat from "./Seat";
import Title from "./Title";
import Button from "./Button";
import Modal from "./Modal";
import LoadingPage from "./LoadingPage";

export default function Reservation({
    timeId,
    timeData,
    setTimeData,
    selectedSeats,
    setSelectedSeats,
    functionObj,
    navData,
    setNavData,
}) {
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [seatModal, setSeatModal] = useState({});

    useEffect(() => {
        setTimeData(null);
        setSelectedSeats([]);
        axios
            .get(`https://mock-api.driven.com.br/api/v5/cineflex/showtimes/${timeId}/seats`)
            .then(({ data }) => {
                setTimeData({ ...data });
            })
            .catch((error) => {
                alert(error);
            });
    }, []);
    if (timeData === null) {
        return <LoadingPage />;
    }

    const { day, movie, name, seats } = timeData;
    const addNavHistory = functionObj.add;

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
                setSeatModal(seat);
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
    function handleButtonClick(destination) {
        navigate(destination);
        addNavHistory(navData);
        setNavData(destination);
    }
    return (
        <>
            <Title>Selecione o(s) assento(s)</Title>
            <ReservationPage>
                <SeatsContainer>
                    <SeatsDisplay>
                        <MovieScreen />
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
                            data="/success"
                            handleClick={handleButtonClick}
                            disabled={selectedSeats.length > 0 ? false : true}
                        >
                            Reservar assento(s)
                        </Button>
                    </ButtonContainer>
                </SeatsContainer>
            </ReservationPage>
            <Footer posterURL={movie.posterURL}>
                {movie.title}
                <br />
                {`${day.weekday} - ${name}`}
            </Footer>
            {openModal && (
                <Modal seatModal={seatModal} setOpenModal={setOpenModal} removeSeat={removeSeat} />
            )}
        </>
    );
}
const ReservationPage = styled.div`
    position: relative;
    overflow-y: scroll;
    width: 100vw;
    height: calc(100vh - 294px);
`;

const SeatsContainer = styled.div`
    max-width: 1240px;
    width: 100%;
    height: fit-content;
    position: relative;
    margin: 0 auto;
    padding-bottom: 25px;
`;
const SeatsDisplay = styled.div`
    width: 325px;
    margin: 0 auto;
    padding: 0 10px 12px;
    display: grid;
    gap: 9px 5px;
    grid-template-columns: repeat(10, 26px);
    grid-template-rows: repeat(7, 26px);
    grid-template-areas:
        "sc sc sc sc sc sc sc sc sc sc"
        /* ".. .. .. .. .. .. .. .. .. .." */
        /* ".. .. .. .. .. .. .. .. .. .." */
        "se .. SE SE SE SE SE .. Se Se"
        "se .. SE SE SE SE SE .. Se Se"
        "se .. SE SE SE SE SE .. Se Se"
        "se .. SE SE SE SE SE .. Se Se"
        "se .. SE SE SE SE SE .. Se Se"
        "sE sE sE sE sE sE sE sE sE sE";

    @media (min-width: 720px) {
        margin: 0;
    }
`;
const SeatsSubtitleContainer = styled.div`
    max-width: 325px;
    margin: 0 auto;
    display: flex;
    justify-content: space-evenly;
    align-items: center;

    @media (min-width: 720px) {
        margin: 0;
    }
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
    margin-top: 9px;
`;
const AllInputContainer = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    margin: 0 auto;
    height: fit-content;

    @media (min-width: 720px) {
        max-width: 100%;
        margin-left: 345px;
        justify-content: flex-start;
        position: absolute;
        top: 0;
    }
`;
const InputContainer = styled.div`
    height: fit-content;
    margin: 5px 5px;
`;
const ButtonContainer = styled.div`
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
    width: 325px;

    @media (min-width: 720px) {
        margin: 50px 0 0;
    }
`;
const MovieScreen = styled.div`
    height: 3px;
    grid-area: "sc";
    grid-column: sc;
    background-color: var(--darkGray);
`;
