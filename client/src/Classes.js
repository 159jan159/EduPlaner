import { useTranslation } from 'react-i18next';

import { useState } from 'react';

import Button from 'react-bootstrap/esm/Button';

import './App.css';

function Classes(classes) {
    console.log(classes);
    const { t } = useTranslation();

    const selectionHandler = (cla) => {
        const upclasses = classes.classes.map((classs) => {
            if (classs.name === cla.name) {
                return { ...classs, selected: !classs.selected };

            } else {
                return { ...classs, selected: false };
            }
        }
        );
        console.log("new" + upclasses);
        classes.setClasses(upclasses);
    }
    
    return (
        <div>
            <h1 className='EduPlaner'>{t("classes")}</h1>
            {classes.classes.map((classs) => (<Button style={buttonStyle(classs)} onClick={() => { console.log("clicking: "); console.log(classs); selectionHandler(classs) }}>{classs.name}</Button>))}
            <Button style={buttonStyle()}>+</Button>
        </div>
    );
}


function buttonStyle(cla = { selected: false }) {
    return {
        margin: "5px",
        border: "none",
        "border-radius": "50px",
        backgroundColor: cla.selected ? "orange" : "lightgray",
        

    }
}

export default Classes;