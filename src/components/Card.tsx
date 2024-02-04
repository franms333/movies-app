type CardProps = {
    title: string,
    poster: string
}

const Card = ({title, poster}: CardProps) => {
// const Card = () => {
    return ( 
        <div className="group p-2 bg-slate-600 rounded-xl max-w-56 transition-colors duration-200 cursor-pointer hover:bg-slate-700">
            <img src={poster} alt="Title" className="rounded-lg"/>
            <p className="pt-2 pb-1 pl-1 font-bold text-lg transition-colors duration-200 group-hover:text-gray-300">{title}</p>
        </div>
    );
}
 
export default Card;