import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Router } from './Router';
import './styles/global.scss';

export default function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
         <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}
