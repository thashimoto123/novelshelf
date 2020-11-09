import React, { FC, useContext } from 'react';
import { Link } from 'react-router-dom';
import Menu from 'semantic-ui-react/dist/commonjs/collections/Menu';
import styled from '@emotion/styled';

import { genre } from 'services/novelshelf/constants';
import { ThemeContext } from 'contexts';

const GenreBar: FC<{
  activeGenre?: string;
}> = ({ activeGenre }) => {
  const theme = useContext(ThemeContext);
  const StyledMenu = styled(Menu)`
    overflow-x: auto;
    width: 100%;
    font-family: ${theme.font.fontFamily} !important;
  `;
  const MenuItem = styled(Menu.Item)`
    font-weight: 500 !important;
  `;

  return (
    <StyledMenu center>
      {Object.keys(genre).map((genreId) => (
        <MenuItem
          key={genreId}
          name={genre[genreId]}
          as={Link}
          to={`/genre/${genreId}`}
          active={genreId === activeGenre}
        />
      ))}
    </StyledMenu>
  );
};

export default GenreBar;
