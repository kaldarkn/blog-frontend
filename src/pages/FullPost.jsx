import React from 'react';
import { useParams } from 'react-router-dom';
import { Post } from '../components/Post';
import { Index } from '../components/AddComment';
import { CommentsBlock } from '../components/CommentsBlock';
import axios from '../axios';
import ReactMarkdown from 'react-markdown';

export const FullPost = () => {
  const [data, setData] = React.useState();
  const [comments, setComments] = React.useState();
  const [isLoading, setIsLoading] = React.useState(true);
  const { id } = useParams();

  React.useEffect(() => {
    axios
      .get(`posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении статьи');
      });

    axios
      .get(`comments/${id}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((error) => {
        console.warn(error);
        alert('Ошибка при получении комментариев');
      });
  }, [isLoading]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={comments.length}
        tags={data.tags}
        isFullPost>
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments} isLoading={isLoading}>
        <Index setIsLoading={setIsLoading} />
      </CommentsBlock>
    </>
  );
};
