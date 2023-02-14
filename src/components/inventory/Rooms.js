import { Link } from "react-router-dom"

export const Rooms = ({ room, id }) => {
    return <section className="room">
                <div>
                    <Link className="room-link" to={`/inventory/${id}`}>{room}</Link>
                </div>

    </section>
}