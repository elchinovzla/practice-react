import { useState } from 'react';
import './Question3.css';

const mockData = [
  { id: 1, title: 'Initial post 1', body: 'Content of initial post 1' },
  { id: 2, title: 'Initial post 2', body: 'Content of initial post 2' },
];

const Question3 = () => {
  const [posts, setPosts] = useState(mockData);
  const [formInputs, setFormInputs] = useState({
    id: undefined,
    title: '',
    body: '',
  });

  const handleEdit = (postId) => {
    const postToEdit = posts.filter((item) => item.id === postId);
    if (postToEdit.length !== 1) {
      console.error('Error loading post to edit');
    }
    setFormInputs({
      id: postToEdit[0].id,
      title: postToEdit[0].title,
      body: postToEdit[0].body,
    });
  };

  const handleDelete = (postId) => {
    setPosts((prevPosts) => prevPosts.filter((item) => item.id !== postId));
  };

  const renderConent = () => {
    const items = [];
    posts.forEach(({ id, title, body }) => {
      items.push(
        <tr key={id}>
          <td>{id}</td>
          <td>{title}</td>
          <td>{body}</td>
          <td>
            <button type="button" onClick={() => handleEdit(id)}>
              Edit
            </button>
          </td>
          <td>
            <button type="button" onClick={() => handleDelete(id)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });

    return items;
  };

  const handlFormChange = (event) => {
    setFormInputs((formInputs) => ({
      ...formInputs,
      [event.target.name]: event.target.value,
    }));
  };

  const createNewId = () => {
    return Math.max(...posts.map((items) => items.id), 0) + 1;
  };

  const resetFormInputs = () => {
    setFormInputs({
      id: undefined,
      body: '',
      title: '',
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const newPost = {
      id: formInputs.id ?? createNewId(),
      title: formInputs.title,
      body: formInputs.body,
    };

    const indexToUpdate = posts.findIndex((post) => post.id === newPost.id);
    setPosts((existingPosts) => {
      const updatedPosts = [...existingPosts];

      if (indexToUpdate !== -1) {
        updatedPosts[indexToUpdate] = newPost;
      } else {
        updatedPosts.push(newPost);
      }

      return updatedPosts;
    });
    resetFormInputs();
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        <p>Title</p>
        <input
          type="text"
          placeholder="Title"
          name="title"
          value={formInputs.title}
          onChange={handlFormChange}
        />
        <p>Body</p>
        <textarea
          placeholder="Body"
          name="body"
          value={formInputs.body}
          onChange={handlFormChange}
        />
        <button type="submit">{formInputs.id ? 'Update' : 'Add'} post</button>
      </form>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Body</th>
          </tr>
        </thead>
        <tbody>{renderConent()}</tbody>
      </table>
    </div>
  );
};

export default Question3;
