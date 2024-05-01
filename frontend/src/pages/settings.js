//settings.js

import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { TbDoorExit } from 'react-icons/tb';
import { jwtDecode } from 'jwt-decode';
import showNotifications from '../components/showNotifications/showNotificationsToastify';
import updateUserInDatabase from '../utils/updateUserInDatabase';

//Styled Components
import { Title } from '../styledComponents/title';
import { SubTitle } from '../styledComponents/subTitle';
import { MainContainer } from '../styledComponents/mainContainer';
import { ProfileInfoGrid } from '../styledComponents/profileInfoGrid';

import { InputField } from '../styledComponents/inputField';
import { Boxtitle } from '../styledComponents/boxtitle';
import { WideButton } from '../styledComponents/wideButton';
import { birbImages } from '../assets/birbs/birbsimgs';
import { Button } from '../styledComponents/button';

//Costum Hooks
import useMongoDBUserData from '../costumHooks/useMongoDBUserData';

import { Select, MenuItem } from '@mui/material';

export default function Settings({ handleLogout }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const [value, setValue] = React.useState(0);

  function handleClickLogoutButton() {
    handleLogout();
    //navigate to login page
  }

  const { userData, setUserData } = useMongoDBUserData([]);

  useEffect(() => {
    if (userData) {
    }
  }, [userData]);

  const token = localStorage.getItem('token');
  const decodedToken = jwtDecode(token);

  const user = userData.find((user) => user.id === decodedToken.id);
  const avatarUrl = user ? user.avatarUrl : null;
  const username = user ? user.username : null;

  const newUsername = useRef();
  const password1 = useRef();
  const password2 = useRef();
  const notificationTime = useRef();
  const newAvatarUrl = useRef();

  function saveSettings(event) {
    event.preventDefault();

    if (password1.current.value !== password2.current.value) {
      showNotifications('Passwords do not match!', 'error');
      return;
    }

    const formData = new FormData();
    formData.append('newAvatar', newAvatarUrl.current.files[0]);
    formData.append('newUsername', newUsername.current.value);
    formData.append('newPassword', password1.current.value);
    // formData.append('theme', value);
    // formData.append('notificationTime', notificationTime.current.value);
    formData.append('userId', decodedToken.id);

    updateUserInDatabase(formData);
  }

  return (
    <div>
      <Title>Personal Settings</Title>

      <NavLink to="/">
        <WideButton onClick={handleClickLogoutButton}>
          <span>
            Logout <TbDoorExit />
          </span>
        </WideButton>
      </NavLink>

      <ProfileInfoGrid>
        <div className="avatar">
          {' '}
          <img
            className="writeImg"
            src={`${avatarUrl}?square&colors=8dedf9,cd72fe,f6ed60,ff99f2,fec880`}
            alt={username}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = birbImages.noavatar;
            }}
          ></img>
        </div>
        <div className="username">{username}</div>
        <input
          style={{ display: 'none' }}
          type="file"
          id="file"
          name="avatar"
          ref={newAvatarUrl}
        />
        <label htmlFor="file"></label>
      </ProfileInfoGrid>

      <SubTitle>Username</SubTitle>
      <MainContainer>
        <Boxtitle>new username</Boxtitle>
        <InputField>
          <input
            className=""
            ref={newUsername}
            minLength="3"
            maxLength="20"
          ></input>
        </InputField>
      </MainContainer>

      <SubTitle>Password</SubTitle>
      <MainContainer>
        <Boxtitle>new password</Boxtitle>
        <InputField>
          <input
            type="password"
            className=""
            ref={password1}
            minLength="6"
            maxLength="60"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
          ></input>
        </InputField>
      </MainContainer>
      <MainContainer>
        <Boxtitle>repeat new password</Boxtitle>
        <InputField>
          <input
            type="password"
            className=""
            ref={password2}
            minLength="6"
            maxLength="60"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
            title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
          ></input>
        </InputField>
      </MainContainer>

      <WideButton onClick={saveSettings}>Save the Settings</WideButton>
    </div>
  );
}
