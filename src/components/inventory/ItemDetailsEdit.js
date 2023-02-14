import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

export const ItemDetailsEdit = () => {

    const {inventoryTypeId, inventoryid} = useParams()
    const [rooms, setRooms] = useState ([])
    const [item, updateItem] = useState({
        itemName: "",
        description: "",
        inventoryTypeId: 0
    })

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventories?_expand=inventoryType&inventoryTypeId=${inventoryTypeId}&id=${inventoryid}`)
            .then(res => res.json())
            .then((data) => {
                const singleItemObject = data[0]
                updateItem(singleItemObject)
            })
        },
        [inventoryTypeId,inventoryid]
    )

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventoryTypes`)
            .then(res => res.json())
            .then((roomsArray) => {
                setRooms(roomsArray)
            })
        },
        []
    )

    const navigate = useNavigate()

    const handleSaveButton = (event) => {
        event.preventDefault()

        const itemToSendToInventoryAPI = {
            id: item.id,
            itemName: item.itemName,
            description: item.description,
            inventoryTypeId: item.inventoryTypeId
        }

        return fetch(`http://localhost:8088/inventories/${item.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSendToInventoryAPI)
        })
            .then(res => res.json(itemToSendToInventoryAPI))
            .then(()=> {
                navigate("/inventory")
            })
    }

    return (
            <form className="itemForm">
                <h2 className="itemForm__title">Edit Item</h2>
                <fieldset>
                    <div className="item-group">
                        <label htmlFor="itemName">Item Name:</label>
                        <input
                            required autoFocus
                            type="text"
                            className="item-name"
                            value={item.itemName}
            
                            onChange={
                                (evt) => {
                                    const copy = {...item}
                                    copy.itemName = evt.target.value
                                    updateItem(copy)
                                }
                            } />
                    </div>
                </fieldset>
    
                <fieldset>
                    <div className="item-group">
                        <label htmlFor="description">Description:</label>
                        <input
                            required 
                            type="text"
                            className="item-description"
                            value={item.description}
                    
                            onChange={
                                (evt) => {
                                    const copy = {...item}
                                    copy.description = evt.target.value
                                    updateItem(copy)
                                }
                            } />
                    </div>
                </fieldset>
    
                <fieldset>
                    <div className="item-group">
                        <label htmlFor="roomdropdown">Select Room</label>
                        <select onChange={(evt) => {
                            const copy= {...item}
                                copy.inventoryTypeId = parseInt(evt.target.value) 
                                updateItem(copy)
            }}>
                        <option value={item.inventoryTypeId} type="select" className="form-control" required>Choose a Room</option>
                        {
                            rooms.map(
                                (room) => {
                                    return <option key={`room--${room.id}`} value={room.id}>{room.room}</option>
                                }
                            )
                        }
                        </select>
                    </div>
                </fieldset>
                
                <button 
                onClick={(clickEvent) => handleSaveButton(clickEvent)}
                className="saveItem-btn">
                    Save
                </button>
            </form>
    )
}