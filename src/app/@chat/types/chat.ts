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

export type Message = TextMessage | IntroductionMessage;
