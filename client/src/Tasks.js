import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import Task from './Task';

import './App.css';

function Tasks(params) {
    const { t } = useTranslation();

    const [tasks, setTasks] = useState([
        {
            "name": "test task",
            "description": "",
            "deadline": "2024-04-16T22:00:00.000Z",
            "solved": false
        },
        {
            "name": "test task2",
            "description": "",
            "deadline": "2024-04-16T22:00:00.000Z",
            "solved": false
        },
        {
            "name": "test task3",
            "description": "",
            "deadline": "2024-04-16T22:00:00.000Z",
            "solved": false
        }
    ]);
    return (
        <div>
            <h1 className='EduPlaner'>{t("tasks")}</h1>
            <p>+ {t("add_task")}</p>
            <div>
            {tasks.map((task) => (<Task task={task}></Task>))}                 
            </div>
        </div>
    )
}
export default Tasks;