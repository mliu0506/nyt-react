import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Container } from "../../components/Grid";
import { Input, FormBtn } from "../../components/Form";
import Moment from 'moment';

class Search extends Component {
  state = {
    topic: "",
    begin_date: "",
    end_date: "",
    toResults: false,
    results: []
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {

      const topic = this.state.topic.trim().split(" ").join("+");
      let begin_date;
      let end_date;

      if (this.state.begin_date) {
        begin_date = this.state.begin_date + "0101";
      } else {
        begin_date = "18510918";
      }

      if (this.state.end_date) {
        end_date = this.state.end_date + "1231"
      } else {
        end_date = Moment().format("YYYYMMDD");
      }


      API.getNewArticles(topic, begin_date, end_date)
        .then(res => {

          this.setState({
            toResults: true,
            results: res.data.response.docs
          });

        })
        .catch(err => console.log(err));
    }
  };

  render() {
    if (this.state.toResults) {
      return <Redirect to={{
        pathname: "/results",
        data: { results: this.state.results }
      }} />
    }
    return (
      <div>
        <Jumbotron>
          <h1 className="display-4">New York Times Article Scrubber</h1>
          <p className="lead">Search for and save articles of interest.</p>
          <hr className="my-4" />
          <p className="lead">
            <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
            <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Articles</Link>
          </p>
        </Jumbotron>
        <Container>
          <form>
            <Input
              value={this.state.topic}
              onChange={this.handleInputChange}
              name="topic"
              label="Topic"
              placeholder="Search Topic (required)"
            />
            <Input
              value={this.state.begin_date}
              onChange={this.handleInputChange}
              name="begin_date"
              label="Start Year"
              placeholder="YYYY format - e.g. '2017'"
            />
            <Input
              value={this.state.end_date}
              onChange={this.handleInputChange}
              name="end_date"
              label="End Year"
              placeholder="YYYY format - e.g. '2018'"
            />
            <FormBtn
              
              onClick={this.handleFormSubmit}
              className="btn btn-info"
            >
              Search
              </FormBtn>
          </form>
        </Container>
      </div>
    );
  }
}

export default Search;
