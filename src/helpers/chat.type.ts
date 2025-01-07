export enum SourceMessage {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}
export interface ChatModel {
  id: number;
  createdAt: string;
  updatedAt: string;
  messages: DisplayMessage[];
}

export interface DisplayMessage {
  source: SourceMessage;
  message: ServerMessageModel | ClientMessage;
}

export interface ClientMessage {
  id?: number;
  internalId: string;
  presetMessageSelected: PresetMessage;
}

export interface ServerMessageModel {
  id: number;
  presetMessage: PresetMessage;
}

export interface PresetMessage {
  id: number;
  text: string;
  type: string;
  options: Option[];
}

export interface Option {
  id: string;
  title: string;
  responseOptionId: string;
}

export interface MessageFromApi {
  id: number;
  source: SourceMessage;
  internalId: string;
  chatId: number;
  createdAt: Date;
  updatedAt: Date;
  presetMessage: PresetMessage
}

export interface ChatFromApi {
  id: number;
  createdAt: string;
  updatedAt: string;
  messages: MessageFromApi[];
}

export enum PresetMessageTree {
  ROOT = "ROOT", //raiz
  TERMINAL = "TERMINAL", //nodo terminal
  LEAVES = "LEAVES", //hojas
}
