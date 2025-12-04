import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './ThemeContext';
import Layout from './components/Layout';
import Home from './Home';
import Typography from './ui/components/showcase/Typography';
import Colors from './ui/components/showcase/Colors';
import NonModalWelcomeScreenPage from './pages/NonModalWelcomeScreenPage';
import ComponentPages from './pages/ComponentPages';
import WidgetPages from './pages/WidgetPages';
import './ui/styles/Themes.css';
import './App.css';

function App() {
    return (
        <ThemeProvider>
            <BrowserRouter>
                <Layout>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/styles/typography" element={<Typography />} />
                        <Route path="/styles/colors" element={<Colors />} />
                        <Route path="/components/:componentKey" element={<ComponentPages />} />
                        <Route path="/widgets/:widgetKey" element={<WidgetPages />} />
                        <Route path="/features/non-modal-welcome-screen" element={<NonModalWelcomeScreenPage />} />
                    </Routes>
                </Layout>
            </BrowserRouter>
        </ThemeProvider>
    );
}

export default App;
