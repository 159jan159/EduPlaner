import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import Meeting from './Meeting';

import './App.css';

function Meetings(params) {
    const { t } = useTranslation();

    const [meetings, setMeetings] = useState([
        {
            "name":"test meet2",
            "description":"",
            "startTime":"2024-04-16T22:00:00.000Z",
            "endTime":"2024-04-16T22:00:00.000Z",
        },
        {
            "name":"test meet2",
            "description":"",
            "startTime":"2024-04-16T22:00:00.000Z",
            "endTime":"2024-04-16T22:00:00.000Z",
        },
        {
            "name":"test meet3",
            "description":"",
            "startTime":"2024-04-16T22:00:00.000Z",
            "endTime":"2024-04-16T22:00:00.000Z",
        }
    ]);
    return (
        <div>
            <h1 className='EduPlaner'>{t("meetings")}</h1>
            <p>+ {t("add_meeting")}</p>
            <div>
            {meetings.map((meeting) => (<Meeting meeting={meeting}/>))}                 
            </div>
        </div>
    )
}
export default Meetings;