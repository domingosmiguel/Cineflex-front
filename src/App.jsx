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
    const [sessionsData, setSessionsData] = useState(null);
    const [timeId, setTimeId] = useState("");
    const [timeData, setTimeData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);

    return (
        <>
            <GlobalStyles />
            {/* <GlobalBackButton /> */}
            <Header setSelectedSeats={setSelectedSeats}></Header>
            <BrowserRouter>
                <Routes>
                    <Route
                        element={
                            <DataProvider value={{ setFilmId }}>
                                <Main />
                            </DataProvider>
                        }
                        path="/"
                        exact
                    />
                    <Route
                        element={
                            <DataProvider value={{ setTimeId }}>
                                <Sessions
                                    filmID={filmID}
                                    sessionsData={sessionsData}
                                    setSessionsData={setSessionsData}
                                />
                            </DataProvider>
                        }
                        path={`/film/${filmID}`}
                    />
                    <Route
                        element={
                            <Reservation
                                timeId={timeId}
                                timeData={timeData}
                                setTimeData={setTimeData}
                                selectedSeats={selectedSeats}
                                setSelectedSeats={setSelectedSeats}
                            />
                        }
                        path={`/session/${timeId}`}
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
        </>
    );
}

export default App;
