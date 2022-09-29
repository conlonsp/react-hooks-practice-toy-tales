import React from "react";

function ToyCard({ toy, deletes, updates }) {
  
  function clickDelete() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'DELETE',
    })
    .then(r => r.json())
    .then(() => deletes(toy))
  }

  function clickLikes() {
    fetch(`http://localhost:3001/toys/${toy.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        likes: toy.likes + 1
      })
    })
    .then(r => r.json())
    .then(likes => updates(likes))
  }

  return (
    <div className="card">
      <h2>{toy.name}</h2>
      <img
        src={toy.image}
        alt={toy.name}
        className="toy-avatar"
      />
      <p>{toy.likes} Likes </p>
      <button onClick={clickLikes} className="like-btn">Like {"<3"}</button>
      <button onClick={clickDelete} className="del-btn">Donate to GoodWill</button>
    </div>
  );
}

export default ToyCard;
