# calendar-chat-nextjs

## 목차

- [[1] 프로젝트 개요](#1-프로젝트-개요)
  - [1) 주요 기술 스택](#1-주요-기술-스택)
  - [2) 로컬 환경에서 실행하기](#2-로컬-환경에서-실행하기)
  - [2-1) Docker로 실행하기](#2-1-docker로-실행하기)
  - [3) 구현 미리보기](#3-구현-미리보기)
  - [4) 프로젝트 구조](#4-프로젝트-구조)
  - [5) Mock DB 스키마](#5-mock-db-스키마)
  - [6) Mock API with MSW](#6-mock-api-with-msw)
- [[2] 구현사항](#2-구현사항)
  - [1) TO DO](#1-to-do)
  - [2) 코드 설계 및 구조](#2-코드-설계-및-구조)
  - [3) 전체 일정 무한스크롤 구현](#3-전체-일정-무한스크롤-구현)
  - [4) 확장 가능한 채팅 메세지](#4-확장-가능한-채팅-메세지)
  - [5) 데이터 동기화 전략](#5데이터-동기화-전략)
  - [6) 유효성 검사](#6-유효성-검사)
  - [7) Docker를 활용한 개발 환경 설정](#7-docker를-활용한-개발-환경-설정)
- [[3] 마무리하며](#3-마무리하며)

## [1] 프로젝트 개요

본 프로젝트는 Next.js 기반의 예약 관리 시스템 구현하고자 합니다. 실시간 채팅을 통한 예약 신청과 캘린더를 통한 일정 관리를 연동하여, 사용자 경험을 고려한 효율적인 인터페이스에 신경을 썼습니다.<br>
React Query와 TypeScript를 활용한 상태관리, MSW를 통한 API 모킹, 그리고 확장 가능한 메시지 시스템 설계 등을 통해 견고하고 유지보수가 용이한 애플리케이션을 개발하는 것에 중점을 두었습니다.

### 1) 주요 기술 스택

- @tanstack/react-query: 서버 상태 관리를 위한 React Query 라이브러리로, 데이터 페칭 및 캐싱에 최적화
- react-infinite-scroll-component: 무한 스크롤 기능을 손쉽게 구현하기 위한 라이브러리
- msw: Mock Service Worker로, API 요청을 모킹하여 CRUD, 웹소켓 기능 구현
- tailwindcss: 유틸리티 기반 CSS 프레임워크로 빠르고 효율적인 스타일링 제공
- typescript: 정적 타입 시스템을 지원하는 JavaScript의 상위 집합으로 코드 안정성 향상

### 기술스택 선정에 관해

본 프로젝트는 Next.js를 기반으로 구축했습니다.
서버 상태 관리를 위해 TanStack Query를 도입했고, 무한 스크롤 구현에는 react-infinite-scroll-component를 채택하여 대량의 데이터를 효율적으로 처리했습니다.

개발 환경에서는 MSW와 @mswjs/data를 활용해 백엔드 API를 모킹했으며, TypeScript로 정적 타입 체킹을 구현했습니다.<br>
코드 품질 관리를 위해 ESLint를 도입했고, Next.js에 최적화된 설정을 적용했습니다.

스타일링은 Tailwind CSS를 사용했으며, 코드 포맷팅은 Prettier와 함께 import 구문 정리, Tailwind CSS 클래스 정렬 플러그인을 도입하여 일관된 코드 스타일을 유지했습니다.

### 2) 로컬 환경에서 실행하기

> ⚠️ **Node.js 버전 요구사항**<br>
> 본 프로젝트는 Node.js 18.18.0 이상이 필요합니다.<br>
> 안정적인 실행을 위해 Node.js 18.20.5 LTS 버전을 권장합니다.

1. **환경변수 설정**

   - 프로젝트 최상위 디렉토리에 `.env.development` 파일을 생성하고 아래 내용을 추가하세요.
     ```
     NEXT_PUBLIC_API_MOCKING=enabled
     ```

2. **의존성 설치**
   - 루트 폴더에서 실행합니다.
     ```
     npm run install
     ```
3. **실행**
   - 루트 폴더에서 실행합니다.
     ```
     npm run start
     ```

### 2-1) Docker로 실행하기

1. **환경변수 설정**

   - 프로젝트 최상위 디렉토리에 `.env.development` 파일을 생성하고 아래 내용을 추가하세요.
     ```
     NEXT_PUBLIC_API_MOCKING=enabled
     ```

2. **Docker 이미지 빌드**

   - 아래 명령어를 터미널에서 실행하여 Docker 이미지를 빌드합니다.
     ```bash
     docker build -t calender-chat-nextjs .
     ```

3. **Docker 컨테이너 실행**

   - 아래 명령어로 Docker 컨테이너를 실행합니다.
     ```bash
     docker run -p 3000:3000 calender-chat-nextjs
     ```

4. **애플리케이션 접속**
   - 브라우저를 열고 [http://localhost:3000](http://localhost:3000)으로 접속하세요.

### 3) 구현 미리보기

### 캘린더 기능

<div align="center">
 <img src="https://github.com/user-attachments/assets/9f45c093-7835-4bd6-a949-b5854e1049d3" width="600" alt="캘린더 기능">
</div>

### 채팅 기능

<div align="center">
 <img src="https://github.com/user-attachments/assets/f2553e20-0e4b-448e-b8d9-19cc69cf1f0c" width="600" alt="일반 메세지">
 <p>메세지 전송</p>
</div>

<div align="center">
 <img src="https://github.com/user-attachments/assets/b751c78b-8c83-49ce-9546-454ae4e1670d" width="600" alt="소개폼UI">
 <p>소개폼 UI</p>
</div>

<div align="center">
 <img src="https://github.com/user-attachments/assets/c86b8cbb-032e-45cf-a1e6-bbc5c704c36f" width="600" alt="파일전송">
 <p>파일 전송</p>
</div>

### 4) 프로젝트 구조

```
🗂️actions-----------// API 호출 로직
🗂️app
┣ 🗂️(calendar)------// 캘린더 기능
┃ ┣ 🗂️components----// Calendar 등 UI 컴포넌트
┃ ┣ 🗂️hooks---------// 캘린더 데이터 관리, 이벤트 핸들링
┃ ┣ 🗂️types---------// 타입 정의
┃ ┗ page.tsx--------// entry ⭐️
┣ 🗂️@chat-----------// Parallel 라우팅
┃ ┣ 🗂️components----// 채팅 관련 컴포넌트
┃ ┣ 🗂️types---------// 타입 정의
┃ ┗ page.tsx
🗂️mocks-------------// MSW 설정
```

### 5) Mock DB 스키마

| 필드 이름     | 타입     | 설명                             |
| ------------- | -------- | -------------------------------- |
| `id`          | `UUID`   | 이벤트의 고유 식별자 (자동 생성) |
| `title`       | `String` | 이벤트의 제목                    |
| `name`        | `String` | 이벤트 생성자의 이름             |
| `description` | `String` | 이벤트에 대한 설명               |
| `year`        | `Number` | 이벤트가 발생하는 연도           |
| `month`       | `Number` | 이벤트가 발생하는 월             |
| `day`         | `Number` | 이벤트가 발생하는 날짜           |
| `startTime`   | `String` | 이벤트 시작 시간 (`HH:mm` 포맷)  |
| `endTime`     | `String` | 이벤트 종료 시간 (`HH:mm` 포맷)  |

---

### 6) Mock API with MSW

#### 1. event 생성

```
HTTP Method: "POST"
엔드포인트: "/events"

Request Body
- title: string;
- name: string;
- description: string;
- year: number;
- month: number;
- day: number;
- startTime: string;
- endTime: string;
```

#### 2. event 조회

```
HTTP Method: "GET"
엔드포인트: "/events"

Query Parameter
- page: number;
- limit: number;
```

#### 3. event 수정

```
HTTP Method: "PATCH"
엔드포인트: "/events"

Query Parameter
- id: string;

Request Body
- title: string;
- name: string;
- description: string;
- year: number;
- month: number;
- day: number;
- startTime: string;
- endTime: string;
```

#### 4. event 삭제

```
HTTP Method: "DELETE"
엔드포인트: "/events"

Query Parameter
- id: string;
```

## [2] 구현사항

### 1) TO DO

> 캘린더 일정 관리와 1:1 실시간 채팅 구현을 목표로 합니다.

**캘린더 일정 관리**

- 캘린더 시스템은 월간 단위로 설계되어 있어 한 달의 모든 일정을 한눈에 볼 수 있습니다.
- 각 일정은 이름과 제목 정보를 포함하며, 사용자 편의를 위해 캘린더 뷰와 별도의 목록 뷰 두 가지 방식으로 일정을 확인할 수 있습니다.
- 등록된 일정의 기간을 유연하게 수정할 수 있어, 일정 변경이 필요한 경우 즉시 대응이 가능합니다.

**1:1 실시간 채팅**

- 실시간 채팅 시스템은 고객과의 효율적인 소통을 위해 구조화된 메시지 형식을 채택했습니다.
  - 메시지는 타입, 인사말, 소개, URL, 연락처 등의 정형화된 데이터 구조로 저장되어 일관된 형식의 대화를 가능하게 합니다.
- 파일 전송 기능을 통해 예약에 필요한 문서나 이미지를 주고받을 수 있어 원활한 상담이 가능합니다.

### 2) 코드 설계 및 구조

#### **App Router 기반 구조**

프로젝트 구조는 Next.js의 App Router를 활용해 기능별로 명확히 분리했습니다.<br>
(calendar)와 @chat 디렉토리는 각각 독립적인 기능을 담당하며, 각 기능 내부는 다시 components, hooks, types로 세분화했습니다.

#### **커스텀 훅 활용**

특히 hooks 디렉토리는 상태 관리 로직을 컴포넌트에서 분리하는 데 중점을 뒀습니다.<br>
예를 들어 캘린더의 데이터 페칭, 이벤트 핸들링 로직을 커스텀 훅으로 분리해 재사용성을 높였습니다.

#### **상태 관리 전략**

상태 관리는 React Query를 활용해 서버 데이터를 효율적으로 관리하고, 컴포넌트별 지역 상태는 useState로 처리했습니다.<br>
프로젝트의 규모를 고려하여 별도의 전역 상태 관리 라이브러리는 사용하지 않고, 필요한 경우 상태 끌어올리기를 통해 상태를 공유했습니다.<br>
특히 캘린더와 채팅 기능의 데이터는 각각 별도의 쿼리 키로 분리하여 독립적인 업데이트가 가능하도록 했습니다.<br>
상태 관리는 React Query를 활용해 서버 데이터를 효율적으로 관리하고, 컴포넌트별 지역 상태는 useState로 처리했습니다.<br>
특히 캘린더와 채팅 기능의 데이터는 별도의 쿼리 키로 분리하여 독립적인 업데이트가 가능하도록 했습니다.

#### **UI/UX 설계**

스타일링은 Tailwind CSS를 도입해 일관된 디자인 시스템을 구축했으며, Prettier 플러그인으로 클래스 정렬을 자동화했습니다.<br>
자주 사용되는 UI 패턴은 재사용 가능한 컴포넌트로 분리했습니다.<br>
파일 구조는 기능별로 명확히 분리했으며, 각 기능 디렉토리 내에서 components, hooks, types 등으로 세분화하여 코드의 역할과 책임을 명확히 했습니다.

### 3) 전체 일정 무한스크롤 구현

#### 초기 설계

처음에는 모든 일정을 한 번에 불러오는 방식을 채택했습니다.<br>
이는 사용자가 전체 일정 보기 버튼을 클릭하면 데이터베이스에 저장된 모든 일정이 즉시 로드되는 구조였습니다.

#### 개선 필요성 인식

하지만 이 방식은 몇 가지 중요한 문제점을 내포하고 있었습니다.

- 데이터베이스 확장에 따른 성능 저하 우려
- 대규모 데이터 로딩으로 인한 초기 로딩 시간 증가
- 서버 자원의 비효율적 사용

#### 최적화된 구현

이러한 문제점을 해결하기 위해 무한 스크롤 방식으로 마이그레이션했습니다.

- 초기에는 10개의 일정만 로드
- 스크롤이 하단에 도달하기 전에 다음 10개의 일정을 선제적으로 로드
- 페이지네이션 기반의 API 호출로 데이터 요청 최적화

#### 개선 효과

이러한 변경으로 다음과 같은 이점을 얻었습니다.

- 초기 로딩 시간 대폭 감소
- 서버 부하의 효율적 분산
- 사용자 경험 향상: 끊김 없는 스크롤 경험
- 추후 데이터 증가에도 안정적인 성능 보장

<div align="center">
 <img src="https://github.com/user-attachments/assets/6a411659-3a28-4cb7-86e5-5c5532ad70c4" width="600" alt="무한 스크롤">
</div>

### 4) 확장 가능한 채팅 메세지

채팅 시스템은 다양한 메시지 타입을 유연하게 처리할 수 있도록 설계했습니다.<br>
BaseMessage 인터페이스를 기반으로 세 가지 핵심 메시지 타입을 구현했습니다.

- TextMessage: 일반 텍스트 메시지
- IntroductionMessage: 구조화된 소개 정보
- FileMessage: 파일 첨부 메시지

각 메시지 타입은 고유한 속성을 가지며, switch 문을 통해 적절한 UI 컴포넌트로 렌더링됩니다.<br>
이러한 구조는 다음과 같은 이점을 제공합니다.

1. **타입 안정성**: TypeScript를 활용한 엄격한 타입 체킹
2. **유지보수성**: 메시지 타입별 독립적인 컴포넌트 관리
3. **확장성**: 새로운 메시지 타입 추가가 용이

예를 들어, 이미지 전용 메시지나 투표 기능 등 새로운 타입을 추가할 때도 기존 코드 수정 없이 인터페이스와 컴포넌트만 추가하면 됩니다.

```typescript
// 채팅 시스템 타입 정의: 기본 메시지를 상속받아 텍스트, 소개, 파일 타입으로 확장하여 통합 관리

export interface BaseMessage {
  id?: string;
  sender: string;
  timestamp: string;
  type: string;
}

export interface TextMessage extends BaseMessage {
  type: 'text';
  content: string;
}

export interface IntroductionMessage extends BaseMessage {
  type: 'introduction';
  greeting: string;
  introduction: string;
  websiteUrl?: string;
  telephone?: string;
}

export interface FileMessage extends BaseMessage {
  type: 'file';
  fileName: string;
  fileSize: number;
  fileType: string;
  fileUrl: string;
  fileData: string;
}

export type Message = TextMessage | IntroductionMessage | FileMessage;
```

```typescript
// 메시지 타입에 따라 적절한 채팅 버블 컴포넌트를 렌더링하는 switch 구문

switch (message.type) {
  case 'text':
    return (
      <TextBubble
        key={message.id || `${message.sender}-${message.timestamp}`}
        message={message}
      />
    );
  case 'introduction':
    return (
      <IntroductionBubble
        key={message.id || `${message.sender}-${message.timestamp}`}
        message={message}
      />
    );
  case 'file':
    return (
      <FileBubble
        key={message.id || `${message.sender}-${message.timestamp}`}
        message={message}
      />
    );
  default:
    return null;
}
```

### 5)데이터 동기화 전략

캘린더와 일정 목록의 데이터 동기화를 위해 queryKey를 활용했습니다.

#### 문제 상황

일정 데이터는 두 가지 관점에서 표시됩니다.

1. 캘린더: 월별 일정 데이터 필요
2. 일정 목록: 전체 일정의 무한 스크롤 구현

캘린더와 일정 목록에서 동일한 데이터를 표시하지만, 각각 독립적인 업데이트가 필요했습니다.<br>
단순히 같은 쿼리 키를 사용하면 두 뷰가 완전히 동기화되어 개별적인 데이터 관리가 불가능해집니다.

#### 해결 방안

독립적인 쿼리 키 설계

- 캘린더와 일정 목록에 각각 다른 쿼리 키 할당
- 데이터 업데이트 시 선택적 리프레시 가능

#### 상태 관리 전략

- 캘린더 데이터 변경 시 일정 목록 자동 리프레시
- useInfiniteQuery의 refetch 활용
- React Query의 캐싱으로 빠른 데이터 반영

#### 실제 코드

```typescript
// 캘린더용 쿼리 키
queryKey: ['events', year, month],

// 전체 일정 목록용 쿼리 키
useInfiniteQuery
queryKey: ['events', options],
```

#### 이점

- 독립적인 데이터 관리
- 효율적인 상태 동기화
- 캐싱을 통한 성능 최적화

### 6) 유효성 검사

폼 데이터의 정확성과 일관성을 위해 종합적인 검증 시스템을 구현했습니다.<br>
모든 필수 필드에 대해 빈 값 체크부터 형식 검증까지 단계별 검사를 진행하며, 특히 URL 입력에 대해 추가적인 고려를 했습니다.

```typescript
// https://example.com
// http://example.com
// example.com
// www.example.com

→ 모두 https://example.com 형식으로 변환
```

<div align="center">
 <img src="https://github.com/user-attachments/assets/bf3ecb79-8373-4a0b-ac6d-3378b6ee9cd2" width="600" alt="유효성 검사">
</div>

### 7) Docker를 활용한 개발 환경 설정

본 프로젝트는 Next.js 애플리케이션을 Docker로 컨테이너화하여 개발 환경에서 실행할 수 있도록 설정되었습니다.<br>
[Next.js 공식 Docker 예제](https://github.com/vercel/next.js/tree/canary/examples/with-docker)를 참고하여 작성되었으며, 개발 환경에서 테스트를 목적으로 설정되었습니다.

#### 개발 환경에서의 테스트

본 프로젝트는 Mock Service Worker(MSW)를 포함하여 테스트를 진행합니다.<br>
이를 위해 Next.js 프로젝트의 빌드 과정을 생략하고, `npm run dev` 명령어로 개발 서버를 실행하도록 설정했습니다.<br>
이는 MSW가 빌드된 환경에서 동작하지 않기 때문이며, 개발 환경에서 API 모킹을 포함한 테스트를 원활하게 수행하기 위함입니다.

## [3] 마무리하며

이번 프로젝트를 통해 프론트엔드 개발에서 발생하는 다양한 실제 문제들을 해결해 보았습니다. 초기에는 모든 일정 데이터를 한 번에 로드하는 단순한 방식을 채택했으나, 데이터 증가에 따른 성능 저하와 초기 로딩 시간 증가라는 문제를 발견하였습니다. 이를 해결하기 위해 무한 스크롤을 도입하고, React Query의 queryKey 전략을 활용하여 데이터를 효율적으로 관리함으로써 사용자 경험을 크게 향상시킬 수 있었습니다. 이러한 최적화는 서버 자원의 효율적 사용과 클라이언트의 원활한 인터페이스 제공에 중요한 역할을 했습니다.

채팅 시스템 구현 과정에서는 다양한 메시지 타입을 유연하게 처리할 수 있는 구조의 필요성이 대두되었습니다. TypeScript와 인터페이스 설계를 통해 확장 가능한 메시지 구조를 구축하였으며, URL과 전화번호와 같은 데이터의 일관성을 유지하기 위한 유효성 검사 로직을 개선하였습니다. 특히 전역 상태 관리를 위해 별도의 라이브러리 대신 React의 기본 기능을 활용함으로써 시스템의 복잡성을 줄이고 유지보수를 용이하게 만들 수 있었습니다.

프로젝트 구조 설계 시 Next.js의 App Router를 활용하여 각 기능을 독립적으로 분리하였습니다. 이를 통해 폴더 구조의 중요성을 재확인하였으며, 컴포넌트와 로직의 재사용성을 고려한 설계 방식을 도입하여 코드의 효율성과 유지보수성을 높였습니다. 또한, MSW(Mock Service Worker)를 활용한 API 모킹은 백엔드 의존성 없이 프론트엔드 개발을 진행할 수 있는 환경을 제공하여 개발 생산성을 크게 향상시켰습니다.

이번 프로젝트를 통해 프론트엔드 개발에서 중요한 것은 기술의 완벽한 구현보다는 상황에 맞는 적절한 해결책을 찾아가는 것임을 확인할 수 있었습니다. 특히 사용자 경험과 개발자 경험 간의 균형을 맞추는 것이 프로젝트의 성공에 결정적인 요소임을 깊이 인식하게 되었습니다. 이러한 경험은 향후 더욱 견고하고 유지보수하기 쉬운 애플리케이션을 설계하고 구현하는 데 있어 중요한 밑거름이 될 것입니다.

지금까지 긴 글을 읽어주셔서 감사합니다. 🙇🏼‍♀️(꾸벅)🙇🏻‍♂️
