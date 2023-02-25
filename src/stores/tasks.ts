import { create } from "zustand";
import { ITaskItem } from "../types/interfaces";

interface IUseTaskStore {
  tasks: ITaskItem[];
  isTaskFormOpen: boolean;
  taskSelectedForTimer: string;
  taskSelectedForEdit: string;
  setTaskFormOpenTrue: () => void;
  setTaskFormOpenFalse: () => void;
  unselectAllTasksForTimer: () => void;
  setSelectedTaskForTimer: (id: string) => void;
  unselectAllTasksForEdit: () => void;
  setSelectedTaskForEdit: (id: string) => void;
  addTask: (task: ITaskItem) => void;
  addSessionCountToTaskAndCheckCompletion: (id: string) => void;
  setEditsToSelectedTaskForEdit: (name: string, sessionNum: number) => void;
}

const useTaskStore = create<IUseTaskStore>((set) => ({
  tasks: [
    {
      uniqueId: "1",
      taskName: "Work on Pomogrids",
      targetNumOfSessions: 5,
      completedNumOfSessions: 3,
      isCompleted: false,
      isSelectedForTimer: false,
      isSelectedForEdit: false,
    },
    {
      uniqueId: "2",
      taskName: "Buy groceries",
      targetNumOfSessions: 1,
      completedNumOfSessions: 1,
      isCompleted: true,
      isSelectedForTimer: false,
      isSelectedForEdit: false,
    },
  ],
  isTaskFormOpen: false,
  taskSelectedForEdit: "",
  taskSelectedForTimer: "",
  setTaskFormOpenTrue: () =>
    set(() => ({
      isTaskFormOpen: true,
    })),
  setTaskFormOpenFalse: () =>
    set(() => ({
      isTaskFormOpen: false,
    })),
  unselectAllTasksForTimer: () =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        return { ...item, isSelectedForTimer: false };
      }),
      taskSelectedForTimer: "",
    })),
  setSelectedTaskForTimer: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        if (item.uniqueId === id) {
          return { ...item, isSelectedForTimer: true };
        }
        return item;
      }),
      taskSelectedForTimer: id,
    })),
  unselectAllTasksForEdit: () =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        return { ...item, isSelectedForEdit: false };
      }),
      taskSelectedForTimer: "",
    })),
  setSelectedTaskForEdit: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        if (item.uniqueId === id) {
          return { ...item, isSelectedForEdit: true };
        }
        return item;
      }),
      taskSelectedForEdit: id,
    })),
  addTask: (task: ITaskItem) =>
    set((state) => ({
      tasks: [...state.tasks, task],
    })),
  addSessionCountToTaskAndCheckCompletion: (id: string) =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        if (
          item.uniqueId === id &&
          item.targetNumOfSessions - item.completedNumOfSessions !== 1
        ) {
          return {
            ...item,
            numOfCompletedSessions: item.completedNumOfSessions + 1,
          };
        } else if (
          item.uniqueId === id &&
          item.targetNumOfSessions - item.completedNumOfSessions === 1
        ) {
          return {
            ...item,
            numOfCompletedSessions: item.completedNumOfSessions + 1,
            isCompleted: true,
          };
        }
        return item;
      }),
    })),
  setEditsToSelectedTaskForEdit: (name: string, sessionNum: number) =>
    set((state) => ({
      tasks: state.tasks.map((item) => {
        if (item.isSelectedForEdit === true) {
          if (item.completedNumOfSessions >= sessionNum)
            return {
              ...item,
              taskName: name,
              numOfSessions: sessionNum,
              isCompleted: true,
            };
          else {
            return {
              ...item,
              taskName: name,
              numOfSessions: sessionNum,
              isCompleted: false,
            };
          }
        }
        return item;
      }),
    })),
}));

export default useTaskStore;
