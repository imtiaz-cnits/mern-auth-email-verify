import Navbar from "../../components/admin/Navbar.jsx";
import Sidebar from "../../components/admin/Sidebar.jsx";
import JavaScriptClient from "../../components/JavaScriptClient/JavaScriptClient.jsx";
import Footer from "../../components/admin/Footer.jsx";

const AdminLayout = ({ children }) => {
    return (
        <div className="min-h-screen relative bg-[var(--bg)] dark:bg-[var(--dark-bg)]">
            <Sidebar />
            <div className="main">
                <div className="w-full">
                    <Navbar />
                    <div className="p-6 bg-[var(--secondary-color)] dark:bg-[var(--dark-bg)]">
                        {children}
                    </div>
                    <Footer />
                </div>
            </div>
            <JavaScriptClient/>
        </div>
    );
};

export default AdminLayout;
