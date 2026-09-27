import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";

interface Quiz {
  quiz_id: number;
  category_id?: number;
  title: string;
  description?: string;
  category: { name: string };
  questions: Question[];
}

interface Question {
  question_id: number;
  content: string;
  options: Option[];
}

interface Option {
  option_id: number;
  content: string;
  correct: boolean;
}

export default function Quiz() {
  const { quiz_id } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<Quiz>();
  const [questions, setQuestions] = useState<Question[] >([]);
  const [hits, setHits] = useState<number>(0);
  const [selected, setSelected] = useState<number>(0);
  const [questionsNumber, setQuestionsNumber] = useState<number>(0);
  const [questionIndex, setQuestionIndex] = useState<number>(0);

  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const getQuiz = async () => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8000/quiz/${quiz_id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setQuiz(data.quiz);
        setQuestions(data.quiz.questions);
      } catch (error) {
        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error("An unknown error occurred"));
        }
      } finally {
        setIsLoading(false);
      }
    };

    getQuiz();
  }, []);

  console.log(quiz);

  if (isLoading) return <div>Carregando ...</div>;
  if (error) return <div>Erro: {error.message}</div>;

  return (
    <>
      <div>quiz route</div>
      <div>{quiz?.title}</div>

      <div>{questions && questions[questionIndex].content}</div>

        <div>{questions && questions[questionIndex].options?.map((option) => (
            <div key={option.option_id} onClick={() => {

              if(option.correct) 
                setSelected(selected + 1);
              else 
                setSelected(0);

            }}>{option.content}</div>
        ))}
        </div>


      <button onClick={(e) => {
        
        setQuestionsNumber(questionsNumber + 1);
        
        if(selected === 1)
          setHits(hits + 1);

        setSelected(0);

        // quando responde a ultima pergunta
        if(e.currentTarget.innerText === "Finish") {
          setQuestionIndex(0);
          // enviar POST para rota de score
          // resgatar ID de Score postado
          // entao navegar para score/:id
          navigate(`/score`);
          return;
        }

        // quando chega no final do quiz
        if(questionIndex === questions.length - 2) {
          e.currentTarget.innerText = "Finish";
          
        }

        
        
          
        setQuestionIndex(questionIndex + 1);
        
        
        
      }}>Next</button>


      <div>Selected: {selected}</div>
      <div>Hits: {hits}</div>
      <div>Question Number: {questionsNumber}</div>
      <div>Questions Length: {questions.length -2}</div>
      <div>Question Index: {questionIndex}</div>
      
    </>
  );
}
