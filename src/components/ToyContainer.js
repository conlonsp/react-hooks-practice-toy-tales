import React from "react";
import ToyCard from "./ToyCard";

function ToyContainer({ toys, handleDelete, handleUpdate }) {
  return (
    <div id="toy-collection">
      {toys.map(toy => {
        return <ToyCard
          key={toy.id}
          deletes={handleDelete}
          toy={toy}
          updates={handleUpdate}
        />
      })}
    </div>
  );
}

export default ToyContainer;
