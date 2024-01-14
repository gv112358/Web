import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { accessActions } from "../util/accessSlice";
import { Credentials } from "../../models/Credentials";
import {
  useLoginMutation,
  useRegistrationMutation,
} from "../../feature/api/authApi";

function AccessForm() {
  const [usernameValue, setUsernameValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const dispatch = useDispatch();
  const goToRegistration: number = useSelector(
    (state: any) => state.access.goToRegistration
  );
  const [login] = useLoginMutation();
  const [registration] = useRegistrationMutation();

  const inputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    inputType: string
  ) => {
    switch (inputType) {
      case "username":
        setUsernameValue(event.target.value);
        break;
      case "password":
        setPasswordValue(event.target.value);
        break;
      default:
        break;
    }
  };

  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleSubmitCustom({ username: usernameValue, password: passwordValue });
    setUsernameValue("");
    setPasswordValue("");
  };
  const handleSubmitCustom = async (data: Credentials) => {
    try {
      goToRegistration
        ? await registration(data).unwrap()
        : await login(data).unwrap();
      /**
          
La riga precedente è un'espressione scritta con l'operatore ternario che equivale
al seguente if-else statement:
if(goToRegistration) {
await registration(data).unwrap();
} else {
await login(data).unwrap();
}
*/
      dispatch(accessActions.access({ username: data.username }));
    } catch (error: any) {
      alert("Errore " + error.data.status + ": " + error.data.error);
      for (let prop in error)
      	alert("Errore " + prop + " " + error[prop]);
    }
  };

  const goToRegistrationHandler = () => {
    dispatch(accessActions.goToRegistration());
    setUsernameValue("");
    setPasswordValue("");
  };

  const goToLoginHandler = () => {
    dispatch(accessActions.goToLogin());
    setUsernameValue("");
    setPasswordValue("");
  };

  return (
    <Container>
      <Row style={{ marginTop: "50px" }}>
        <Col sm={3}></Col>
        <Col sm={6}>
          {goToRegistration ? (
            <p>
              Possiedi già un account:{" "}
              <a href="#" onClick={goToLoginHandler}>
                Accedi
              </a>
            </p>
          ) : (
            <p>
              Non possiedi ancora un account:{" "}
              <a href="#" onClick={goToRegistrationHandler}>
                Registrati
              </a>
            </p>
          )}
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                required
                type="text"
                placeholder="Inserisci il tuo username"
                value={usernameValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                  inputChangeHandler(event, "username");
                }}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                required
                type="password"
                placeholder="Inserisci la tua password"
                value={passwordValue}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  inputChangeHandler(event, "password")
                }
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              {goToRegistration ? "Registrati" : "Login"}
            </Button>
          </Form>
        </Col>

        <Col sm={3}></Col>
      </Row>
    </Container>
  );
}
export default AccessForm;
