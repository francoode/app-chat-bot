export enum SourceMessage {
  CLIENT = "CLIENT",
  SERVER = "SERVER",
}

export interface Chat {
  id: number
  internalId: string
  userId: number
  createdAt: string
  updatedAt: string
  messages: Message[]
}

export interface Message {
  id: number
  userId: number
  source: string
  createdAt: string
  updatedAt: string
  presetMessage: PresetMessage
  text: string;
}

export interface PresetMessage {
  id: number
  text: string
  type: string
  options: Option[]
}

export interface Option {
  title: string
}

