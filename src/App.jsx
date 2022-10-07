import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { DataProvider } from "./dataContext";

import Header from "./components/Header";
import GlobalStyles from "./globalStyles";
import Main from "./components/Main";
import Sessions from "./components/Sessions";
import Reservation from "./components/Reservation";
import Checkout from "./components/Checkout";

function App() {
    const [filmID, setFilmId] = useState("");
    const [sessionsData, setSessionsData] = useState(null);
    const [timeId, setTimeId] = useState("");
    const [timeData, setTimeData] = useState(null);
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [navHistory, setNavHistory] = useState([]);
    const [navData, setNavData] = useState([]);
    const functionObj = {
        add: (newHistory) => {
            navHistory.unshift(newHistory);
            setNavHistory(navHistory);
        },
        rm: () => {
            const newNavaData = navHistory.shift();
            setNavHistory(navHistory);
            setNavData(newNavaData);
        },
    };
    return (
        <>
            <GlobalStyles />
            <BrowserRouter>
                <Header navHistory={navHistory} functionObj={functionObj}></Header>
                <Routes>
                    <Route
                        element={
                            <DataProvider value={{ setFilmId, functionObj, setNavData }}>
                                <Main />
                            </DataProvider>
                        }
                        path="/"
                        exact
                    />
                    <Route
                        element={
                            <DataProvider value={{ setTimeId, functionObj, navData, setNavData }}>
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
                                functionObj={functionObj}
                                navData={navData}
                                setNavData={setNavData}
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
                                setNavHistory={setNavHistory}
                                setNavData={setNavData}
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
