import Navbar from "@/components/frontend/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400','500','600','700','800','900'],
    display: 'swap'
});

export default function MainLayout({ children }) {
    return (
        <section className={poppins.className}>
            <Navbar />
            <main className="min-h-screen bg-base-100 py-20 overflow-hidden">
                {children}
            </main>
        </section>
    );
}
