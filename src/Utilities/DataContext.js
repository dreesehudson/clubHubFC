import React, { useState, useContext } from 'react';
import { axiosHelper } from './axiosHelper';

const DataContext = React.createContext({});

export const AppProvider = (props) => {
    const initialContext = DataHelper()
    return (
        <DataContext.Provider value={initialContext}>
            {props.children}
        </DataContext.Provider>
    )
}

export default DataContext;
export const useData = () => useContext(DataContext);


function DataHelper() {
    const [data, setData] = useState("");
    
    function saveData(newData){
        setData(newData)
        window.localStorage.setItem('data', newData)
    }
    
    return {
        data, saveData
    };

}