import React from 'react';
import { Button } from 'react-bootstrap';

export default class RestView extends React.Component {
    render() {
        return (
            <div>
                RestView!
                <Button bsStyle="info" bsSize="large">Hello!</Button>
            </div>
        );
    }
}
