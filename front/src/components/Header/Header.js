import styles from "./Header.module.scss";
import logo from "../../assets/images/logo.png";

export default function Header({
  seeRegisterForm,
  seeLoginForm,
  seeHomepage,
  user,
  seeProfile,
  logout,
}) {
  return (
    <header className={`d-flex align-items-center ${styles.header}`}>
      <div className="flex-fill">
        <img onClick={seeHomepage} src={logo} alt="logo du blog" />
      </div>
      <ul>
        {user ? (
          <>
            <button onClick={logout} className={`mr10 btn btn-primary`}>
              <span>Logout</span>
            </button>
            <button
              onClick={seeProfile}
              className={`mr10 btn btn-primary-reverse`}
            >
              <span>Profile</span>
            </button>
          </>
        ) : (
          <>
            <button
              onClick={seeRegisterForm}
              className={`mr10 btn btn-primary`}
            >
              <span>Register</span>
            </button>
            <button
              onClick={seeLoginForm}
              className={`mr10 btn btn-primary-reverse`}
            >
              <span>Login</span>
            </button>
          </>
        )}
      </ul>
    </header>
  );
}
