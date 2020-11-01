import React, { FC } from 'react';

import { Novel } from 'services/novelshelf/models/novel';
import DividingHeader from 'components/common/header/DividingHeader';
import NovelList from 'components/common/list/NovelList';
import ListLoader from 'components/common/atoms/ListLoader';

type NewArrivalsProps = { novels: Novel[]; loading?: boolean };

const NewArrivals: FC<NewArrivalsProps> = ({ novels, loading }) => (
  <div>
    <DividingHeader icon="calendar alternate outline">
      新着ノベル
    </DividingHeader>
    {loading ? <ListLoader /> : <NovelList novels={novels} />}
  </div>
);

export default NewArrivals;
