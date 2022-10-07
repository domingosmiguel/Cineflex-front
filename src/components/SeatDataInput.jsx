import { useState } from "react";
import styled from "styled-components";

function TestaCPF(strCPF) {
    var Soma;
    var Resto;
    Soma = 0;
    if (strCPF == "00000000000") return false;

    for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(9, 10))) return false;

    Soma = 0;
    for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i);
    Resto = (Soma * 10) % 11;

    if (Resto == 10 || Resto == 11) Resto = 0;
    if (Resto != parseInt(strCPF.substring(10, 11))) return false;
    return true;
}
export default function SeatDataInput({
    children,
    identifier,
    selSeat,
    selectedSeats,
    setSelectedSeats,
    type,
}) {
    const [isValid, setIsValid] = useState(true);
    function handleInputChange({ target: { value } }) {
        const newSeatsData = selectedSeats.map((selectedSeat) =>
            selectedSeat.idAssento === selSeat.idAssento
                ? { ...selSeat, [type]: value }
                : { ...selectedSeat }
        );
        setSelectedSeats([...newSeatsData]);
        if (type === "cpf") {
            const newValidation = value === "" ? true : TestaCPF(value);
            setIsValid(newValidation);
        }
    }
    console.log(isValid);
    return (
        <InputContainer>
            <InputTitle>{children}</InputTitle>
            <InputBox
                type={type === "cpf" ? "number" : "text"}
                data-identifier={identifier}
                onChange={handleInputChange}
                value={selSeat[type]}
                placeholder={`Digite seu ${type === "cpf" ? type.toUpperCase() : type}...`}
                isValid={isValid}
            ></InputBox>
        </InputContainer>
    );
}

const InputContainer = styled.div`
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;
    margin-top: 10px;
`;
const InputTitle = styled.div`
    font-size: 18px;
    line-height: 21px;
`;
const InputBox = styled.input`
    width: 280px;
    height: 50px;
    padding: 15px;
    border: 1px solid #d4d4d4;
    border: ${({ isValid }) => (isValid ? "1px solid #d4d4d4" : "2px solid red")};
    border-radius: 3px;
    font-size: 18px;
    line-height: 21px;
    color: #afafaf;

    &::placeholder {
        font-style: italic;
        font-weight: 400;
        font-size: 17px;
        line-height: 21px;
        display: flex;
        align-items: center;
        color: #d4d4d4;
    }
    &:focus {
        outline: none;
    }
`;
