import { Combobox } from "react-widgets";
import {useEffect, useState} from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { LuMapPin } from "react-icons/lu";

function Searchbar() {
    const [cities, setCities] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        try {
            fetch(`https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux&limit=10`)
                .then(res =>res.json()
                .then(a =>{
                    setCities(a);
                    setLoading(false);
            }));
        } catch(error) {
            console.log("Erreur: " + error);
            setLoading(false);
        }
    }, []);

    const handleSearchInputChange = (value) => {
        setLoading(true);
        if (value != ""){
            fetch(`https://geo.api.gouv.fr/communes?nom=${value}&fields=nom,code,codesPostaux&boost=population&limit=10'`)
                .then(res =>res.json()
                .then(a =>{
                    setCities(a);
                    setLoading(false);
                }));
        } else {
            fetch(`https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux&limit=10`)
                .then(res =>res.json()
                .then(a =>{
                    setCities(a);
                    setLoading(false);
                }));
        }
    };


    return (
        <div className="flex flex-col md:flex-row gap-5 bg-white px-4 py-2 w-full lg:w-max items-center flex-wrap lg:flex-nowrap">
            <div className="flex flex-row gap-2 items-start w-full">
                <div ><HiMagnifyingGlass className="w-6 h-6 mt-1" /></div>
                <input name="search" className="border-b-2 border-slate-700 text-grey h-8 w-full md:min-w-48" placeholder="Saisissez un mot clé..." />
            </div>

            <div className="flex flex-row gap-2 items-start w-full">
                <div>< LuMapPin className="w-6 h-6 mt-2" /></div>
                {cities.length === 0 ? (
            <div className="flex flex-row gap-2">
                <div> icon </div>
                {loading && (
                    <Combobox busy placeholder="Chargement..." />
                ) || (
                    <Combobox
                        data={cities}
                        dataKey="code"
                        textField="nom"
                        placeholder="Sélectionner une ville"
                        filter='contains'
                        onChange={handleSearchInputChange}
                    />
                )}
            </div> 
            
            <button className="bg-primary px-6 py-2 text-white w-full">Rechercher</button>
        </div>
    );
}

export default Searchbar;
