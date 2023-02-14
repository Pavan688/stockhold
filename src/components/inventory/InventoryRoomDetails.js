import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { RoomListDetails } from "./RoomListDetails"

export const InventoryRoomDetails = () => {
    const {inventoryTypeId} = useParams()
    const [roomList, updateRoomList] = useState([])
    const [addItemToList, updateAddItemTolist] = useState({
        userId: 0,
        inventoryId: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventories?_expand=inventoryType&inventoryTypeId=${inventoryTypeId}`)
            .then(res => res.json())
            .then((data) => {
                const singleItemObject = data
                updateAddItemTolist(singleItemObject)
            })
        },
        [inventoryTypeId]
    )


    useEffect(
        () => {
            fetch(`http://localhost:8088/inventories?_expand=inventoryType&inventoryTypeId=${inventoryTypeId}`)
            .then(response => response.json())
            .then((roomData) => {
                const singleRoomList = roomData
                updateRoomList(singleRoomList)
            })
        },
        [inventoryTypeId]
    )
    const localStockUser = localStorage.getItem("stock_user")
    const stockUserObject = JSON.parse(localStockUser)
    

    const handleAddToListbutton = (event) => {
        event.preventDefault()
        const findItem = (addItemArray) => {
            let itemObject = {}
            for (const item of addItemArray) {
                if(parseInt(event.target.value) === item.id) {
                    itemObject = item
                    return itemObject
                }
            }
        }
        const eachItem = findItem(addItemToList)
        console.log(eachItem)
        
        const itemToSendToBuylistAPI = {
            userId:  stockUserObject.id,
            inventoryId: eachItem.id
        }
        
        return fetch(`http://localhost:8088/buyList`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSendToBuylistAPI)
        })
        .then(res => res.json())
        .then(() => {
            
        })

    }

    return <article className="items">
        {
            roomList.map(list => <RoomListDetails key={`item--${list.id}`}
            id={list.id}
            itemName={list.itemName}
            description={list.description}
            inventoryTypeId={list.inventoryTypeId}
            AddToListbutton= {(clickEvent) => handleAddToListbutton(clickEvent)} />
            
            )
        }
    </article>
}

