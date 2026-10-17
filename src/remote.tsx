import React from "react";
import { createRoot } from "react-dom/client";
import "./style.css";

type Lesson = { id: string; title: string; level: string; durationMinutes: number; progress: number };

function LessonApp({ apiBaseUrl }: { apiBaseUrl?: string }) {
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [error, setError] = React.useState("");
  React.useEffect(() => {
    fetch(`${apiBaseUrl ?? ""}/api/lessons`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
      .then((data: { lessons: Lesson[] }) => setLessons(data.lessons))
      .catch((reason: Error) => setError(`Lessons are unavailable (${reason.message}).`));
  }, [apiBaseUrl]);
  return <section className="lesson-mfe">
    <div className="lesson-heading"><div><span>CURRICULUM</span><h2>Your lessons</h2></div><strong>{lessons.length} modules</strong></div>
    {error && <p className="lesson-error">{error}</p>}
    <div className="lesson-grid">{lessons.map((lesson, index) => <article key={lesson.id}>
      <div className="lesson-number">0{index + 1}</div><span>{lesson.level} · {lesson.durationMinutes} MIN</span><h3>{lesson.title}</h3>
      <div className="lesson-progress"><i style={{ width: `${lesson.progress}%` }} /></div><small>{lesson.progress}% complete</small>
    </article>)}</div>
  </section>;
}

export function mount(element: HTMLElement, options: { apiBaseUrl?: string } = {}) {
  const root = createRoot(element);
  root.render(<LessonApp apiBaseUrl={options.apiBaseUrl} />);
  return () => root.unmount();
}

