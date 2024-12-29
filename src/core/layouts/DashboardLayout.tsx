import { Link } from "react-router-dom";
import { LayoutDashboard } from "lucide-react";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      {/* sidebar */}
      <div className="w-64 fixed flex flex-col left-0 top-0 h-full bg-slate-800">
        {/* links */}
        <div className="links">
          <div className="logo">
            <img src="" alt="" />
          </div>
          <div className="mt-6 text-md">
            <ul className="text-sm">
              <Link to="/overview" className="nav-link">
                <li
                  className="flex items-center text-white justify-start gap-6 cursor-pointer transition-all
                 py-3 pl-3 hover:bg-white hover:text-black active:bg-slate-500
                "
                >
                  <LayoutDashboard />
                  <span>Dashboard</span>
                </li>
              </Link>
            </ul>
          </div>
        </div>
        {/* footer */}
        <div className="footer"></div>
      </div>

      {/* content */}
      <div className="ml-64 flex-1">
        <div className="w-full bg-white p-10 h-full">{children}</div>
      </div>
    </div>
  );
};

export default DashboardLayout;
