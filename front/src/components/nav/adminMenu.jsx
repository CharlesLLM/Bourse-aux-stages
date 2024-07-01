import { Link } from "react-router-dom";
import { PiBuildings } from "react-icons/pi";
import { TbMessage2, TbSettings } from "react-icons/tb";
import { IoMdPeople } from "react-icons/io";
import { LuClipboardList } from "react-icons/lu";
import PropTypes from 'prop-types';

function AdminMenu({ admin }) {
  return (
    <div className="flex flex-col gap-8 h-full bg-lightGrey font-medium text-[#7C8493] py-8 border-r border-borderGrey">
      <Link to="/admin">
        <h2 className="title text-black text-2xl ml-8">Mon compte</h2>
      </Link>
      <div className="pl-8 pr-4">
        <Link to={`/admin`} className="flex items-center gap-4 py-3">
          <TbMessage2 className="size-6"/>
          <p>Messages</p>
        </Link>
        <Link to={`/admin/entreprise/${admin.company.slug}`} className="flex items-center gap-4 py-3">
          <PiBuildings className="size-6"/>
          <p>Fiche entreprise</p>
        </Link>
        <Link to={`/admin`} className="flex items-center gap-4 py-3">
          <IoMdPeople className="size-6" />
          <p>Candidatures</p>
        </Link>
        <Link to={`/admin/offres`} className="flex items-center gap-4 py-3">
          <LuClipboardList className="size-6" />
          <p>Offres</p>
        </Link>
      </div>
      <hr className="h-px bg-borderGrey" />
      <div className="pl-8 pr-4 space-y-5">
        <Link to="/admin" className="flex items-center gap-4">
          <TbSettings className="size-6"/>
          <p>Paramètres</p>
        </Link>
        {/* Admin picture + name */}
        <Link to="/admin/profil" className="flex items-center gap-4 py-3">
          <img src={admin.picture} alt="Admin" className="w-12 h-12 rounded-full"/>
          <div>
            <p className="text-black text-lg font-semibold">{admin.user.firstName} <span className="uppercase">{admin.user.lastName}</span></p>
            <p className="text-textGrey text-sm">Administrateur</p>
          </div>
        </Link>
      </div>
    </div>
  )
}

AdminMenu.propTypes = {
  admin: PropTypes.shape({
    picture: PropTypes.string,
    user: PropTypes.shape({
      firstName: PropTypes.string,
      lastName: PropTypes.string
    }),
    company: PropTypes.shape({
      slug: PropTypes.string.isRequired
    }).isRequired
  }).isRequired
}

export default AdminMenu;
