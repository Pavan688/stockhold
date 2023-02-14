import { useEffect } from "react"
import { useState } from "react"
import "./StoreList.css"


export const StoreList = () => {
    const [storeList, setStoreList] = useState([])
    
    useEffect(
        () => {
            fetch(`http://localhost:8088/buyList?_expand=inventory`)
            .then(res => res.json())
            .then((buyListArray) => {
                setStoreList(buyListArray)
            })
        },
        []
        )
        
        const getList = () => {
            fetch(`http://localhost:8088/buyList?_expand=inventory`)
            .then(res => res.json())
            .then((buyListArray) => {
                setStoreList(buyListArray)
            })
        }
        
        const handleBoughtButton = (id) => {

        return <button onClick = {() => {
        fetch(`http://localhost:8088/buyList/${id}`, {
            method: "DELETE"
        })
            .then(()=> {
                getList()
            })
        }} className="btn-bought">Bought</button>
    }

    return <>
    <h2>Store List</h2>

    <article className="buyItems">
        {
            storeList.map(
                (item) => {
                    return <section className="item" key={`listItem--${item.id}`}>
                        <div>{item.inventory.itemName}</div>
                        <div>{item.inventory.description}</div>
                        {handleBoughtButton(item.id)}
                    </section>
                }
            )
        }
    </article>
    </>
}