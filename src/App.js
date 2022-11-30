import { useState, useContext } from "react";
import { Routes, Route } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/Dashboard";
import Team from "./scenes/Team";
import Blog from "./scenes/Blog";
import Bar from "./scenes/Bar";
import Category from "./scenes/Category";
import Form from "./scenes/Form";
import Line from "./scenes/Line";
import Pie from "./scenes/Pie";
import LoginAdmin from './components/pages/LoginAdmin'
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import AuthContextProvider from "./contexts/AuthContext";
import { AuthContext } from "./contexts/AuthContext";
import PostContextProvider from "./contexts/PostContext";
import {ToastProvider} from './contexts/ToastProvider'

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { authState: { isAuthenticated } } = useContext(AuthContext)

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <AuthContextProvider>
          <PostContextProvider>
            <ToastProvider>
            {!isAuthenticated && (
              <Routes>
                <Route path="/" element={<LoginAdmin />} />
                <Route path="/login" element={<LoginAdmin />} />
              </Routes>
            )}
            {isAuthenticated && (
              <>
                <CssBaseline />
                <div className="app">
                  <Sidebar isSidebar={isSidebar} />
                  <main className="content">
                    <Topbar setIsSidebar={setIsSidebar} />
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/team" element={<Team />} />
                      <Route path="/blog" element={<Blog />} />
                      <Route path="/category" element={<Category />} />
                      <Route path="/form" element={<Form />} />
                      <Route path="/bar" element={<Bar />} />
                      <Route path="/pie" element={<Pie />} />
                      <Route path="/line" element={<Line />} />

                    </Routes>
                  </main>
                </div>
              </>
            )}
            </ToastProvider>
          </PostContextProvider>
        </AuthContextProvider>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
