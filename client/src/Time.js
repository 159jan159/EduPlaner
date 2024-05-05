import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';

function Time({time}) {
    const t = new Date(time)
    return(
        <Container style={wholeTimeStyle()}>
            <Row>
                <p style={timeStyle()}>{t.getUTCDate()+". "+(t.getMonth()+1)+". "+t.getFullYear()}</p>
            </Row>
            <Row>
                <p style={timeStyle()}>{t.getUTCHours()+":"+ (t.getMinutes()==0? "00" : t.getMinutes()<10? "0"+t.getMinutes() : t.getMinutes())}</p>
            </Row>
        </Container>
    )
}

function timeStyle(){
    return{
        margin: "0px",
        border: "none",
        "white-space": "nowrap"
    }
}

function wholeTimeStyle() {
    return {
        margin: "5px",
        border: "none",
    }
}


export default Time;