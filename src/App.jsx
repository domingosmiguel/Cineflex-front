import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState } from "react";
import { DataProvider } from "./dataContext";

import Header from "./components/Header";
import GlobalStyles from "./globalStyles";
import Main from "./components/Main";
import Sessions from "./components/Sessions";
import Reservation from "./components/Reservation";

function App() {
    const [filmID, setFilmId] = useState("");
    const [sessionsData, setSessionsData] = useState("");
    const [timeId, setTimeId] = useState("");
    const [timeData, setTimeData] = useState("");

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header></Header>
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
                            <Reservation timeData={timeData} />
                        </DataProvider>
                    }
                    path={`/session/${timeId}`}
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
