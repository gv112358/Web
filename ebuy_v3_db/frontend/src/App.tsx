import React from "react";
import logo from "./logo.svg";
import AccessForm from "./store/components/AccessForm";
import "./App.css";
import Header from "./store/components/Header";
import { useSelector } from "react-redux";
import { Col, Row } from "react-bootstrap";
import SideBar from "./store/components/Sidebar";
import MainPage from "./store/components/MainPage";

function App() {
  const hasAccessed: number = useSelector(
    (state: any) => state.access.hasAccessed
  );

  return (
    <>
      <Header />
      <Row>
        {hasAccessed && (
          <Col xs="3">
            <SideBar />
          </Col>
        )}
        <Col xs={!hasAccessed ? "12" : "9"}>
          {!hasAccessed ? <AccessForm /> : <MainPage />}
        </Col>
      </Row>
    </>
  );
}

export default App;
