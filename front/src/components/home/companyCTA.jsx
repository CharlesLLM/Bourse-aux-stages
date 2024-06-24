import Button from "../utils/button.jsx";

function CompanyCTA(){
  return (
    <div className="w-full px-32 pt-8">
      <div className={`relative overflow-hidden flex flex-col md:flex-row items-center justify-center bg-primary w-full space-x-4`}
          style={{clipPath: "polygon(20% 0, 100% 0, 100% 85%, 80% 100%, 0 100%, 0 15%)"}}>
        <div className={`flex flex-col px-16 md:px-2 space-y-6 mt-6 w-full  md:pt-0 md:w-[30vw]`}>
          <h3 className={`text-3xl lg:text-4xl font-bold text-white`}>Entreprises, déposez vos offres gratuitement</h3>
          <p className={`text-white text-sm lg:text-md`}>Vous pourrez gérer votre planning d'accueil et bénéficier de nombreux service intégrés</p>
          <Button text={"Créez votre compte"} path={"/inscription"} />
        </div>
        <div className="pt-12 md:pt-16">
          <img src="/home/dashboardCompany.svg" className={` w-full md:w-[45vw]`} alt="dashboard Company" />
        </div>
      </div>
    </div>
  )
}

export default CompanyCTA;
