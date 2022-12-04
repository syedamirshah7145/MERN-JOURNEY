import {genres} from "../assets/constants";
const Discover = () =>{
    const genreTitle = "pop";
    return (
        //main flexbox showing items vertically
        <div className="flex flex-col">

            <div className="w-full flex justify-between items-center sm:flex-row flex-col mt-1 mb-10">
                <h2 className="font-bold text-3xl text-white text-left">
                    Discover {genreTitle}
                </h2>
                <select
                onChange={() => {}}
                value=""
                className="bg-black text-gray-300 text-sm p-3 rounded-lg outline-none sm:mt-0 mt-5"
                >
                {genres.map((genre) => {
                    return(
                        <option key={genre.value} value={genre.value}>{genre.title}</option>
                    )
                })}
                </select>
            </div>

            <div ></div>
    
        </div>
    )
}



    export default Discover;
