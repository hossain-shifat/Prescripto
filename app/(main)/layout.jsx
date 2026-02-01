import Footer from "@/components/frontend/Footer";
import Navbar from "@/components/frontend/Navbar";
import { Poppins } from "next/font/google";

const poppins = Poppins({
    subsets: ['latin'],
    weight: ['400', '500', '600', '700', '800', '900'],
    display: 'swap'
});

export default function MainLayout({ children }) {
    return (
        <section className={poppins.className}>
            <div>
                <Navbar />
                <main className="min-h-screen bg-base-100 p-2 py-20 md:mx-25 overflow-hidden">
                    {children}
                </main>
                <Footer />
            </div>
        </section>
    );
}
