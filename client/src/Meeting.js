import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import './App.css';
import Time from './Time';

import Icon from '@mdi/react';
import { mdiCheckBold } from '@mdi/js';

function Meeting({ meeting }) {


    return (
        <div>
            <Container>
                <Row>
                    <Col>
                        <Time time={meeting.startTime} />
                    </Col>
                    <Col>
                        <Time time={meeting.endTime} />
                    </Col>
                    <Col>
                        <b>{meeting.name}</b>
                    </Col>
                </Row>
            </Container>
        </div>
    );
}

export default Meeting;