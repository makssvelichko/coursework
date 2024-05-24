import "./header_office.css";
import logo from "./../../img/logo/logo.png";
import { NavLink } from "react-router-dom";
import AnchorLink from "../AnchorLink";
import React, { useState, createContext, useContext, useEffect } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { OFFICE_ROUTE } from "../../utils/consts";
import { load } from "./../../http/AuthServices";

export const ModalContext = createContext();

function HeaderOffice() {
  const setModalVisible = useContext(ModalContext);

  const [userName, setUserName] = useState("");
  const [userPhoto, setUserPhoto] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await load();
        if (userData) {
          setUserName(userData.username);
          setUserPhoto(process.env.REACT_APP_API_URL + userData.profilePhoto); // Формування URL фото
        }
      } catch (error) {
        console.error("Помилка завантаження даних користувача: ", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <header className="header_office">
      <div className="container">
        <div className="header_row">
          <div className="header_logo">
            <NavLink to={OFFICE_ROUTE}>
              <img src={logo} alt="LOGO" />
            </NavLink>
          </div>
          <nav className="header_nav_office">
            <ul>
              <li>
                <AnchorLink id="#!">
                  <div className="header_user_name">{userName || "user"}</div>
                </AnchorLink>
              </li>
              <li>
                <AnchorLink id="#!">
                  <div className="header_user">
                    <div
                      className="profile-container2"
                      onClick={() => setModalVisible(true)}
                    >
                      {userPhoto ? (
                        <img
                          className="profile-image2"
                          src={userPhoto}
                          alt="Profile"
                        />
                      ) : (
                        <FaRegUserCircle className="profile-image2" />
                      )}
                    </div>
                  </div>
                </AnchorLink>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default HeaderOffice;
