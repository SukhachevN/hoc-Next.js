import { NextPage } from 'next';
import { useState } from 'react';
import { IComment } from '../../data/comments';

const emptyEditComment: IComment = {
  id: -1,
  text: '',
};

const Comments: NextPage = () => {
  const [comments, setComments] = useState<IComment[]>([]);
  const [comment, setComment] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedComment, setEditedComment] = useState(emptyEditComment);

  const fetchComments = async () => {
    const response = await fetch('/api/comments');
    const result = await response.json();

    setComments(result);
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = (await response.json()) as IComment[];
    setComment('');
    setComments(result);
  };

  const deleteComment = async (id: number) => {
    const response = await fetch(`/api/comments/${id}`, {
      method: 'DELETE',
    });
    await response.json();
    fetchComments();
  };

  const handleEdit = async (id: number) => {
    if (id === editedComment.id) {
      setIsEditing(false);
      setEditedComment(emptyEditComment);
      const response = await fetch(`/api/comments/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ text: editedComment.text }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      await response.json();
      fetchComments();
    } else {
      setIsEditing(true);
      setEditedComment({
        id,
        text: '',
      });
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type='text'
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <input type='submit' />
      </form>
      <button onClick={fetchComments}>Get comments</button>
      <h1>Comments</h1>
      <ul>
        {comments.map(({ id, text }) => (
          <li key={id}>
            {isEditing && editedComment.id === id ? (
              <input
                type='text'
                value={editedComment.text}
                onChange={(e) =>
                  setEditedComment((state) => ({
                    ...state,
                    text: e.target.value,
                  }))
                }
              />
            ) : (
              text
            )}
            &nbsp;
            <button onClick={() => deleteComment(id)}>Delete</button>
            &nbsp;
            <button onClick={() => handleEdit(id)}>
              {isEditing && editedComment.id === id ? 'finish editing' : 'edit'}
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Comments;
