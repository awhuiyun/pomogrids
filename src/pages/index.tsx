import { useState, useEffect } from "react";
import Head from "next/head";
import useTaskStore from "@/stores/tasks";
import TimerContainer from "@/components/TimerContainer";
import TaskContainer from "@/components/TaskContainer";
import TaskForm from "@/components/TaskForm";
import TaskEditMenu from "@/components/TaskEditMenu";

export default function Home() {
  // Global states: useTaskStore
  const { taskFormType, taskEditMenuId, setTaskEditMenuid } = useTaskStore();

  return (
    <div className="pt-2 text-slate-900 w-[1280px] mx-auto">
      <Head>
        <title>Pomogrids</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Task Form */}
      {taskFormType && <TaskForm />}

      {/* Task Edit Menu */}
      {taskEditMenuId && <TaskEditMenu />}

      {/* Timer and Tasks section */}
      <div className="flex space-x-4">
        <TimerContainer />
        <TaskContainer />
      </div>
    </div>
  );
}
