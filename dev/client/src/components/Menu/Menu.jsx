import React from "react";
import "./Menu.css"

export default function Menu({ menuItems, selected, setSelected, uploadedFile }){

    React.useEffect(() => {
        if (uploadedFile){
            if (menuItems.length > 5) {
                lastSelected()
            }
        }
    }, [menuItems, uploadedFile]);    

    function lastSelected(){
        setSelected(menuItems[menuItems.length - 1]);
    }

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