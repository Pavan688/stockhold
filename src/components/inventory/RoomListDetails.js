import { Link } from "react-router-dom"

export const RoomListDetails = ({ id, itemName, description, inventoryTypeId, AddToListbutton }) => {

    return <section className="inventory-item">
                <div>{itemName}</div>
                <div>{description}</div>
                <div>
                    <Link className="edit" to={`/inventory/${inventoryTypeId}/${id}`}>EDIT</Link>
                    <br></br> 
                    <button className="add-to-list-btn" value={id} onClick={AddToListbutton}>Add to List</button>
                </div>
    </section>

}