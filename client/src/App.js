import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/auth/Register";
import Login from './pages/auth/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import PublicRoute from "./components/Routes/PublicRoute";
import Donar from "./pages/dashboard/Donar";
import Hospitals from "./pages/dashboard/Hospitals";
import OrganisationPage from "./pages/dashboard/OrganisationPage";
import Consumer from "./pages/dashboard/Consumer";
import Donation from "./pages/donation";
import Analytics from "./pages/dashboard/Analytics";
import AdminHome from "./pages/admin/AdminHome";
import DonarList from "./pages/admin/DonarList";
import HospitalList from "./pages/admin/HospitalList";
import OrgList from "./pages/admin/OrgList";

function App() {
  return (
    <>
      <ToastContainer />
      <Routes>

        {/* ========= admin ========= */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donar-list"
          element={
            <ProtectedRoute>
              <DonarList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/hospital-list"
          element={
            <ProtectedRoute>
              <HospitalList />
            </ProtectedRoute>
          }
        />
        <Route
          path="/org-list"
          element={
            <ProtectedRoute>
              <OrgList />
            </ProtectedRoute>
          }
        />

        <Route
          path="/hospital"
          element={
            <ProtectedRoute>
              <Hospitals />
            </ProtectedRoute>
          }
        />
        <Route path='/donar' element={
          <ProtectedRoute>
            <Donar />
          </ProtectedRoute>
        } />
        <Route path='/' element={
          <ProtectedRoute>
            <HomePage />
          </ProtectedRoute>
        } />
        <Route
          path="/consumer"
          element={
            <ProtectedRoute>
              <Consumer />
            </ProtectedRoute>
          }
        />
        <Route
          path="/donation"
          element={
            <ProtectedRoute>
              <Donation />
            </ProtectedRoute>
          }
        />
        <Route
          path="/analytics"
          element={
            <ProtectedRoute>
              <Analytics />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orgnaisation"
          element={
            <ProtectedRoute>
              <OrganisationPage />
            </ProtectedRoute>
          }
        />
        <Route path='/login' element={
          <PublicRoute>
            <Login />
          </PublicRoute>} />
        <Route path='/register' element={
          <PublicRoute>
            <Register />
          </PublicRoute>} />
      </Routes>

    </>
  );
}

export default App;
