import React from "react";

export const VisualContext = React.createContext();

export const VisualProvider = ({children}) => {
    const [selectedStyle, setSelectedStyle] = React.useState("simple")
    const [colorSelected, setColorSelected] = React.useState("red")

    const [barHeight, setBarHeight] = React.useState(6)
    const [fft, setFft] = React.useState(1024)

    return (
        <VisualContext.Provider value={{
            selectedStyle, setSelectedStyle, colorSelected, setColorSelected, barHeight, setBarHeight, fft, setFft
        }}>
            {children}
        </VisualContext.Provider>
    )
}