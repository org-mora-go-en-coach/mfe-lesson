# MFE Lesson

Mora Go의 강의 탐색과 학습 진행 화면을 제공하는 React 마이크로 프런트엔드입니다.

## 구현 내용

- 추천 강의와 강의 목록 표시
- 강의별 진행률과 저장 상태 표현
- Lesson API 연동을 위한 도메인 모델과 요청 처리
- `mount()` 계약을 통한 Shell 런타임 연결
- SCSS 스타일과 버전별 ESM 원격 모듈 빌드

## 실행 방법

```bash
npm install
npm run dev
```

개발 서버는 `http://localhost:4101`에서 실행됩니다. `npm run build`는 최신 파일과 패키지 버전별 `remoteEntry.js`를 생성합니다.
