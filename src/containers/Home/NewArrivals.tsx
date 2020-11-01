import React, { FC } from 'react';

import NewArrivals from 'components/Home/NewArrivals';
import useNovels from 'hooks/use-novels';

const NewArrivalsContainer: FC = () => {
  const { novels, loading } = useNovels({ limit: 100 });

  return <NewArrivals novels={novels} loading={loading} />;
};

export default NewArrivalsContainer;
