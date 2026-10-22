import { useRef, useState, type FormEvent } from 'react';

interface Task {
  id: string;
  text: string;
}

export default function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);
  const [photoId] = useState(() => crypto.randomUUID());
  const [photoStatus, setPhotoStatus] = useState<'loading' | 'loaded' | 'error'>('loading');

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
      <section aria-label="Random photo" className="photo-section">
        <div className="photo-frame" aria-busy={photoStatus === 'loading'}>
        {photoStatus === 'loading' && (
          <div className="photo-loading" role="status" aria-label="Loading photo">
            <span className="photo-spinner" aria-hidden="true" />
          </div>
        )}
        <img
          key={photoId}
          src={`https://picsum.photos/620/360?random=${photoId}`}
          alt="Random photograph from Lorem Picsum"
          width={620}
          height={360}
          onLoad={() => setPhotoStatus('loaded')}
          onError={() => setPhotoStatus('error')}
          hidden={photoStatus === 'error'}
          style={{ visibility: photoStatus === 'loading' ? 'hidden' : 'visible' }}
        />
        </div>
        <p role="status">
          {photoStatus === 'error' && 'Unable to load the photo. Try again.'}
        </p>
      </section>
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

