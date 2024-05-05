import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import Time from './Time';

import Icon from '@mdi/react';
import { mdiCheckBold } from '@mdi/js';

function Task({ task }) {


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Time time={task.deadline} />
                    </Col>
                    <Col>
                        <b>{task.name}</b>
                    </Col>
                    <Col>
                        <Icon path={mdiCheckBold} size={1.5} />
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Task;