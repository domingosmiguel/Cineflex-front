import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";

import Header from "./components/Header";
import GlobalStyles from "./globalStyles";
import Main from "./components/Main";
import Sessions from "./components/Sessions";
import Reservation from "./components/Reservation";
import Checkout from "./components/Checkout";

function App() {
    const [sessionsData, setSessionsData] = useState(null);
    const [timeData, setTimeData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header />
            <Routes>
                <Route path="/" element={<Main />} exact />
                <Route
                    path="/film/:filmId"
                    element={
                        <Sessions sessionsData={sessionsData} setSessionsData={setSessionsData} />
                    }
                />
                <Route
                    path="/session/:timeId"
                    element={
                        <Reservation
                            timeData={timeData}
                            setTimeData={setTimeData}
                            selectedSeats={selectedSeats}
                            setSelectedSeats={setSelectedSeats}
                        />
                    }
                />
                <Route
                    element={
                        <Checkout
                            timeData={timeData}
                            selectedSeats={selectedSeats}
                            setSelectedSeats={setSelectedSeats}
                        />
                    }
                    path={`/success`}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
