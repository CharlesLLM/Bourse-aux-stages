import { Combobox } from "react-widgets";
import {useEffect, useMemo, useState} from "React";

function Searchbar() {
    const [cities, setCities] = useState([]);

    useEffect(() => {
        try{
            fetch(`https://geo.api.gouv.fr/communes?fields=nom,code,codesPostaux`).then(res =>res.json().then(a =>setCities(a)))
        } catch(error) {
            console.log("Erreur: " + error);
        }
    }, []);

    return (
        <div className="flex flex-row gap-5 bg-slate-50 px-8 py-2 max-w-3xl items-center">

            <div className="flex flex-row gap-2 items-start">
                <div> icon </div>
                <input name="search" className="border-b-2 border-slate-700 text-grey h-8" placeholder="Saisissez un mot clé..."></input>
            </div>

            <div className="flex flex-row gap-2">
                <div> icon </div>
                {cities.length === 0 ? (
                    <Combobox busy placeholder="Chargement..." />
                ) : (
                    <Combobox
                        data={cities}
                        dataKey="code"
                        textField="nom"
                        //textField={item => typeof item === 'string' ? item : item.nom + ' ' + item.codepostaux}
                        placeholder="Sélectionner une ville"
                        filter='contains'
                    />
                )}
            </div> 
            
            <button className="bg-darkBlue px-6 py-2 text-white"> Rechercher </button>
        </div>
    );
}

export default Searchbar;
