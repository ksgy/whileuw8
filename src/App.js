import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
    const inputRef = useRef();
    const LS = 'whileuw8_things';

    const [things, addThing] = useState([]);
    const [newThing, setNewThing] = useState('');

    useEffect(() => {
        const localStorageThings = JSON.parse(localStorage.getItem(LS)) || [];
        addThing(localStorageThings);
    }, []);

    useEffect(
        () => {
            inputRef.current.focus();
        },
        [inputRef]
    );

    const addThingHandler = e => {
        if (e.which === 13) {
            const newThings = [
                ...things,
                newThing
            ];
            addThing(newThings);
            setNewThing('');
            localStorage.setItem(LS, JSON.stringify(newThings));
        }
    }

    const renderNewThings = things.map((thing, index) => {
        return <div key={index.toString() + thing}>{thing}</div>
    })

    return (
        <div>
            <h1>while you wait for covid to end</h1>
            <h2>plan your next adventure/whatever once it's end!</h2>
            <input
                ref={inputRef}
                type="text"
                placeholder="I want to..."
                onKeyPress={addThingHandler}
                value={newThing}
                onChange={e => setNewThing(e.target.value)} />
            {renderNewThings}
        </div>
    );
}
export default App;
