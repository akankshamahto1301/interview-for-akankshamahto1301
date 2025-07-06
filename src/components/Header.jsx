import Logo from "../assets/Logo.png"

const Header = () => {
  return (
    <header className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center py-6">
          <img src={Logo} className="h-10" />
        </div>
      </div>
    </header>
  )
}

export default Header

