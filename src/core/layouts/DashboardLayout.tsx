import {NavLink} from "react-router-dom";
import {File, LayoutDashboard, Plus} from "lucide-react";

const DashboardLayout = ({children}: { children: React.ReactNode }) => {
    return (
        <div className="flex h-screen">
            {/* sidebar */}
            <div className="w-64 fixed flex flex-col left-0 top-0 h-full bg-white">
                {/* links */}
                <div className="links">
                    <div className="logo bg-white p-4">
                        <img src="/images/logo.svg" alt="Logo"/>
                    </div>
                    <div className="mt-6 text-md">
                        <ul className="text-sm p-4">
                            <NavLink to="/overview" className={({isActive}: { isActive: boolean }) => `block text-[#586380] font-bold  cursor-pointer transition-all
                 hover:bg-[#e7edee] rounded-lg mb-2 hover:text-black active:bg-slate-500 ${isActive ? "bg-[#edefff] text-[#4255ff]" : ""}`}>
                                <li className={`flex items-center justify-start w-full gap-6 py-2 pl-6`}>
                                    <LayoutDashboard/>
                                    <span>Dashboard</span>
                                </li>
                            </NavLink>
                            <NavLink to="/my-collections" className={({isActive}: { isActive: boolean }) => `block text-[#586380] font-bold  cursor-pointer transition-all
                 hover:bg-[#e7edee] rounded-lg mb-2  hover:text-black active:bg-slate-500 ${isActive ? "bg-[#edefff] text-[#4255ff]" : ""}`}>
                                <li className={`flex items-center justify-start w-full gap-6 py-2 pl-6`}>
                                    <File/>
                                    <span>My collections</span>
                                </li>
                            </NavLink>
                            <NavLink to="/flashcard-sets/create" className={({isActive}: { isActive: boolean }) => `block text-[#586380] font-bold  cursor-pointer transition-all
                 hover:bg-[#e7edee] rounded-lg hover:text-black active:bg-slate-500 ${isActive ? "bg-[#edefff] text-[#4255ff]" : ""}`}>
                                <li className={`flex items-center justify-start w-full gap-6 py-2 pl-6`}>
                                    <Plus/>
                                    <span>Create study set</span>
                                </li>
                            </NavLink>
                        </ul>
                    </div>
                </div>
                {/* footer */}
                <div className="footer"></div>
            </div>

            {/* content */}
            <div className="ml-64 flex-1">
                <div className="w-full bg-[#e7edee] p-10 min-h-svh">{children}</div>
            </div>
        </div>
    );
};

export default DashboardLayout;
