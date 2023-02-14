import { Outlet, Route, Routes } from "react-router-dom"
import { InventoryRooms } from "../inventory/InventoryRooms"
import { InventoryRoomDetails } from "../inventory/InventoryRoomDetails"
import { StoreList } from "../storeList/StoreList"
import { AddItem } from "../../addItem/AddItem"
import { ItemDetailsEdit } from "../inventory/ItemDetailsEdit"
import { HomePage } from "../../home/HomePage"

export const ApplicationViews = () => {
	return (
		<Routes>
			<Route path="/" element={
				<>
					<h1>StockHold</h1>

					<Outlet />
				</>
			}>

				<Route path="home" element={ <HomePage /> } />
				<Route path="inventory" element={ <InventoryRooms /> } />
				<Route path="storeList" element={ <StoreList /> } />
				<Route path="addItem" element={ <AddItem /> } />
				<Route path="inventory/:inventoryTypeId" element={ <InventoryRoomDetails /> } />
				<Route path="inventory/:inventoryTypeId/:inventoryid" element={ <ItemDetailsEdit /> } />
			</Route>
		</Routes>
	)
}

