import Navbar from "../../components/admin/Navbar.jsx";
import Sidebar from "../../components/admin/Sidebar.jsx";
import JavaScriptClient from "../../components/JavaScriptClient/JavaScriptClient.jsx";

const AdminLayout = ({ children }) => {
    return (
        <div className="bg-[var(--secondary-color)] dark:bg-[var(--dark-bg)]">
            <Sidebar />
            <Navbar />
            {children}
            <JavaScriptClient/>
        </div>
    );
};

export default AdminLayout;
