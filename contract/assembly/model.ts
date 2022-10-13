import { PersistentUnorderedMap, u128, context, logging } from "near-sdk-as";

@nearBindgen
export class Task {
    id: string;
    taskName: string;
    taskDescription: string;
    dateCreated: u64;
    status: string;
    
    public static fromPayload(payload: Task): Task {
        const task = new Task();
        task.id = payload.id;
        task.taskName = payload.taskName;
        task.taskDescription = payload.taskDescription;
        task.dateCreated = context.blockTimestamp;
        task.status = "pending";
        return task;
    }

    

    public static updateTask(
        id: string
    ): void {
        const task = listedTasks.get(id);

        if (task == null) throw new Error("task not found");
        else {
            task.status = "done";
            listedTasks.set(task.id, task);
        }
    }


    public static deleteTask(
        id: string
    ): void {
    logging.log(`deleting task`);
        const beat = listedTasks.get(id);

        if (beat == null) throw new Error("drug not found");
        else {
            listedTasks.delete(beat.id);
        }
    }
}


export const listedTasks = new PersistentUnorderedMap<string,Task>("tasks");
