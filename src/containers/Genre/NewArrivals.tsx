import React, { FC } from 'react';
import { useHistory, useParams } from 'react-router';

import NewArrivals from 'components/NewArrivals';
import useNovels from 'hooks/use-novels';
import { genreMapById } from 'services/novelshelf/constants';
import paths from 'paths';

const NewArrivalsContainer: FC = () => {
  const history = useHistory();
  const { genreId } = useParams<{ genreId: string }>();
  if (!genreId) history.replace(paths.home);
  const { novels, loading } = useNovels({
    limit: 100,
    genre: [genreMapById[genreId]],
  });

  return <NewArrivals novels={novels} loading={loading} genreId={genreId} />;
};

export default NewArrivalsContainer;
