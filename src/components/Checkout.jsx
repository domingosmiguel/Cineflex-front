import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

import Button from "./Button";
import Title from "./Title";

export default function Checkout({ timeData, selectedSeats, setSelectedSeats }) {
    const { day, movie, name } = timeData;
    const navigate = useNavigate();

    function handleHomeButtonClick() {
        navigate("/");
        setSelectedSeats([]);
    }
    return (
        <React.Fragment>
            <Title color="var(--darkGreen)" fontWeight="700">
                Pedido feito
                <br />
                com sucesso!
            </Title>
            <CheckoutContainer>
                <CheckoutDisplay>
                    <h2>Filme e sessão</h2>
                    <h3 data-identifier="movie-session-infos-reserve-finished">
                        {movie.title}
                        <br />
                        {`${day.date} - ${name}`}
                    </h3>
                    <h2>Ingressos</h2>
                    {selectedSeats.map((selSeat, i) => {
                        const seatNumb =
                            selSeat.idAssento % 100 < 50
                                ? selSeat.idAssento % 100
                                : (selSeat.idAssento % 100) - 50;
                        return (
                            <h3 key={i} data-identifier="seat-infos-reserve-finished">
                                Assento {seatNumb}
                                <br />
                            </h3>
                        );
                    })}
                    <h2>Comprador</h2>
                    {selectedSeats.map((selSeat, i) => {
                        return (
                            <h3 key={i} data-identifier="buyer-infos-reserve-finished">
                                Nome: {selSeat.nome}
                                <br />
                                CPF: {selSeat.cpf}
                                <br />
                            </h3>
                        );
                    })}
                    <ButtonContainer>
                        <Button
                            identifier="back-to-home-btn"
                            data="/"
                            handleClick={handleHomeButtonClick}
                        >
                            Voltar pra Home
                        </Button>
                    </ButtonContainer>
                </CheckoutDisplay>
            </CheckoutContainer>
        </React.Fragment>
    );
}

const CheckoutContainer = styled.section`
    position: absolute;
    top: 167px;
    bottom: 0;
    width: 100%;
`;
const CheckoutDisplay = styled.div`
    position: relative;
    max-width: 900px;
    width: 100%;
    padding: 0 30px;
    margin: 0 auto;

    h2 {
        margin: 40px 0 15px;
        width: 100%;
        font-weight: 700;
        font-size: 24px;
        line-height: 28px;
        letter-spacing: 0.04em;
    }
    h3 {
        font-size: 22px;
        line-height: 26px;
        letter-spacing: 0.04em;
    }
`;
const ButtonContainer = styled.div`
    max-width: 900px;
    margin: 50px auto 0;
    display: flex;
    justify-content: center;
`;
