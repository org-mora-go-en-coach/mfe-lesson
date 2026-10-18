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
      .catch((reason: Error) => setError(`강의를 불러올 수 없습니다 (${reason.message}).`));
  }, [versionedApiBaseUrl]);

  return <section className="lesson-mfe">
    <header className="lesson-intro">
      <div className="lesson-mark" aria-hidden="true">M</div>
      <div>
        <p>영어 학습</p>
        <h1>이어서 학습하기</h1>
        <span>보관함의 강의를 이어서 학습해 보세요.</span>
      </div>
      <strong>강의 {lessons.length}개</strong>
    </header>
    <section className="lesson-library" aria-label="추천 강의">
      {error && <p className="lesson-error">{error}</p>}
      <div className="lesson-grid">{lessons.map((lesson, index) => <article className="lesson-card" key={lesson.id}>
        <span className="lesson-icon" aria-hidden="true">{["Aa", "✦", "↗"][index % 3]}</span>
        <span className="lesson-copy"><h2>{lesson.title}</h2><small>{lesson.level} · {lesson.durationMinutes}분 · {lesson.progress}% 완료</small><i><span style={{ width: `${lesson.progress}%` }} /></i></span>
      </article>)}</div>
    </section>
  </section>;
}
