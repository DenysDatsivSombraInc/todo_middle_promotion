export interface Todo {
  id: string;
  title?:string;
  description?: string;
  dueDate?: string;
  creationDate?: string;
  checkMark?: boolean;
  completionDate?: string;
}
