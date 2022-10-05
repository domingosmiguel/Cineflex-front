import styled from "styled-components";

export default function SeatDataInput({
    children,
    selSeat,
    selectedSeats,
    SetSelectedSeats,
    type,
}) {
    function handleInputChange({ target: { value } }) {
        const newSelSeats = selectedSeats.map((selectedSeat) =>
            selectedSeat.idAssento === selSeat.idAssento
                ? { ...selSeat, [type]: value }
                : { ...selectedSeat }
        );
        SetSelectedSeats([...newSelSeats]);
    }
    return (
        <InputContainer>
            <InputTitle>{children}</InputTitle>
            <InputBox onChange={handleInputChange} value={selSeat[type]}></InputBox>
        </InputContainer>
    );
}

const InputContainer = styled.div``;
const InputTitle = styled.div``;
const InputBox = styled.input``;
