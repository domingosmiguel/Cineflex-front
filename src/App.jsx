import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { DataProvider } from "./dataContext";

import Header from "./components/Header";
import GlobalStyles from "./globalStyles";
import Main from "./components/Main";
import Sessions from "./components/Sessions";
import Reservation from "./components/Reservation";
import Checkout from "./components/Checkout";
import GlobalBackButton from "./components/GlobalBackButton";

function App() {
    const [filmID, setFilmId] = useState("");
    const [sessionsData, setSessionsData] = useState("");
    const [timeId, setTimeId] = useState("");
    const [timeData, setTimeData] = useState("");
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header setSelectedSeats={setSelectedSeats}></Header>
            {/* <GlobalBackButton /> */}
            <Routes>
                <Route
                    element={
                        <DataProvider value={{ setFilmId, setSessionsData }}>
                            <Main />
                        </DataProvider>
                    }
                    path="/"
                    exact
                />
                <Route
                    element={
                        <DataProvider value={{ setTimeId, setTimeData }}>
                            <Sessions sessionsData={sessionsData} />
                        </DataProvider>
                    }
                    path={`/film/${filmID}`}
                />
                <Route
                    element={
                        <DataProvider value={{}}>
                            <Reservation
                                timeData={timeData}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                            />
                        </DataProvider>
                    }
                    path={`/session/${timeId}`}
                />
                <Route
                    element={
                        <DataProvider value={{}}>
                            <Checkout
                                timeData={timeData}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                            />
                        </DataProvider>
                    }
                    path={`/success`}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
