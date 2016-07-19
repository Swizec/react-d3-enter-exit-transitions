
import React, { Component } from 'react';
import ReactTransitionGroup from 'react-addons-transition-group';

import Letter from './Letter';

class FancyText extends Component {
    render() {
        let { x, y } = this.props;

        console.log(this.props);

        return (
            <g transform={`translate(${x}, ${y})`}>
                <ReactTransitionGroup component="g">
                    {this.props.text.split('').map((l, i) =>
                        <Letter letter={l} i={i} key={i} />
                     )}
                </ReactTransitionGroup>
            </g>
        );
    }
}

export default FancyText;
