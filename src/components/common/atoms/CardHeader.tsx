import React, { FC, useContext } from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from 'contexts';

import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import { CardHeaderProps } from 'semantic-ui-react/dist/commonjs/views/Card/CardHeader';

const CardHeader: FC<CardHeaderProps> = ({ children, ...props }) => {
  const theme = useContext(ThemeContext);

  const Header = styled(Card.Header)`
    &&& {
      color: ${theme.color.black} !important;
      font-family: ${theme.font.fontFamily} !important;
      font-size: 1.2rem !important;
      margin: 0 0 0.2em !important;
    }
    a {
      color: ${theme.color.black} !important;
      &:hover {
        text-decoration: underline;
      }
    }
  `;

  return <Header {...props}>{children}</Header>;
};

export default CardHeader;
