import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';

import axios from '../../axios';
import styles from './AddComment.module.scss';

import TextField from '@mui/material/TextField';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';

export const Index = ({ setIsLoading }) => {
  const userData = useSelector((state) => state.auth.data);
  const [comment, setComment] = useState('');

  const { id } = useParams();
  const onSubmit = async () => {
    await axios.post('/comments', {
      text: comment,
      postId: id,
    });
    setIsLoading(true);
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={userData.avatarUrl} />
        <div className={styles.form}>
          <TextField
            label="Написать комментарий"
            onChange={(e) => setComment(e.target.value)}
            value={comment}
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button onClick={onSubmit} variant="contained">
            Отправить
          </Button>
        </div>
      </div>
    </>
  );
};
