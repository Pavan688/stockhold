import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import "./AddItem.css"


export const AddItem = () => {

    const [rooms, setRooms] = useState ([])
    const [item, updateAddItem] = useState({
        itemName: "",
        description: "",
        inventoryTypeId: 0
    })

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

    const handleAddItemButton = (event) => {
        event.preventDefault()
        

        const itemToSendToInventoryAPI = {
            itemName: item.itemName,
            description: item.description,
            inventoryTypeId: item.inventoryTypeId
        }

        return fetch(`http://localhost:8088/inventories`, {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(itemToSendToInventoryAPI)
        })
        .then(res => res.json())
        .then(() => {
            navigate("/inventory")
        })
    
    }

    return (
    <>
        <h2 className="itemForm__title">New Item Form</h2>
        <form className="itemForm">
            <fieldset>
                <div className="item-group">
                    <label htmlFor="itemName">Item Name:</label>
                    <input
                        required autoFocus
                        type="text"
                        className="item-name"
                        placeholder="Enter Item Name"
        
                        onChange={
                            (evt) => {
                                const copy = {...item}
                                copy.itemName = evt.target.value
                                updateAddItem(copy)
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
                        placeholder="Brief description of item"
                
                        onChange={
                            (evt) => {
                                const copy = {...item}
                                copy.description = evt.target.value
                                updateAddItem(copy)
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
                            updateAddItem(copy)
        }}>
                    <option value={0} type="select" className="form-dropdown" required>Choose a Room</option>
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
            onClick={(clickEvent) => handleAddItemButton(clickEvent)}
            className="addItem-btn">
                Add Item
            </button>
        </form>
    </>
    )
}