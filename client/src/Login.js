import { Form, Row, Col, Container, Button } from "react-bootstrap";

import {useNavigate } from 'react-router-dom';

import './App.css';

import { useTranslation } from 'react-i18next';
import NavBarNoLogin from "./navBarNoLogin";

function Login({setUser}) {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleLogin = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)
        fetch("http://localhost:8000/usr/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formDataObj.email,
                password: formDataObj.password
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.code) {
                    
                }else{
                setUser(data);
                navigate("/dashboard", { replace: true });
                }
            }).catch((err) => {
                setUser(null);
                console.log(err.message);
            });
    }
    return (
        <div className="App">
            <NavBarNoLogin />
            <Container>
                <h1>EduPlaner</h1>
                <h2>{t("login")}</h2>
                <Form className="Login" onSubmit={handleLogin}>
                    <Row>
                        <Form.Group controlId="formGridEmail">
                            <Form.Label>{t("email")}</Form.Label>
                            <Form.Control type="email" placeholder={t("enter_email")} name="email" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="formGridPassword">
                            <Form.Label>{t("password")}</Form.Label>
                            <Form.Control type="password" placeholder={t("enter_password")} name="password" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button variant="primary" type="submit"> {t("login")} </Button>
                    </Row>
                    <Row>
                        <div>{t("dont_have_account")}</div>

                        <Button variant="secondary" href="/register"> {t("register")} </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )

}



function handleLoginn() {


}

export default Login;