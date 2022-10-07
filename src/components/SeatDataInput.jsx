import styled from "styled-components";

export default function SeatDataInput({
    children,
    identifier,
    selSeat,
    selectedSeats,
    setSelectedSeats,
    type,
}) {
    function handleInputChange({ target: { value } }) {
        const newSelSeats = selectedSeats.map((selectedSeat) =>
            selectedSeat.idAssento === selSeat.idAssento
                ? { ...selSeat, [type]: value }
                : { ...selectedSeat }
        );
        setSelectedSeats([...newSelSeats]);
    }
    return (
        <InputContainer>
            <InputTitle>{children}</InputTitle>
            <InputBox
                data-identifier={identifier}
                onChange={handleInputChange}
                value={selSeat[type]}
                placeholder={`Digite seu ${type === "cpf" ? type.toUpperCase() : type}...`}
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
