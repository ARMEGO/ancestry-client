import "primereact/resources/themes/lara-light-indigo/theme.css"; //theme
import "primereact/resources/primereact.min.css"; //core css
import "primeicons/primeicons.css"; //icons
import { Routes, Route } from "react-router-dom";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthProvider } from "./custom-hooks/useAuth";
import Header from "./components/Header";
import { BASE_URL, Path } from './routePath';
import Login from './pages/login';
import CreateUser from './pages/create-user';
import Home from './pages/home';
import NoPage from "./pages/NoPage";
import { useCallback, useEffect, useRef } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addCities, addPaymentOptions } from "./store/commonSlice";
import { addErrors } from "./store/errorsSlice";
import { Toast } from 'primereact/toast';

function App() {
  const toast = useRef(null);
  const errors = useSelector(state => state.errors);
  const dispatch = useDispatch();

  const fetchData = useCallback(async () => {
    function getCities() {
      return axios.get(BASE_URL + "cities");
    }

    function getPaymentOptions() {
      return axios.get(BASE_URL + "paymentOptions");
    }

    try {
      const [citiesResponse, paymentOptionsResponse] = await Promise.all([getCities(), getPaymentOptions()]);
      if (citiesResponse.status === 200) dispatch(addCities(citiesResponse.data));
      if (paymentOptionsResponse.status === 200) dispatch(addPaymentOptions(paymentOptionsResponse.data));
    } catch (error) {
      const { name, message, code } = error;
      dispatch(addErrors({ name, message, code }));
    }
  }, [])

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  useEffect(() => {
    if (errors.length > 0) {
      toast.current.show(errors.map(error => {
        return { severity: 'error', summary: error.name, detail: error.message, life: 3000 }
      }));
    }
  }, [errors]);

  return (
    <AuthProvider>
      <Header />
      <Routes>
        <Route path={Path.USER_DETAILS} element={<ProtectedRoute>
          <Home />
        </ProtectedRoute>} />
        <Route path={Path.LOGIN} element={<Login />} />
        <Route path={Path.CREATE_USER} element={<CreateUser />} />
        <Route path={Path.ANY} element={<NoPage />} />
      </Routes>
      <Toast ref={toast} />
    </AuthProvider>
  )
}

export default App
