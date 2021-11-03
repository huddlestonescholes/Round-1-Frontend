import React, { useState } from 'react';

export default function Cell (props) {
    const [selected, setSelected] = useState(false)
    
    return (       
        <div className={selected ? "cell active" : "cell"} id={props.id}>
	    </div>
        )
    }