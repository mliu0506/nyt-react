import axios from "axios";

export default {
  // Searches the NYT according to the search criteria given in the form
  getNewArticles: function(topic, begin_date, end_date) {
    return axios.get(`https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=c133bd2c740147f58ccc6b561a9d3b63&query=${topic}&begin_date=${begin_date}&end_date=${end_date}`);
  },
  // Gets saved Articles
  getSavedArticles: function() {
    return axios.get("/api/articles/");
  },
  // Deletes the Article with the given id
  deleteArticle: function(id) {
    return axios.delete("/api/articles/" + id);
  },
  // Saves a Article to the database
  saveArticle: function(articleData) {
    return axios.post("/api/articles", articleData);
  }
};
