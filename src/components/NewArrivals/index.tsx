import React, { FC } from 'react';

import { Novel } from 'services/novelshelf/models/novel';
import DividingHeader from 'components/common/header/DividingHeader';
import NovelList from 'components/common/list/NovelList';
import ListLoader from 'components/common/atoms/ListLoader';
import { genre } from 'services/novelshelf/constants';

type NewArrivalsProps = {
  novels: Novel[];
  loading?: boolean;
  genreId?: string;
};

const NewArrivals: FC<NewArrivalsProps> = ({ novels, loading, genreId }) => (
  <div>
    <DividingHeader icon="calendar alternate outline">
      {genreId && genre[genreId] ? <>{genre[genreId]}の</> : null}
      新着ノベル
    </DividingHeader>
    {loading ? <ListLoader /> : <NovelList novels={novels} />}
  </div>
);

export default NewArrivals;
