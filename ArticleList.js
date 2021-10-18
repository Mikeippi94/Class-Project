//news api articles
import React from "react";
import { List } from "semantic-ui-react";

const ArticleItem = (props) => {
  const { article } = props;
  return <List.Item>{article.title}</List.Item>;
};

const ArticleList = (props) => {
  return (
    <List divided style={{ maxWidth: 900, margin: "0 auto" }}>
      {props.articles.map((article, index) => (
        <ArticleItem article={article} key={article.title + index} />      
        ))}
    </List>
  );
};

export default ArticleList;