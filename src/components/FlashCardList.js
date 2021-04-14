import React from "react";
import FlashCard from "./FlashCard";

function FlashCardList({ flashCards }) {
  console.log(flashCards);
  return (
    <div className="card-grid">
      {flashCards.map((flashCard) => (
        <FlashCard flashCard={flashCard} key={flashCard.id} />
      ))}
    </div>
  );
}

export default FlashCardList;
