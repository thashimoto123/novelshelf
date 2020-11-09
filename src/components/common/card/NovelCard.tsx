import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Novel } from 'services/novelshelf/models/novel';
import { Card, Icon } from 'semantic-ui-react';

import CardHeader from 'components/common/atoms/CardHeader';
import CardDescription from 'components/common/atoms/CardDescription';
import CardMeta from 'components/common/atoms/CardMeta';
import { limitCharactor } from 'utils/text-processor';
import { genre } from 'services/novelshelf/constants';
import { getHumanDate } from '../item-tools';

const NovelCard: FC<{ novel: Novel }> = ({ novel }) => {
  return (
    <Card>
      <Card.Content>
        <CardHeader>
          {novel.url ? (
            <>
              <a href={novel.url} target="_blank" rel="noreferrer">
                {novel.title}
                <Icon name="clone outline" style={{ fontSize: '0.8em' }} />
              </a>
            </>
          ) : (
            <>{novel.title}</>
          )}
        </CardHeader>
        <CardMeta>
          {novel.genre.map(
            (genreId, i) =>
              genre[genreId] && (
                <React.Fragment key={genreId}>
                  <Link to={`/genre/${genreId}`}>{genre[genreId]}</Link>
                  {i !== 0 && <> / </>}
                </React.Fragment>
              ),
          )}
          <br />
          更新日時：{getHumanDate(novel.updatedAt)}
        </CardMeta>
        <CardDescription>
          {novel.story ? limitCharactor(novel.story, 120) : ''}
        </CardDescription>
      </Card.Content>
      <Card.Content extra>
        <CardMeta>
          {novel.authorUrl ? (
            <>
              <Icon name="user" />
              <a href={novel.authorUrl} target="_blank" rel="noreferrer">
                {novel.author} / {novel.site}
                <Icon name="clone outline" style={{ fontSize: '0.8em' }} />
              </a>
            </>
          ) : (
            <>
              {novel.author} / {novel.site}
            </>
          )}
        </CardMeta>
      </Card.Content>
    </Card>
  );
};

export default NovelCard;
