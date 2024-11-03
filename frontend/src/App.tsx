import { BrowserRouter, Route, Routes } from "react-router-dom"
import Login from "./pages/login"
import Home from "./pages/home"
import AuthOutlet from "@auth-kit/react-router/AuthOutlet"
import AuthProvider from "react-auth-kit"
import { store } from "./authentication/store"


function App() {

  return (
    <>
      <AuthProvider store={store}>
        <BrowserRouter>
          <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<AuthOutlet fallbackPath='/login' />}>
            <Route path="/" element={<Home />} index />
          </Route>
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
