import { Form, Row, Col, Container, Button } from "react-bootstrap";

import { useNavigate } from 'react-router-dom';

import { useTranslation } from 'react-i18next';

import './App.css';
import NavBarNoLogin from "./navBarNoLogin";

function Register(user) {
    const { t } = useTranslation();
    console.log(user.setUser)
    const navigate = useNavigate();

    const handleRegister = e => {
        e.preventDefault()
        const formData = new FormData(e.target),
            formDataObj = Object.fromEntries(formData.entries())
        console.log(formDataObj)
        fetch("http://localhost:8000/usr/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: formDataObj.name,
                surname: formDataObj.surname,
                email: formDataObj.email,
                password: formDataObj.password
            }),
        }).then(response => response.json())
            .then(data => {
                if (data.code) {

                } else {
                    user.setUser(data);
                    navigate("/dashboard", { replace: true });
                }
            }).catch((err) => {
                console.log(err.message);
                user.setUser(null);

            });
    }

    return (
        <div className="App">
            <NavBarNoLogin />
            <Container>
                <h1>EduPlaner</h1>
                <h2>{t("register")}</h2>
                <Form className="Login" onSubmit={handleRegister}>
                    <Row>
                        <Form.Group controlId="formGridName">
                            <Form.Label>{t("name")}</Form.Label>
                            <Form.Control type="name" placeholder={t("enter_name")} name="name" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Form.Group controlId="formGridSurname">
                            <Form.Label>{t("surname")}</Form.Label>
                            <Form.Control type="name" placeholder={t("enter_surname")} name="surname" />
                        </Form.Group>
                    </Row>
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
                        <Form.Group controlId="formGridPassword">
                            <Form.Label>{t("repeat_password_again")}</Form.Label>
                            <Form.Control type="password" placeholder={t("enter_password_again")} name="password" />
                        </Form.Group>
                    </Row>
                    <Row>
                        <Button variant="primary" type="submit"> {t("register")} </Button>
                    </Row>
                    <Row>
                        <div>{t("allready_have_acount")}</div>
                        <Button variant="secondary" href="/"> {t("login")} </Button>
                    </Row>
                </Form>
            </Container>
        </div>
    )
}

export default Register;