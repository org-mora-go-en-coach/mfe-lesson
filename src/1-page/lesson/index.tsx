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
    <div className="lesson-heading"><div><span>RECOMMENDED</span><h2>Keep learning</h2><p>Short, focused lessons picked for your English journey.</p></div><strong>{lessons.length} videos</strong></div>
    {error && <p className="lesson-error">{error}</p>}
    <div className="lesson-grid">{lessons.map((lesson, index) => <article key={lesson.id}>
      <div className="lesson-thumbnail"><span className="lesson-glyph">{["👋","💬","🎯"][index%3]}</span><span className="lesson-duration">{lesson.durationMinutes}:00</span><div className="lesson-progress"><i style={{ width: `${lesson.progress}%` }} /></div></div>
      <div className="lesson-meta"><div className="lesson-channel">{lesson.level}</div><div><h3>{lesson.title}</h3><p>Mora Go English</p><small>{lesson.progress}% complete · Lesson {index+1}</small></div></div>
    </article>)}</div>
  </section>;
}
