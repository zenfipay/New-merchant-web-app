import Image from "next/image"

export default function  SearchBar() {
    return (
        <div className="relative w-[205px] h-8 flex items-center gap-1 p-1.5 rounded-lg ring ring-[#EEEEEE]">
            <Image src="/icons/searchIcon.svg" alt="search icon" width={18} height={18} className="" />
            <input
                type="text"
                placeholder="Search via ID..."
                className="h-fit focus:outline-none"
            />
        </div>
    )
}