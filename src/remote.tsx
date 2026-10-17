import React from "react";
import { createRoot } from "react-dom/client";
import { LessonApp } from "./LessonApp";
import "./style.css";

export function mount(element: HTMLElement, options: { apiBaseUrl?: string } = {}) {
  const root = createRoot(element);
  root.render(<LessonApp apiBaseUrl={options.apiBaseUrl} />);
  return () => root.unmount();
}
