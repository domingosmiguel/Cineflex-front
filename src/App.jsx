import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import GlobalStyles from "./globalStyles";
import Main from "./components/Main";
import Sessions from "./components/Sessions";
import { useState } from "react";
import { DataProvider } from "./dataContext";

function App() {
    const [idFilme, setIdFilme] = useState("");

    return (
        <BrowserRouter>
            <GlobalStyles />
            <Header></Header>
            <Routes>
                <Route
                    element={
                        <DataProvider value={{ setIdFilme }}>
                            <Main />
                        </DataProvider>
                    }
                    path="/"
                    exact
                />
                <Route element={<Sessions />} path={`/sessions/${idFilme}`} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
