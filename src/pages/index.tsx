import { useState, useEffect, useRef } from "react";
import Head from "next/head";
import useUserStore from "@/stores/user";
import useTaskStore from "@/stores/tasks";
import useSettingStore from "@/stores/settings";
import useTimerStore from "@/stores/timer";
import TimerContainer from "@/components/TimerContainer";
import TaskContainer from "@/components/TaskContainer";
import SettingsForm from "@/components/SettingsForm";
import TaskForm from "@/components/TaskForm";
import TaskEditMenu from "@/components/TaskEditMenu";
import { getSettingsService } from "@/services/settings";
import { getUnarchivedTasksService } from "@/services/tasks";
import { ITaskItem } from "@/types/interfaces";

export default function Home() {
  // Counter to track how many times useEffect has ran
  const [counter, setCounter] = useState(0);
  const apiCalledRef = useRef(false);

  // Global states: useUserStore
  const { user_id } = useUserStore();

  // Global states: useTaskStore
  const { taskFormType, taskEditMenuId, addTask, tasks, clearAllTasks } =
    useTaskStore();

  // Global states: useSettingsStore
  const { isSettingOpen } = useSettingStore();
  const {
    setPomodoroTimerMinutes,
    setShortBreakTimerMinutes,
    setLongBreakTimerMinutes,
    setNumberOfPomodoroSessionsInCycle,
    setAlarmRingtone,
    setAlarmVolume,
  } = useSettingStore();

  // Global states: useTimerStore
  const { setTimerMinutes, setRemainingDurationInMilliseconds } =
    useTimerStore();

  // UseEffect to fetch settings and unarchived tasks on mount
  useEffect(() => {
    // Check if the apiCalledRef has been called
    if (apiCalledRef.current) return;
    apiCalledRef.current = true;

    // POST request: Retrieve user's settings
    getSettingsService(user_id)
      .then((res) => {
        setPomodoroTimerMinutes(res.pomodoro_minutes);
        setShortBreakTimerMinutes(res.short_break_minutes);
        setLongBreakTimerMinutes(res.long_break_minutes);
        setNumberOfPomodoroSessionsInCycle(res.number_of_sessions_in_a_cycle);
        setAlarmRingtone(res.alarm_ringtone);
        setAlarmVolume(res.alarm_volume);
        setTimerMinutes(res.pomodoro_minutes);
        setRemainingDurationInMilliseconds(res.pomodoro_minutes * 1000 * 60);
        setCounter((prev) => prev + 1);
      })
      .catch((error) => console.log(error));

    // POST request: Retrieve user's unarchived tasks
    clearAllTasks();
    getUnarchivedTasksService<ITaskItem>(user_id)
      .then((res) => {
        console.log(res);
        if (res !== undefined) {
          res.forEach((task) => {
            return addTask(task);
          });
        }
        setCounter((prev) => prev + 1);
      })
      .catch((error) => console.log(error));
  }, []);

  console.log(tasks);

  return (
    <div className="pt-2 text-slate-900 w-[1280px] mx-auto">
      <Head>
        <title>Pomogrids</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {/* Settings Form */}
      {isSettingOpen && <SettingsForm />}

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
