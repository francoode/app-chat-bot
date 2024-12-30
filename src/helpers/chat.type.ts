export interface Message {
  id?: number;
  text: string;
  source: SourceMessage;
}

export interface Chat {
  id: number;
  internalId: string;
  userId: number;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
}

export enum SourceMessage {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

export interface ServerMessage {
  id: number;
  userId: number;
  createdAt: string;
  updatedAt: string;
  source: SourceMessage;
  presetMessage: PresetMessage;
  text: string;
}

export interface PresetMessage {
  id: number;
  text: string;
  type: string;
  createdAt: string;
  updatedAt: string;
  options: Option[];
}

export interface Option {
  id: number;
  title: string;
  option: Option2;
  parentMessage: ParentMessage;
}

export interface Option2 {
  id: number;
  text: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

export interface ParentMessage {
  id: number;
  text: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}
