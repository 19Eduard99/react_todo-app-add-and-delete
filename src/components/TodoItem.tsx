import classNames from 'classnames';
import { Todo } from '../types/Todo';
import { deleteTodo } from '../api/todos';
type Props = {
  todo: Todo;
  activeTodoId: number | null;
  setActiveTodoId: React.Dispatch<React.SetStateAction<number | null>>;
  setError: React.Dispatch<React.SetStateAction<string>>;
  inputRef: React.RefObject<HTMLInputElement>;
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const TodoItem = ({
  todo,
  activeTodoId,
  setTodos,
  setActiveTodoId,
  setError,
  inputRef,
}: Props) => {
  const { id, title, completed } = todo;
  const isLoading = id === activeTodoId;

  const handleDelet = (todoId: number) => {
    setActiveTodoId(todoId);
    deleteTodo(todoId)
      .then(() => {
        setTodos(todos => {
          return todos.filter(deletedTodo => deletedTodo.id !== todoId);
        });
      })
      .catch(() => {
        setError('Unable to delete a todo');
      })
      .finally(() => {
        setActiveTodoId(null);
        if (!isLoading) {
          inputRef.current?.focus();
        }
      });
  };

  return (
    <div
      data-cy="Todo"
      key={id}
      className={classNames('todo', {
        completed: completed,
      })}
    >
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label className="todo__status-label">
        <input
          data-cy="TodoStatus"
          type="checkbox"
          className="todo__status"
          defaultChecked={completed}
        />
      </label>
      <span data-cy="TodoTitle" className="todo__title">
        {title}
      </span>
      <button
        type="button"
        className="todo__remove"
        data-cy="TodoDelete"
        onClick={() => handleDelet(id)}
      >
        ×
      </button>

      <div
        data-cy="TodoLoader"
        className={classNames('modal overlay', {
          'is-active': isLoading,
        })}
      >
        <div className="modal-background has-background-white-ter" />
        <div className="loader" />
      </div>
    </div>
  );
};

export default TodoItem;
