import React, { useEffect, useState } from "react";
import {
  Card,
  CardImg,
  CardTitle,
  CardSubtitle,
  CardBody,
  Col,
  Row,
  Input,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { apiActions } from "./redux/api/reducer";
import { connect } from "react-redux";
import { Range } from "rc-slider";

const App = ({ data, getApiData }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [valueLeft, setValueLeft] = useState("0");
  const [valueRight, setValueRight] = useState("0");
  const [searchMovies, setsearchMovies] = useState(data.Search);

  useEffect(() => {
    getApiData();
  });

  const onSliderChange = value => {
    let movies = data.Search.filter(movie => {
      var m = movie.Year;
      return m >= valueLeft && m <= valueRight;
    });
    setsearchMovies(movies);
    setValueLeft(value[0]);
    setValueRight(value[1]);
  };

  return (
    <Row>
      <Col sm="4">
        <Card className="m-4">
          <CardBody>
            <Input
              name="searchKeyword"
              id="searchKeyword"
              placeholder="Search"
              className="rounded-pill bg-transparent"
              onChange={event => {
                setSearchTerm(event.target.value);
              }}
            />
            <br />
            <p>
              {valueLeft} -- {valueRight}
            </p>
            <Range min={1950} max={2021} onChange={onSliderChange} />
          </CardBody>
        </Card>
      </Col>
      <Col sm="8">
        <Row>
          {searchMovies !== undefined && searchMovies
            .filter(val => {
              if (searchTerm === "") {
                return val;
              } else if (
                val.Title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                val.Year.toLowerCase().includes(searchTerm.toLowerCase())
              ) {
                if (Object.keys(searchMovies.indexOf("searchTerm")) > -1) {
                  return val;
                }
              }
            })
            .map((item,key) => {
              return (
                <Col sm="4" key={key}>
                  <Card className="m-2">
                    <CardImg
                      top
                      width="100%"
                      height= "210vw"
                      src={item.Poster}
                      alt="Card image cap"
                    />
                    <CardBody>
                      <CardTitle tag="h5">{item.Title}</CardTitle>
                      <CardSubtitle tag="h6" className="mb-2 text-muted">
                        Released On:- {item.Year}
                      </CardSubtitle>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
        </Row>
      </Col>
    </Row>
  );
};
const mapStateToProps = ({ reducerApi }) => {
  const { data, isLoading, error } = reducerApi;
  return { data, isLoading, error };
};

const mapDispatchToProps = dispatch => ({
  ...bindActionCreators({ ...apiActions.Creators }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
