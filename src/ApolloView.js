import React from 'react';
import gql from "graphql-tag";
import { Query } from "react-apollo";

const query = gql`
{
    movies (year: 2018) {
        id
        title
        cast {
            name
            id
        }
    }
}
`;

export default class RestView extends React.Component {
    render() {
        return (
            <Query query={query}>
                {({ loading, error, data }) => {
                    if (loading) return "Loading...";
                    if (error) return `Error! ${error.message}`;

                    return (
                        <ul>
                            {data.movies.map(item => (
                                <li key={item.id}>{item.title}</li>
                            ))}
                        </ul>
                    );
                }}
            </Query>
        );
    }
}
