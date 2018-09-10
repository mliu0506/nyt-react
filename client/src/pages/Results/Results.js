import React, { Component } from "react";
import { Link } from 'react-router-dom';
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import ArticleBtn from "../../components/ArticleBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import Moment from 'moment';

class Results extends Component {
  state = {
    articles: [],
    target: "",
    noResults: false
  };

  componentDidMount() {
    const data = this.props.location.data
    if (data && data.results.length > 0) {

      this.setState({
        articles: data.results.filter((value, index) => index < 5),
        target: "_blank"
      });
    } else {
      this.setState({
        noResults: true
      });
    }
  }

  saveArticle = article => {
    API.saveArticle(article)
      .then(res => {
        const currentArticles = this.state.articles;
        const filterArticles = currentArticles.filter(article => article._id !== res.data._id);
        this.setState({
          articles: filterArticles
        });
      })
      .catch(err => console.log(err));
  }

  render() {
    if (this.state.noResults) {
      return (
        <div>
          <Jumbotron>
            <h1 className="display-4">New York Times Article Scrubber</h1>
            <p className="lead">Search for and annotate articles of interest.</p>
            <hr className="my-4" />
            <p className="lead">
              <Link className="btn btn-default btn-lg" to="/" role="button">New Search</Link>
              <Link className="btn btn-default btn-lg" to="/saved" role="button">Saved Articles</Link>
            </p>
          </Jumbotron>
          <Container>
            <Link to="/">No results - click here to search again.</Link>
          </Container>
        </div>
      )
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
          <h2>Search Results</h2>
          <List>
            {this.state.articles.map((article, index) => (
              <ListItem key={article._id}>
                <div className="date-div">
                  <a
                    key={"" + index + article._id}
                    href={article.web_url}
                    target={this.state.target}
                  >
                    {article.headline.main}
                  </a>
                  <p className="pub-date">{Moment(article.pub_date).format('MMM Do YYYY, h:mm a')}</p>
                </div>
                <div className="article-btn-div">
                  <ArticleBtn
                    key={"" + article._id + index}
                    btntype="info"
                    disabled={article.web_url === "/"}
                    onClick={() => this.saveArticle({
                      title: article.headline.main,
                      date: article.pub_date,
                      url: article.web_url,
                      _id: article._id
                    })}
                  >
                    Save
                </ArticleBtn>
                </div>
              </ListItem>
            ))}
          </List>
        </Container>
      </div>
    );
  }
}

export default Results;
