import React from "react";
import { Route, Navigate, Routes } from "react-router-dom";

import useAuth from "./hooks/useAuth";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AllGalleriesPage from "./pages/AllGalleriesPage";
import MyGalleriesPare from "./pages/MyGalleriesPare";
import CreateNewGalleryPage from "./pages/CreateNewGalleryPage";
import Logout from "./pages/Logout";
import SingleGallery from "./pages/SingleGallery";

export const ProtectedRoute = ( children ) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/" />;
  }
  return children;
};
export default function Router() {

  return (
    <Routes>

<Route index path="/" element={<AllGalleriesPage />} />
        <Route
          path="/gallery/:galley_id"
          element={
            <ProtectedRoute>
              <SingleGallery />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-galleries/:user_id"
          element={
            <ProtectedRoute>
              <MyGalleriesPare />
            </ProtectedRoute>
          }
        />
        <Route
          path="/create"
          element={
            <ProtectedRoute>
              <CreateNewGalleryPage />
            </ProtectedRoute>
          }
        />
         <Route
          path="/logout"
          element={
            <ProtectedRoute>
              <Logout />
            </ProtectedRoute>
          }
        />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />

     
    </Routes>
  );
}