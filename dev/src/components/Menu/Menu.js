import React from "react";
import "./Menu.css"

export default function Menu({ menuItems, selected, setSelected }){

    const [lastItemAdded, setLastItemAdded] = React.useState(false);

    React.useEffect(() => {
        if (menuItems.length > 6 && !lastItemAdded) {
        setSelected(menuItems[menuItems.length - 1]);
        setLastItemAdded(true);
        }
    }, [menuItems, selected, setSelected, lastItemAdded]);

    const renderMenuItems = menuItems?.map((item) => (
        <p
        key={item}
        className={item === selected ? "selected" : ""}
        onClick={() => setSelected(item)}
        >
        {item}
        </p>
    ));

    return (
        <div className="menu">
            <div className="audios">Click on an existing audio</div>
            {renderMenuItems}
        </div>
    )
}