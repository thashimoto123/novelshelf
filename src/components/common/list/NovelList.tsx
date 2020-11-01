import React, { FC } from 'react';
import styled from '@emotion/styled';

import { Novel } from 'services/novelshelf/models/novel';
import NovelCard from 'components/common/card/NovelCard';
import CardGroup from 'semantic-ui-react/dist/commonjs/views/Card/CardGroup';

const NovelList: FC<{ novels: Novel[] }> = ({ novels }) => {
  const ListWrapper = styled(CardGroup)`
    margin: 1rem 0.5rem !important;
  `;

  return (
    <ListWrapper centered>
      {novels.map((novel) => (
        <NovelCard novel={novel} key={novel.id} />
      ))}
    </ListWrapper>
  );
};

export default NovelList;
