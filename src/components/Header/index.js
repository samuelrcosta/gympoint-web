import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { signOut } from '../../store/modules/auth/actions';
import { Container, LogoArea, UserArea } from './styles';
import colors from '../../styles/colors';

import logo from '../../assets/logo-header.png';

export default function Header() {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user);

  function handleLogout() {
    dispatch(signOut());
  }

  return (
    <Container>
      <LogoArea>
        <img src={logo} alt="GymPoint" />
      </LogoArea>
      <ul>
        <li>
          <NavLink activeStyle={{ color: colors.textDark }} to="/students">
            Alunos
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: colors.textDark }} to="/plans">
            Planos
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: colors.textDark }} to="/enrolls">
            Matrículas
          </NavLink>
        </li>
        <li>
          <NavLink activeStyle={{ color: colors.textDark }} to="/help-orders">
            Pedidos de Auxílio
          </NavLink>
        </li>
      </ul>

      <UserArea>
        <strong>{user.name}</strong>
        <button type="button" onClick={handleLogout}>
          sair
        </button>
      </UserArea>
    </Container>
  );
}
