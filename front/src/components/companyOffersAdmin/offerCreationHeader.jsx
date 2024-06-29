import { FaSuitcase } from "react-icons/fa";
import { SlNotebook } from "react-icons/sl";
import { FaGift } from "react-icons/fa";

const offerCreationHeader = ({currentStep}) => {

  return (
    <div className="my-6">
        <h2 className="text-4xl mb-10">Publier une offre</h2>
        <div className="border border-borderGrey flex flex-row flex-nowrap justify-around p-5 rounded-md">
            {currentStep == 1 &&(
                <div className="flex flex-row flex-nowrap gap-4">
                    <div className="bg-primary p-6 rounded-full">
                        < FaSuitcase className="w-auto h-7 text-white" />
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                        <p className="text-primary"> Étape 1/3 </p>
                        <p className="text-xl">Type d'offre</p>
                    </div>
                </div>
            ) || (
                <div className="flex flex-row flex-nowrap gap-4">
                    <div className="bg-[#E9EBFD] p-6 rounded-full">
                        < FaSuitcase className="w-auto h-7 text-[#7C8493]" />
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                        <p className="text-[#A8ADB7]"> Étape 1/3 </p>
                        <p className="text-xl text-[#7C8493]">Type d'offre</p>
                    </div>
                </div>
            )}

            <div className="border-r border-borderGrey"></div>
            
            {currentStep == 2 && (
                <div className="flex flex-row flex-nowrap gap-4">
                    <div className="bg-primary p-6 rounded-full">
                        < SlNotebook className="w-auto h-7 text-white" />
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                        <p className="text-[primary"> Étape 2/3 </p>
                        <p className="text-xl">Description</p>
                    </div>
                </div>
            ) || (
                <div className="flex flex-row flex-nowrap gap-4">
                    <div className="bg-[#E9EBFD] p-6 rounded-full">
                        < SlNotebook className="w-auto h-7 text-[#7C8493]" />
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                        <p className="text-[#A8ADB7]"> Étape 2/3 </p>
                        <p className="text-xl text-[#7C8493]">Description</p>
                    </div>
                </div>
            )}

            <div className="border-r border-borderGrey"></div>

            {currentStep == 3 && (
                <div className="flex flex-row flex-nowrap gap-4">
                    <div className="bg-primary p-6 rounded-full">
                        < FaGift className="w-auto h-7 text-white" />
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                        <p className="text-primary"> Étape 3/3 </p>
                        <p className="text-xl">Publication</p>
                    </div>
                </div>
            ) || (
                <div className="flex flex-row flex-nowrap gap-4">
                    <div className="bg-[#E9EBFD] p-6 rounded-full">
                        < FaGift className="w-auto h-7 text-[#7C8493]" />
                    </div>
                    <div className="pt-1 flex flex-col gap-2">
                        <p className="text-[#A8ADB7]"> Étape 3/3 </p>
                        <p className="text-xl text-[#7C8493]">Publication</p>
                    </div>
                </div>
            )}
        </div>
    </div>
  )
};

export default offerCreationHeader;
