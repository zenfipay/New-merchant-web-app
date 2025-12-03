import AddNewStaff from "./AddNewStaff";
import ViewRoles from "./ViewRoles";

export default function StaffAndRoles() {


    return (
        <div className="px-4">
            <header className="w-full flex justify-between items-center">
                <h2 className="w-3/4 font-semibold text-[19px] text-[#212121]">
                    Manage your staff
                </h2>
                {/* BUTTONS */}
                <div className="w-1/4 flex">
                    <ViewRoles />
                    <AddNewStaff />
                </div>
            </header>
        </div>
    )
}