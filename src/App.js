import React, { useState, useEffect, useRef } from "react";
import FlashCardList from "./components/FlashCardList";
import "./app.css";
import axios from "axios";
function App() {
  const [flashCards, setFlashCards] = useState([]);
  const [categories, setCategories] = useState([]);
  const categoryEl = useRef();
  const amountRef = useRef();

  useEffect(() => {
    axios.get("https://opentdb.com/api_category.php").then((res) => {
      setCategories(res.data.trivia_categories);
    });
  }, []);

  function decodeString(string) {
    const textArea = document.createElement("textarea");
    textArea.innerHTML = string;
    return textArea.value;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .get("https://opentdb.com/api.php", {
        params: {
          amount: amountRef.current.value,
          category: categoryEl.current.value,
        },
      })
      .then((res) => {
        setFlashCards(
          res.data.results.map((questionItem, index) => {
            const answer = decodeString(questionItem.correct_answer);
            const options = [
              ...questionItem.incorrect_answers.map((element) =>
                decodeString(element)
              ),
              answer,
            ];
            return {
              id: `${index}-${Date.now()}`,
              question: decodeString(questionItem.question),
              answer: answer,
              options: options.sort(() => Math.random() - 0.5),
            };
          })
        );
      });
  };

  return (
    <>
      <form className="header" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <select name="category" id="" ref={categoryEl}>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {" "}
                {category.name}{" "}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="amount">Numero de preguntas</label>
          <input
            type="number"
            min="1"
            step="1"
            defaultValue={10}
            id="amount"
            ref={amountRef}
          />
        </div>
        <div className="form-group">
          <button className="btn">Generar</button>
        </div>
      </form>
      <div className="container">
        <FlashCardList flashCards={flashCards} />
      </div>
    </>
  );
}

export default App;
