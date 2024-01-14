import { Card, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Product } from "../../models/Products";
import { useGetProductsQuery } from "../../feature/api/dataToShowApi";

const MainPage = () => {
  const username: string = useSelector((state: any) => state.access.username);
  const selectedCategory: string = useSelector(
    (state: any) => state.access.selectedCategory
  );

  const card = (product: Product, index: number) => {
    return (
      <Card
        style={{
          width: "15rem",
          marginRight: "20px",
          marginBottom: "20px",
          paddingLeft: 0,
          paddingRight: 0,
        }}
        key={index}
      >
        <Card.Img
          variant="top"
          src={
            Array.isArray(product.images) ? product.images[0] : product.images
          }
        />
        <Card.Body>
          <Card.Title>{product.title}</Card.Title>
          <Card.Text>Price: {product.price} €</Card.Text>
        </Card.Body>
      </Card>
    );
  };

  const { data, isLoading, isSuccess, isError, error } = useGetProductsQuery();

  let content;
  let categoryProducts: Product[] = [];

  if (isLoading) {
    content = <Spinner />;
  } else if (isSuccess) {
    data.products.forEach((product) => {
      if (product.category === selectedCategory) {
        categoryProducts.push(product);
      }
    });
    content = categoryProducts.map((product: Product, index: number) =>
      card(product, index)
    );
  } else if (isError) {
    content = (
      <p>{error && "error" in error ? error.error : JSON.stringify(error)}</p>
    );
  }

  return (
    <Container>
      <h2 style={{ marginTop: "30px" }}>Ti diamo il benvenuto: {username}</h2>
      <Row style={{ marginTop: "30px", paddingLeft: "0px" }}>
        {categoryProducts.length > 0
          ? content
          : "Non sono presenti prodotti per questa categoria."}
      </Row>
    </Container>
  );
};

export default MainPage;
