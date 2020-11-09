import React, { FC, useMemo } from 'react';
import { useHistory, useParams } from 'react-router';

import NewArrivals from 'components/NewArrivals';
import useNovels from 'hooks/use-novels';
import paths from 'paths';

const NewArrivalsContainer: FC = () => {
  const history = useHistory();
  const { genreId } = useParams<{ genreId: string }>();
  const options = useMemo(
    () => ({
      limit: 100,
      genre: [genreId],
    }),
    [genreId],
  );

  if (!genreId) history.replace(paths.home);

  const { novels, loading } = useNovels(options);

  return <NewArrivals novels={novels} loading={loading} genreId={genreId} />;
};

export default NewArrivalsContainer;
