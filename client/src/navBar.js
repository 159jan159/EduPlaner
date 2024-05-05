import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import NavDropdown from 'react-bootstrap/NavDropdown';

import i18next from 'i18next';
import { useTranslation } from 'react-i18next';

import Icon from '@mdi/react';
import { mdiWeb  } from '@mdi/js';

const icon = <Icon path={mdiWeb } size={1.2} color={"black"}/>;

const languages = [
    {
        code: 'en',
        name: 'English'
    },
    {
        code: 'cs',
        name: 'Čeština'
    }

]

function NavBar(user) {
    const { t } = useTranslation();

    const handleLogout = () => {
        user.setUser(null);
    }

    return (
        <Navbar className="bg-body-tertiary">
          <Container>
            <Navbar.Brand href="#home">EduPlaner</Navbar.Brand>
            <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
        <Nav>
            <NavDropdown title={icon} id="basic-nav-dropdown">
                {languages.map(({ code, name }) => (
                    <NavDropdown.Item onClick={ () => i18next.changeLanguage(code)}> {name} </NavDropdown.Item>
                ))}  
            </NavDropdown>
          </Nav>
          <Nav>
            <NavDropdown title={user.user.name +" "+ user.user.surname} id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1"> {t('user_settings')} </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item onClick={handleLogout}>{t('log_out')}</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
          </Container>
        </Navbar>
      );
}

export default NavBar;
