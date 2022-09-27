import React from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [ questions, setQuestions ] = useState([])

  useEffect(() => {
    fetch('http://localhost:4000/questions')
    .then(r => r.json())
    .then(questions => {
      setQuestions(questions)
    })
  })

  function deleteQuestion(questionId){
    fetch(`http://localhost:4000/questions/${questionId}`,{
      method: 'DELETE'
    })
    .then(r => r.json())
    .then(() => {
      const updatedQ = questions.filter((q) => {return q.id !== questionId})
      setQuestions(updatedQ);
    })
  }

  function updatedQuestion(question, newCorrectIndex){
    fetch(`http://localhost:4000/questions/${question.id}`,{
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({"correctIndex": newCorrectIndex})
    })
    .then(r => r.json())
    .then(newQuestion => {
      let updatedQuestions = questions.map((q) => {
        if (q.id === question.id){
          return newQuestion;
        }
        return q;
      })
      setQuestions(updatedQuestions)
    })
  }

  const qList = questions.map((question) => {
    return <QuestionItem key={question.id} question={question} updatedQuestion={updatedQuestion} deleteQuestion={deleteQuestion}/>
  })

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{qList}</ul>
    </section>
  );
}

export default QuestionList;
