import React, { FC, useContext } from 'react';
import styled from '@emotion/styled';
import { ThemeContext } from 'contexts';

import Card from 'semantic-ui-react/dist/commonjs/views/Card';
import { CardMetaProps } from 'semantic-ui-react/dist/commonjs/views/Card/CardMeta';

const CardMeta: FC<CardMetaProps> = ({ children, ...props }) => {
  const theme = useContext(ThemeContext);
  const Meta = styled(Card.Meta)`
    font-size: 0.8rem !important;
    color: ${theme.color.gray} !important;
    a {
      color: ${theme.color.gray} !important;
      &:hover {
        text-decoration: underline;
      }
    }
  `;

  return <Meta {...props}>{children}</Meta>;
};

export default CardMeta;
