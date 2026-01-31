import Navbar from "@/components/frontend/Navbar";


export default function MainLayout({ children }) {
    return (
        <section className="">
            <Navbar />
            <main className="min-h-screen bg-base-100 py-20 overflow-hidden">
                {children}
            </main>
        </section>
    );
}
