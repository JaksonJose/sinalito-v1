import { BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './contexts/AuthContext';
import { Router } from './Router';
import './styles/global.scss';

function App() {
  return (
    <BrowserRouter>
      <AuthContextProvider>
         <Router />
      </AuthContextProvider>
    </BrowserRouter>
  );
}

export default App;
