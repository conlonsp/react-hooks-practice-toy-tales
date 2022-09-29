import React, { useState, useEffect } from "react";

import Header from "./Header";
import ToyForm from "./ToyForm";
import ToyContainer from "./ToyContainer";

function App() {
  const [showForm, setShowForm] = useState(false);
  const [toys, setToys] = useState([])
  const [newToy, setNewToy] = useState({
    name: '',
    image: '',
    likes: 0,
  })

  function handleClick() {
    setShowForm((showForm) => !showForm);
  }

  function handleChange(event) {
    setNewToy({
      ...newToy,
      [event.target.name]: event.target.value
    })
  }

  function handleSubmit(event) {
    event.preventDefault()
    const addToy = {
      name: newToy.name,
      image: newToy.image,
      likes: 0
    }
    fetch('http://localhost:3001/toys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(addToy)
    })
    .then(r => r.json())
    .then(data => setToys([...toys, data]))
    setNewToy({
      name: '',
      image: '',
    })
  }

  function handleDelete(deletedToy) {
    const updatedToys = toys.filter(toy => toy.id !== deletedToy.id)
    setToys(updatedToys)
  }

  function handleUpdate(likes) {
    const updatedToy = toys.map(toy => {
      if(toy.id === likes.id) {
        return likes
      } else {
        return toy
      }
    })
    setToys(updatedToy)
  }

  useEffect(() => {
    fetch('http://localhost:3001/toys')
    .then(r => r.json())
    .then(data => setToys(data))
  }, [])

  return (
    <>
      <Header />
      {showForm ? <ToyForm change={handleChange} submit={handleSubmit} newToy={newToy}/> : null}
      <div className="buttonContainer">
        <button onClick={handleClick}>Add a Toy</button>
      </div>
      <ToyContainer
        handleDelete={handleDelete}
        handleUpdate={handleUpdate}
        toys={toys}
      />
    </>
  );
}

export default App;
