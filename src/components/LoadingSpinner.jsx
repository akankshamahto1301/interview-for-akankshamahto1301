import Loader from "../assets/Loader.png"


const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center py-12">
      <img src={Loader} alt="Loading..." className="w-12 h-12 animate-spin-360" />
    </div>
  )
}

export default LoadingSpinner

