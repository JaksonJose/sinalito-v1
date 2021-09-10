import { BrowserRouter } from 'react-router-dom';
import  { Provider } from 'react-redux';
import { AuthContextProvider } from './contexts/AuthContext';
import { Router } from './Router';
import { store } from './store';
import './styles/global.scss';

export default function App() {
  return (
    <Provider store={store}>
       <BrowserRouter>
        <AuthContextProvider>
         <Router />
        </AuthContextProvider>
      </BrowserRouter>
    </Provider>
  );
}
