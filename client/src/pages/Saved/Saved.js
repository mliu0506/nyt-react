import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import ArticleBtn from "../../components/ArticleBtn";
import Moment from 'moment';

class Saved extends Component {
  state = {
    articles: [],
    target: "",
    noResults: false
  };

  componentDidMount() {
    this.getSavedArticles();
  }

  getSavedArticles = () => {
    API.getSavedArticles()
      .then(res => {
        if (res.data.length > 0) {
          this.setState({
            articles: res.data,
            target: "_blank"
          });
        } else {
          this.setState({
            noResults: true
          });
        }

      })
      .catch(err => console.log(err));
  }

  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.getSavedArticles())
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
            <Link to="/">You have no saved articles. Click here to find some.</Link>
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
          <h2>Saved Articles</h2>
          <List>
            {this.state.articles.map(article => (
              <ListItem key={article._id}>
                <div className="date-div">
                  <a
                    key={article._id + "link"}
                    href={article.url}
                    target={this.state.target}
                  >
                    {article.title}
                  </a>
                  <p className="pub-date">{Moment(article.pub_date).format('MMM Do YYYY, h:mm a')}</p>
                </div>
                <div className="article-btn-div">
                  <ArticleBtn
                    key={article._id + "btn"}
                    btntype="info"
                    id={article._id}
                    disabled={article.url === "/"}
                    onClick={() => this.deleteArticle(article._id)}
                  >
                    Delete
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

export default Saved;
