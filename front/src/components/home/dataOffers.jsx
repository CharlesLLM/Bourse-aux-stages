import { Combobox } from "react-widgets";
import {useEffect, useState} from "react";

function dataOffers() {
    const nbStages = 234;
    const nbAlternances = 59;
    return (
        <div className="mt-2 text-[#25324B]">
            <p> 
                <span className="text-secondary">{nbStages}</span> offres de <span className="font-bold">stages</span> | 
                <span className="text-secondary"> {nbAlternances}</span> offres <span className="font-bold">d'alternances</span> n'attendent que vous !
            </p>
        </div>
    );
}

export default dataOffers;
