import './App.css';

import { useTranslation } from 'react-i18next';
import NavBar from './navBar';
import Sesesters from './Semesters';
import Classes from './Classes';
import Tasks from './Tasks';
import Meetings from './Meetings';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { useState } from 'react';

import { Navigate } from 'react-router-dom';

 function Dashboard(user) {

    const loadSemesters = () => {
        let semesters = [];
        fetch("http://localhost:8000/semester/listAll", {
            method: "Get",
            headers: {
                "Content-Type": "application/json",
            }
        }).then(response => response.json())
            .then(data => {
                if (data.code) {
                    console.log(data.message)
                } else {
                    Object.values(data).forEach(element => {
                        element.selected = false;
                        semesters.push(element);
                    });
                }
            }).catch((err) => {
                console.log(err.message);
            });
        return (semesters);
    }
    const loadClasses = () => {
        let classess = [];
        fetch("http://localhost:8000/class/listAll", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                usrId: user.user.id,
                semesterId: "8d30522db8416b01",
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.code) {
                    console.log(data.message)
                } else {
                    Object.values(data).forEach(element => {
                        element.selected = false;
                        classess.push(element);
                    });
                }
            }).catch((err) => {
                console.log(err.message);
            });
            console.log(classess)
        return (classess);
    }
    
    const [semesters, setSemesters] = useState(loadSemesters);
    const [classes, setClasses] = useState(loadClasses);
    const [tasks, setTasks] = useState([]);
    const [meetigns, setmeetigns] = useState([]);

    if (user.user == null) {
        console.log("User not logged in");
        return <Navigate to="/" replace />;
    }


    return (
        <div className="App">
            <NavBar user={user.user} setUser={user.setUser} />
            <Container>
                <Row>
                    <Sesesters semesters={semesters} setSemesters={setSemesters}/>
                </Row>
                <Row>
                    <Classes classes={classes}  setClasses={setClasses}/>
                </Row>
                <Row>
                    <Col><Tasks /></Col>
                    <Col><Meetings /></Col>
                </Row>
            </Container>
        </div>
    );
}



export default Dashboard;
