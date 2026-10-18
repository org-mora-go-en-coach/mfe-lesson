import React from "react";
import type { Lesson } from "../../4-entity/lesson";
import type { LessonAppProps } from "./type";

export function LessonApp({ apiBaseUrl }: LessonAppProps) {
  const versionedApiBaseUrl = apiBaseUrl?.includes("/api/v") ? apiBaseUrl : `${apiBaseUrl ?? ""}/api`;
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [error, setError] = React.useState("");

  React.useEffect(() => {
    fetch(`${versionedApiBaseUrl}/lessons`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
      .then((data: { lessons: Lesson[] }) => setLessons(data.lessons))
      .catch((reason: Error) => setError(`Lessons are unavailable (${reason.message}).`));
  }, [versionedApiBaseUrl]);

  return <section className="lesson-mfe">
    <header className="lesson-intro">
      <div className="lesson-mark" aria-hidden="true">M</div>
      <div>
        <p>ENGLISH PRACTICE</p>
        <h1>Continue learning</h1>
        <span>Pick up a guided lesson from your library.</span>
      </div>
      <strong>{lessons.length} lessons</strong>
    </header>
    <section className="lesson-library" aria-label="Recommended lessons">
      {error && <p className="lesson-error">{error}</p>}
      <div className="lesson-grid">{lessons.map((lesson, index) => <article className="lesson-card" key={lesson.id}>
        <span className="lesson-icon" aria-hidden="true">{["Aa", "✦", "↗"][index % 3]}</span>
        <span className="lesson-copy"><h2>{lesson.title}</h2><small>{lesson.level} · {lesson.durationMinutes} min · {lesson.progress}% complete</small><i><span style={{ width: `${lesson.progress}%` }} /></i></span>
      </article>)}</div>
    </section>
  </section>;
}
