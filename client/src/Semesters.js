import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';
import './App.css';

function Sesesters(semesters) {
    console.log(semesters);
    const { t } = useTranslation();

    const selectionHandler = (sem) => {
        const upSemesters = semesters.semesters.map((semester) => {
            if (semester.name === sem.name) {
                return {...semester, selected: !semester.selected};

            }else{
                return {...semester, selected: false};
            }
        }
        );
        console.log("new"+upSemesters);
        semesters.setSemesters(upSemesters);
    }

    return (
        <div>
            <h1 className='EduPlaner'>{t("semesters")}</h1>        

            {semesters.semesters.map((semester) => console.log(semester))}{ semesters.semesters.map((semester) => (<Button style={buttonStyle(semester)} onClick={() => {console.log("clicking: ");console.log(semester);selectionHandler(semester)}}>{semester.name}</Button>))}
        </div>
    );
}

function buttonStyle(sem) {
    return{
        margin: "5px",
        border: "none",
        "border-radius" : "50px",
        backgroundColor: sem.selected ? "orange" : "lightgray",

    }
}

export default Sesesters;