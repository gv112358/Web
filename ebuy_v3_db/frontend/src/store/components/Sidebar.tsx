import React from "react";
import { Nav, Spinner } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./Sidebar.css";
import { accessActions } from "../util/accessSlice";
import { useGetCategoriesQuery } from "../../feature/api/dataToShowApi";

const SideBar = () => {
  const dispatch = useDispatch();

  const { data, isLoading, isSuccess, isError, error } =
    useGetCategoriesQuery();

  let categories;

  if (isLoading) {
    categories = <Spinner />;
  } else if (isSuccess) {
    let dataCopy = data.slice();
    dataCopy.sort();
    categories = dataCopy.map((category: string, index: number) => (
      <Nav.Item key={index} className="greyBorderBottom">
        <Nav.Link
          onClick={() =>
            dispatch(accessActions.getSelectedCategory({ category }))
          }
          style={{ color: "black" }}
        >
          {category}
        </Nav.Link>
      </Nav.Item>
    ));
  } else if (isError) {
    categories = (
      <p>{error && "error" in error ? error.error : JSON.stringify(error)}</p>
    );
    /**
     * L'espressione tra {} della riga precedente equivale a scrivere:
     * if(error && 'error' in error) {
     *  return error.error
     * } else {
     *  return JSON.stringify(error)
     * }
     *
     * L'operatore in controlla se una proprietà (in questo caso 'error')
     * è contenuta nell'oggetto specificato (in questo caso error).
     *
     * Il metodo JSON.stringify(object) serve a convertire l'oggetto passato come parametro in stringa
     */
  }

  return (
    <>
      <Nav
        className="d-sm-block bg-light"
        style={{
          height: "100%",
          paddingLeft: "10px",
          paddingTop: "30px",
          borderRight: "1px solid #E0E0E0",
        }}
      >
        {categories}
      </Nav>
    </>
  );
};
export default SideBar;
