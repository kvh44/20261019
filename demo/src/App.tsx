import { useRef, useState, type FormEvent } from 'react';

interface Task {
  id: string;
  text: string;
}

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  function addTask(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const text = task.trim();
    if (!text) return;

    const newTask = { id: crypto.randomUUID(), text };
    setTasks((currentTasks) => [...currentTasks, newTask]);
    setTask('');
    inputRef.current?.focus();
  }

  return (
    <main>
      <h1>My tasks</h1>
      <p>Add tasks to practice recording and running browser tests.</p>
      <form onSubmit={addTask}>
        <label htmlFor="task">New task</label>
        <input
          ref={inputRef}
          id="task"
          autoComplete="off"
          placeholder="What will you learn?"
          value={task}
          onChange={(event) => setTask(event.target.value)}
        />{' '}
        <button type="submit">Add task</button>
      </form>
      <ul aria-label="Tasks" aria-live="polite">
        {tasks.map(({ id, text }) => <li key={id}>{text}</li>)}
      </ul>
    </main>
  );
}

