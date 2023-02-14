import { useEffect, useState } from "react"
import "./Inventory.css"
import { Rooms } from "./Rooms"

export const InventoryRooms = () => {
    const [rooms, setRooms] = useState([])

    useEffect(
        () => {
            fetch(`http://localhost:8088/inventoryTypes`)
            .then(response => response.json())
            .then((roomsArray) => {
                setRooms(roomsArray)
            })
        },
        []
    )

    return<>
     <h2>Select a Room</h2>
    <article className="rooms">
    {
        rooms.map(room => <Rooms key={`room--${room.id}`}
        id={room.id}
        room={room.room} />
        )
    }
    </article>
    </>
}