import { createRoot } from "react-dom/client"
import "./index.css"
import { BrowserRouter } from "react-router-dom"
import { StockHold } from "./components/StockHold"


const container = document.getElementById("root")
const root = createRoot(container)
root.render(
    <BrowserRouter>
        <StockHold />
    </BrowserRouter>
)

