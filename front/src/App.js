import styles from "./App.module.scss";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import { useState } from "react";
import Homepage from "./pages/Homepage/Homepage";
import Profile from "./pages/Profile/Profile";
import Register from "./pages/Forms/Register/Register";
import Login from "./pages/Forms/Login/Login";

function App() {
  const [seeComponent, setSeeComponent] = useState(1);
  const [user, setUser] = useState(null);

  console.log("user", user);

  function seeRegisterForm() {
    setSeeComponent(2);
  }

  function seeLoginForm() {
    setSeeComponent(3);
  }

  function seeHomepage() {
    setSeeComponent(1);
  }

  function seeProfile() {
    setSeeComponent(4);
  }

  function logout() {
    setSeeComponent(3);
    setUser(null);
  }

  function getUser(userLogged) {
    setUser(userLogged);
  }
  return (
    <div className={`d-flex flex-column ${styles.appContainer}`}>
      <Header
        seeRegisterForm={seeRegisterForm}
        seeLoginForm={seeLoginForm}
        seeHomepage={seeHomepage}
        user={user}
        seeProfile={seeProfile}
        logout={logout}
      />
      {seeComponent === 1 ? (
        <Homepage />
      ) : seeComponent === 2 ? (
        <Register seeLoginForm={seeLoginForm} />
      ) : seeComponent === 3 ? (
        <Login seeHomepage={seeHomepage} getUser={getUser} />
      ) : (
        <Profile user={user} />
      )}
      <Footer />
    </div>
  );
}

export default App;
