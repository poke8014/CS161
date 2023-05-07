import React from "react";
import "./Menu.css"

export default function Menu({ menuItems, selected, setSelected, uploadedFile }){

    const [lastItemAdded, setLastItemAdded] = React.useState(false);

    React.useEffect(() => {
        if (menuItems.length > 6 && !lastItemAdded) {
            setSelected(menuItems[menuItems.length - 1]);
            setLastItemAdded(true);
        }
        return(() => {
            setLastItemAdded(false)
        })
    }, [menuItems, uploadedFile]);    

    const renderMenuItems = menuItems?.map((item, index) => (
        <p
        key={item[0] + index}
        className={item === selected ? "selected" : ""}
        onClick={() => setSelected(item)}
        >
        {item[0]}
        </p>
    ));

    return (
        <div className="menu">
            <div className="audios">Click on an existing audio</div>
            {renderMenuItems}
        </div>
    )
}