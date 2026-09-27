import { useState, useEffect } from "react";
import { Link } from "react-router";

interface Quiz {
  quiz_id: number,
  category_id?: number,
  title: string,
  description?: string,
  category: { name: string },
  questions?: {
    question_id:number,
    description: string
  } []
}

function App() {

  const [ quizzes, setQuizzes ] = useState<Quiz[]>([]);
  const [ isLoading, setIsLoading ] = useState(true);
  const [ error, setError ] = useState<Error|null>(null);

  useEffect(() => {
    const getQuizzes = async() => {
      try {
        setIsLoading(true);
        setError(null);
        const response = await fetch(`http://localhost:8000/quiz`);

        if(!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: Quiz[] = await response.json();
        setQuizzes(data);
        
      } catch (error) {

        if (error instanceof Error) {
          setError(error);
        } else {
          setError(new Error('An unknown error occurred'));
        }

      } finally {
        setIsLoading(false);
      }
    }

    getQuizzes();
  }, []);

  if (isLoading) return <div>Carregando ...</div>;
  if (error) return <div>Erro: {error.message}</div>;
  
  return (
    <>
      <header>
        <span>Quiz Show</span>
        <div>Teste seus conhecimentos sobre assuntos variados</div>
      </header>

      <ul>

        {quizzes.map( (quiz) => (
          <li key={quiz.quiz_id}>
            <Link to={`/quiz/${quiz.quiz_id}`}>
              <div>
                {quiz.title}
              </div>
            </Link>
          </li>
        ))}

      </ul>

    </>
  )

  
}

export default App;
