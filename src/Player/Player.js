import React from 'react';

const player = (props) => {
    return <ul key={props.index}> Player
						<li>Name: {props.set.name} </li>
        <li> Last name: {props.set.lastName} </li>
        <li> Free Throws: {props.set.freeThrows} </li>
        <li> Points: {props.set.points} </li>
    </ul>
}

export default player;