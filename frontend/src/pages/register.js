import React, { useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import uuid4 from 'uuid4';
import ShortUniqueId from 'short-unique-id';
import showNotifications from '../components/showNotifications/showNotificationsToastify';
import registerUserToDatabase from '../utils/registerUserToDatabase';

//Styled Components
import { Title } from '../styledComponents/title';
import { MainContainer } from '../styledComponents/mainContainer';
import { Boxtitle } from '../styledComponents/boxtitle';
import { InputField } from '../styledComponents/inputField';
import { Button } from '../styledComponents/button';
import { SubmitButton } from '../styledComponents/submitButton';

export default function Register() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const email1Ref = useRef();
  const email2Ref = useRef();
  const usernameRef = useRef();
  const password1Ref = useRef();
  const password2Ref = useRef();
  const formRef = useRef();

  const navigate = useNavigate();

  const registerUser = async (event) => {
    event.preventDefault();

    const formData = new FormData();
    // Zugriff auf die einzelnen Formularfelder (name-Attribut)
    const form = formRef.current;
    const id = uuid4();
    const uid = new ShortUniqueId({ length: 10 });
    const friendcodeGen = uid.rnd();
    const friendcodeRaw = friendcodeGen.toUpperCase();
    const friendcode = friendcodeRaw;
    const username = form.username.value;
    const avatarUrl = `https://source.boringavatars.com/beam/40/${username}`;

    let file;

    formData.append('id', id);
    formData.append('avatarUrl', avatarUrl);
    formData.append('email1', form.email1.value);
    formData.append('email2', form.email2.value);
    formData.append('username', form.username.value);
    formData.append('password1', form.password1.value);
    formData.append('password2', form.password2.value);
    formData.append('friendcode', friendcode);

    if (form.password1.value !== form.password2.value) {
      showNotifications('Passwords do not match!', 'error');
      return;
    }

    if (form.email1.value !== form.email2.value) {
      showNotifications('Emails do not match!', 'error');
      return;
    }

    async function navigateToLogin() {
      const result = await registerUserToDatabase(formData);
      if (result) {
        navigate('/login');
      } else {
        showNotifications('Registration failed!', 'error');
      }
    }

    navigateToLogin();
  };

  return (
    <div>
      <div className="title">
        <p>Register</p>
      </div>
      <MainContainer>
        <form ref={formRef} onSubmit={(e) => registerUser(e)}>
          <div>
            <Boxtitle>E-Mail</Boxtitle>
            <InputField>
              <input
                name="email1"
                ref={email1Ref}
                type="email"
                placeholder="E-Mail*"
                required
                minLength="6"
                maxLength="50"
                pattern="[a-z0-9._%+]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
              ></input>
            </InputField>
          </div>

          <div>
            <Boxtitle>Repeat E-Mail</Boxtitle>
            <InputField>
              <input
                name="email2"
                ref={email2Ref}
                type="email"
                placeholder="Repeat Email*"
                required
                minLength="6"
                maxLength="50"
                pattern="[a-z0-9._%+]+@[a-z0-9.-]+\.[a-z]{2,}$"
                title="Please enter a valid email address"
              ></input>
            </InputField>
          </div>

          <div>
            <Boxtitle>Username</Boxtitle>
            <InputField>
              <input
                name="username"
                ref={usernameRef}
                placeholder="Username*"
                required
                minLength="3"
                maxLength="10"
              ></input>
            </InputField>
          </div>

          <div>
            <Boxtitle>
              Password
              <br />
            </Boxtitle>
            <InputField>
              <input
                name="password1"
                ref={password1Ref}
                type="password"
                placeholder="Password*"
                required
                minLength="6"
                maxLength="60"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
              ></input>
            </InputField>
          </div>

          <div>
            <Boxtitle>Repeat Password</Boxtitle>
            <InputField>
              <input
                name="password2"
                ref={password2Ref}
                type="password"
                placeholder="Repeat Password*"
                required
                minLength="6"
                maxLength="60"
                pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}"
                title="Must contain at least one number and one uppercase and lowercase letter, and at least 6 or more characters"
              ></input>
            </InputField>
          </div>

          <SubmitButton>
            <button type="submit">Register</button>
          </SubmitButton>
        </form>
      </MainContainer>

      <div className="welcomeLink">
        <div>
          Already have an Account?
          <br />
          <NavLink to="/login">Click here to Login!</NavLink>
        </div>
      </div>
    </div>
  );
}
