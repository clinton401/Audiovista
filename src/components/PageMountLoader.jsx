
import logo from "../assets/logo.png";

function PageMountLoader() {
  return (
    <section className="w-full bg-primary min-h-dvh ipad:max-h-[900px] px-[2.5%] py-4 flex-col flex items-center  gap-2 justify-center">
       <img src={logo} alt="logo" className="aspect-square w-[45px]" />
<div className="newtons-cradle">
<div className="newtons-cradle__dot"></div>
<div className="newtons-cradle__dot"></div>
<div className="newtons-cradle__dot"></div>
<div className="newtons-cradle__dot"></div>
</div>
    </section>
  )
}

export default PageMountLoader
