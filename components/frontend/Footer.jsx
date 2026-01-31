import { FooterLinks } from "./Links";
import Logo from "./Logo";

export default function Footer() {
    return (
        <footer className="text-base-content lg:px-30 bg-base-200/20 p-10">
            <section className="footer sm:footer-horizontal flex flex-col md:flex-row md:justify-between gap-8">
                <aside className="flex flex-col gap-10 md:gap-5 md:max-w-md">
                    <Logo />
                    <p>
                        Prescripto simplifies healthcare by connecting patients with verified doctors across specialties. Browse profiles, check availability, read reviews, and book appointments easily. With secure data, instant confirmations, and reminders, managing your health is simple and convenient.
                    </p>
                </aside>
                <nav>
                    <h6 className="footer-title">COMPANY</h6>
                    <ul className="flex flex-col gap-2">
                        <FooterLinks />
                    </ul>
                </nav>
                <nav>
                    <h6 className="footer-title">GET IN TOUCH</h6>
                    <div className="flex flex-col gap-1">
                        <a href="tel:+12124567890" className="hover:underline">
                            +1-212-456-7890
                        </a>
                        <a href="mailto:prescripto@gmail.com" className="hover:underline">
                            prescripto@gmail.com
                        </a>
                    </div>
                </nav>
            </section>
            <div className="divider" />
            <section className="footer footer-center text-base-content">
                <aside>
                    <p>Copyright © {new Date().getFullYear()} Prescripto - All right reserved</p>
                </aside>
            </section>
        </footer>
    )
}
