// require("dotenv").config();
import axios, { AxiosResponse } from "axios";

// Function to create new task in tasks table
export async function createNewTaskService(
  user_id: string,
  task_name: string,
  target_num_of_sessions: number,
  completed_num_of_sessions: number,
  is_completed: boolean,
  category_name?: string,
  category_colour?: string
) {
  try {
    const result = await axios({
      method: "post",
      url: "http://127.0.0.1:5001/tasks/create",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id,
        task_name,
        target_num_of_sessions,
        completed_num_of_sessions,
        is_completed,
        category_name,
        category_colour,
      },
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

// Function to update existing task in tasks table
export async function updateExistingTaskService(
  user_id: string,
  task_id: string,
  task_name: string,
  target_num_of_sessions: number,
  is_completed: boolean,
  category_name?: string,
  category_colour?: string
) {
  try {
    const result = await axios({
      method: "patch",
      url: "http://127.0.0.1:5001/tasks/update",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id,
        task_id,
        task_name,
        target_num_of_sessions,
        is_completed,
        category_name,
        category_colour,
      },
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

// Function to delete existing task
export async function deleteExistingTaskService(task_id: string) {
  try {
    const result = await axios({
      method: "delete",
      url: "http://127.0.0.1:5001/tasks/delete",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        task_id,
      },
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

// Function to update task after session completes
export async function updateTaskAfterSessionService(
  task_id: string,
  number_of_sessions: number,
  number_of_minutes: number
) {
  try {
    const result = await axios({
      method: "patch",
      url: "http://127.0.0.1:5001/tasks/session-complete",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        task_id,
        number_of_sessions,
        number_of_minutes,
      },
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

// Function to archive task
export async function archiveTaskService(task_id: string) {
  try {
    const result = await axios({
      method: "patch",
      url: "http://127.0.0.1:5001/tasks/archive-task",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        task_id,
      },
    });
    console.log(result.data);
  } catch (error) {
    console.log(error);
  }
}

// Function to retrieve all unarchived tasks to populate TaskContainer
export async function getUnarchivedTasksService<T>(user_id: string) {
  try {
    const result = await axios<T[]>({
      method: "post",
      url: "http://127.0.0.1:5001/tasks/unarchived-tasks",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        user_id,
      },
    });
    return result.data;
  } catch (error) {
    console.log(error);
  }
}
