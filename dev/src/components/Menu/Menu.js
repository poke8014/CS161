import "./Menu.css"

export default function Menu({menuItems}){

    const renderMenuItems = menuItems.map(item => {
        return <p key={item}>{item}</p>
    });

    return (
        <div className="menu">
            {renderMenuItems}
        </div>
    )
}