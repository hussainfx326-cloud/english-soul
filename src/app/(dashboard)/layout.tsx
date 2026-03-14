import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col md:flex-row relative">
            {/* Background Orbs */}
            <div className="fixed top-0 right-0 w-96 h-96 bg-color-primary-500 rounded-full blur-[120px] opacity-10 pointer-events-none"></div>
            <div className="fixed bottom-0 left-1/4 w-80 h-80 bg-color-accent-500 rounded-full blur-[100px] opacity-10 pointer-events-none"></div>

            {/* Global Navigation - Desktop Sidebar & Mobile Bottom Tabs */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 overflow-x-hidden min-h-screen pb-20 md:pb-0 px-4 py-6 md:p-8">
                <div className="max-w-5xl mx-auto w-full h-full">
                    {children}
                </div>
            </main>
        </div>
    );
}
