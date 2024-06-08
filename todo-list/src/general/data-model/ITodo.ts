import type {TodoStatus} from "./TodoStatus";

export interface ITodo {
    id: string;
    title: string;
    content: string;
    createdAt: number | null;
    status: TodoStatus;
    _isEditing:boolean;
}