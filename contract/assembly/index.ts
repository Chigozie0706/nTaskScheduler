import { Task, listedTasks } from './model';
import { Context, logging, storage } from "near-sdk-as";

const DEFAULT_MESSAGE = "Hello";

export function getGreeting(accountId: string): string | null {
  return storage.get<string>(accountId, DEFAULT_MESSAGE);
}

export function getUpdateDate(accountId: string): string | null {
  return storage.get<string>(
    `${accountId}_last_updated`,
    "No custom greeting."
  );
}

export function setGreeting(message: string): void {
  const accountId = Context.sender;
  const timestamp = Context.blockTimestamp;
  // Use logging.log to record logs permanently to the blockchain!
  logging.log(
    `Saving greeting "${message}" with timestamp: ${timestamp} for account "${accountId}"`
  );
  storage.set(accountId, message);
  storage.set(
    `${accountId}_last_updated`,
    `${new Date(timestamp / 1000000).toDateString()} ${new Date(
      timestamp / 1000000
    ).toTimeString()}`
  );
}


export function createTask(task: Task): void {
    let storedTask = listedTasks.get(task.id);
    if (storedTask !== null) {
        throw new Error(`a task with ${task.id} already exists`);
    }
    listedTasks.set(task.id, Task.fromPayload(task));
}

export function getTaskById(id: string): Task | null {
    return listedTasks.get(id);
}

export function getTasks(): Task[] {
    return listedTasks.values();
}




export function updateTaskById(id : string): void {
  Task.updateTask(id);
}

export function deleteTaskById(id: string): void {
  Task.deleteTask(id);
}