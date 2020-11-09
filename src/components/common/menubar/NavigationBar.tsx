import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from '@emotion/styled';
import Header from 'semantic-ui-react/dist/commonjs/elements/Header';

import { ThemeContext } from 'contexts';
import paths from 'paths';

const NavigationBar: FC = () => {
  const theme = useContext(ThemeContext);
  const StyledHeader = styled(Header)`
    margin-top: 0.5em !important;
    padding: 0 2rem !important;
    font-family: ${theme.font.fontFamily};
    color: ${theme.color.black};
    a {
      color: ${theme.color.black};
      &:hover {
        text-decoration: none;
      }
    }
    @media screen and (max-width: 768px) {
      padding: 0 1rem !important;
    }
  `;

  return (
    <StyledHeader as="h1" text>
      <Link to={paths.home}>ノベルシェルフ</Link>
    </StyledHeader>
  );
};

export default NavigationBar;
