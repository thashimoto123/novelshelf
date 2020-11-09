import React, { FC, useRef } from 'react';

import NewArrivals from 'components/NewArrivals';
import useNovels from 'hooks/use-novels';

const NewArrivalsContainer: FC = () => {
  const optionsRef = useRef({ limit: 100 });
  const { novels, loading } = useNovels(optionsRef.current);
  console.log('list:test');

  return <NewArrivals novels={novels} loading={loading} />;
};

export default NewArrivalsContainer;
