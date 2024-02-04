const SkeletonCard = () => {
    return ( 
        <div className="skeleton p-2 w-[183px] h-[306px] bg-slate-600">
            <div className="skeleton w-[167px] h-[250px] bg-slate-500" />
            <div className="skeleton mt-2 pb-1 pl-1 w-[80px] h-[20px] bg-slate-500" />
        </div>
    );
}
 
export default SkeletonCard;