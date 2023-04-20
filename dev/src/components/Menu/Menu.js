import React, { useState, useEffect } from "react";
import "./Menu.css"

export default function Menu({ menuItems, onSelect, selectedFile }){
    
    const [selectedItem, setSelectedItem] = useState(null);

    useEffect(() => {
        setSelectedItem(selectedFile);
    }, [selectedFile]);

    const handleClick = (item) => {
        // ignore clicks on first item
        if (item === menuItems[0]) {
            return;
        }
        setSelectedItem(item);
        onSelect(item);
    }

    const renderMenuItems = menuItems.map(item => {
        const className = selectedItem === item ? "selected" : "";
        return (
            <p key={item} className={className} onClick={() => handleClick(item)}>
                {item}
            </p>
        );
    });

    return (<div className="menu">{renderMenuItems}</div>
    )
}