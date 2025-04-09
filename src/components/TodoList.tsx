import { Todo } from '../types/Todo';
import TodoItem from './TodoItem';

type Props = {
  filteredTodos: Todo[];
  activeTodoId: number | null;
  tempTodo: Todo | null;
  setActiveTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
};

const TodoList = ({
  filteredTodos,
  activeTodoId,
  setActiveTodoId,
  tempTodo,
  setError,
  inputRef,
  setTodos,
}: Props) => {
  const displayTodos = tempTodo ? [...filteredTodos, tempTodo] : filteredTodos;

  return (
    <section className="todoapp__main" data-cy="TodoList">
      {displayTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          activeTodoId={activeTodoId}
          setActiveTodoId={setActiveTodoId}
          setError={setError}
          inputRef={inputRef}
          setTodos={setTodos}
        />
      ))}
    </section>
  );
};

export default TodoList;
