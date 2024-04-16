import { Combobox } from "react-widgets";

function Searchbar() {
    const cities = [
        { id: 0, name: 'Paris'},
        { id: 1, name: 'Marseille'},
        { id: 2, name: 'Lille' },
        { id: 3, name: 'Toulouse' },
      ];

    return (
        <div className="flex flex-row gap-5 bg-slate-50 px-8 py-2 max-w-3xl items-center">

            <div className="flex flex-row gap-2 items-start">
                <div> icon </div>
                <input name="search" className="border-b-2 border-slate-700 text-grey h-8" placeholder="Saisissez un mot clé..."></input>
            </div>

            <div className="flex flex-row gap-2">
                <div> icon </div>
                <Combobox
                    data={cities}
                    dataKey="id"
                    textField="name"
                    placeholder="Sélectionner une ville"
                />
            </div> 
            
            <button className="bg-darkBlue px-6 py-2 text-white"> Rechercher </button>
        </div>
    );
}

export default Searchbar;
