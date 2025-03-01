
import { PulseLoader } from "react-spinners";
 
export const Spinner = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
    <div className=" ">

        <div className=" mb-10  flex justify-center items-center">
             <PulseLoader color="white" />
        </div>

        <p className="mt-4 text-xl font-semibold text-white-700"> </p>
    </div>
</div>
  )
}
