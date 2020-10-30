
import React, { useState } from "react";

const Home = () => {
    const [name, setName] = useState("world");
    return (
        <div>
            <p>Hello {name}!</p>
            <p>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            </p>
        </div>
    );
};

export default Home;