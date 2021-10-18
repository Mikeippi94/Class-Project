import React from 'react';
import { getUser, resetUserSession} from './service/AuthService';
import { getArticles } from "./api";
import ArticleList from "./components/articlesList";
import SearchBar from "./components/searchBar";
import { Container, Header } from "semantic-ui-react";


  
const Premium = (props) => {
    const user = getUser();
    const name = user !== 'undefined' && user ? user.name : '';

    const logoutHandler = () => {
        resetUserSession();
        props.history.push('/login');
    }
    return (
        <div>
            Hello {name}! Welcome to your personal News hangout <br />
            <input type="button" value="Logout" onClick={logoutHandler} />
        </div>

    )
}

export default Premium;


