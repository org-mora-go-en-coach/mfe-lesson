import React from "react";
import type { Lesson } from "../../4-entity/lesson";
import type { LessonAppProps } from "./type";

const prompts = [
  ["Practice a conversation", "Role-play a natural everyday situation"],
  ["Correct my English", "Improve grammar, tone, and clarity"],
  ["Build my vocabulary", "Learn useful words around a topic"],
  ["Prepare for work", "Rehearse meetings and presentations"],
];

export function LessonApp({ apiBaseUrl }: LessonAppProps) {
  const versionedApiBaseUrl = apiBaseUrl?.includes("/api/v") ? apiBaseUrl : `${apiBaseUrl ?? ""}/api`;
  const [lessons, setLessons] = React.useState<Lesson[]>([]);
  const [error, setError] = React.useState("");
  const [prompt, setPrompt] = React.useState("");
  const [conversation, setConversation] = React.useState<{ question: string; answer: string } | null>(null);

  React.useEffect(() => {
    fetch(`${versionedApiBaseUrl}/lessons`)
      .then((response) => response.ok ? response.json() : Promise.reject(new Error(String(response.status))))
      .then((data: { lessons: Lesson[] }) => setLessons(data.lessons))
      .catch((reason: Error) => setError(`Lessons are unavailable (${reason.message}).`));
  }, [versionedApiBaseUrl]);

  function askCoach(event: React.FormEvent) {
    event.preventDefault();
    const question = prompt.trim();
    if (!question) return;
    setConversation({
      question,
      answer: `Let's practice “${question}” together. I'll keep the conversation natural, correct important mistakes, and explain better expressions as we go.`,
    });
    setPrompt("");
  }

  function choosePrompt(title: string) {
    setPrompt(title);
    requestAnimationFrame(() => document.querySelector<HTMLTextAreaElement>(".coach-composer textarea")?.focus());
  }

  return <section className={conversation ? "lesson-mfe has-conversation" : "lesson-mfe"}>
    {!conversation && <div className="coach-start">
      <div className="coach-mark" aria-hidden="true">M</div>
      <h1>How can I help you practice English?</h1>
      <p>Your personal coach for speaking, writing, vocabulary, and confidence.</p>
      <div className="prompt-grid">
        {prompts.map(([title, description]) => <button key={title} onClick={() => choosePrompt(title)}><strong>{title}</strong><span>{description}</span><i>↗</i></button>)}
      </div>
    </div>}
    {conversation && <div className="coach-thread" aria-live="polite">
      <div className="message coach-user-message"><span className="message-avatar">You</span><p>{conversation.question}</p></div>
      <div className="message coach-message"><span className="coach-mark small">M</span><div><strong>Mora</strong><p>{conversation.answer}</p><div className="message-tools"><button aria-label="Copy answer">▢</button><button aria-label="Good answer">♡</button><button aria-label="Try again">↻</button></div></div></div>
    </div>}
    {!conversation && <section className="lesson-library" aria-label="Recommended lessons">
      <div className="lesson-heading"><div><h2>Continue learning</h2><p>Pick up a guided lesson from your library.</p></div><span>{lessons.length} lessons</span></div>
      {error && <p className="lesson-error">{error}</p>}
      <div className="lesson-grid">{lessons.map((lesson, index) => <article key={lesson.id}>
        <button className="lesson-card" onClick={() => choosePrompt(`Practice: ${lesson.title}`)}>
          <span className="lesson-icon" aria-hidden="true">{["Aa","✦","↗"][index % 3]}</span>
          <span className="lesson-copy"><h3>{lesson.title}</h3><small>{lesson.level} · {lesson.durationMinutes} min · {lesson.progress}% complete</small><i><span style={{ width: `${lesson.progress}%` }} /></i></span>
          <span className="lesson-arrow">›</span>
        </button>
      </article>)}</div>
    </section>}
    <form className="coach-composer" onSubmit={askCoach}>
      <textarea rows={1} value={prompt} onChange={(event) => setPrompt(event.target.value)} onKeyDown={(event) => { if (event.key === "Enter" && !event.shiftKey) { event.preventDefault(); event.currentTarget.form?.requestSubmit(); } }} placeholder="Message your English coach" aria-label="Message your English coach" />
      <div className="composer-actions"><button type="button" aria-label="Add attachment">＋</button><span>Practice mode <b>⌄</b></span><button className="send-button" aria-label="Send message" disabled={!prompt.trim()}>↑</button></div>
    </form>
    <p className="coach-disclaimer">Mora can make mistakes. Check important information.</p>
  </section>;
}
