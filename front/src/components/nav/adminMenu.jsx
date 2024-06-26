import { Link } from "react-router-dom";
import { PiBuildings } from "react-icons/pi";
import { TbMessage2 } from "react-icons/tb";

function AdminMenu() {
  return (
    <div className="flex flex-col gap-8 h-full bg-lightGrey font-medium text-[#7C8493] py-8">
      <h2 className="title text-black text-2xl ml-8">Mon compte</h2>
      <div>
        <Link to="/admin/entreprise/mentalworks" className="w-full flex gap-4 py-3 pl-8">
          <TbMessage2 className="size-6"/>
          <p>Messages</p>
        </Link>
        <Link to="/admin/entreprise/mentalworks" className="w-full flex gap-4 py-3 pl-8">
          <PiBuildings className="size-6"/>
          <p>Fiche entreprise</p>
        </Link>
      </div>
    </div>
  )
}

export default AdminMenu;
