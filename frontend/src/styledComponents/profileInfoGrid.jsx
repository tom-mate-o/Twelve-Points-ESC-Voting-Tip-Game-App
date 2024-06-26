import styled, { css } from 'styled-components';

export const ProfileInfoGrid = styled.div`
  border-radius: 15px;
  margin-top: 30px;
  width: 100%;
  color: var(--textOnDark);
  font-weight: 700;

  display: grid;

  grid-template-columns: 1fr 10fr;
  grid-template-rows: 1fr 1fr;
  gap: 0px;
  justify-items: flex-start;
  align-items: center;
  margin-inline-start: 15px;

  img {
    height: 90px;
    width: 90px;
    object-fit: cover;
    object-position: center;
    border-radius: 10px;
  }

  .avatar {
    grid-column: 1 / 2;
    grid-row: 1 / 3;
    margin-right: 10px;
  }

  .username {
    grid-column: 2 / 3;
    grid-row: 1 / 2;
    font-size: 1.5em;
    font-weight: 700;
    text-align: left;
    text-transform: uppercase;
  }

  .button {
    grid-column: 2 / 3;
    grid-row: 2 / 3;
    font-size: 0.8em;
    font-weight: 600;
    text-align: left;
    background-color: var(--button);
    color: var(--textOnButton);
    height: 40px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
  }

  .button:hover {
    background-color: var(--hoverButton);
    cursor: pointer;
  }
`;
