export type Task = {
    id: string; 
    name: string; 
    description?: string; 
    dueDate?: Date; 
    createdAt: Date; 
    importance: "low" | "medium" | "high"; 
}