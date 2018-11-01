import React from 'react';

const url = 'http://localhost:4000/graphql?';
const query = ``;
export default class RestView extends React.Component {
    state = { movies: undefined }
    componentDidMount() {
        fetch(`${url}`, {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json; charset=utf-8",
            },
            body: JSON.stringify({
                query: `{
                        movies (year: 2018) {
                            id
                            title
                            cast {
                                name
                                id
                            }
                        }
                    }
                `
            }),
        })
        .then(response => response.json())
        .then(data => this.setState({ movies: data.data.movies }));
    }
    render() {
        const { movies = [] } = this.state;
        return (
            <ul>
                {movies.map(item => (
                    <li key={item.id}>{item.title}</li>
                ))}
            </ul>
        );
    }
}
