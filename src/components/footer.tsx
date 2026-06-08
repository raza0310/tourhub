import Link from "next/link";
import { Compass, Mail, Phone, MapPin } from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-black border-t border-white/10 pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                {/* Branding */}
                <div className="col-span-1 md:col-span-1">
                    <Link href="/" className="flex items-center gap-2 mb-6 group">
                        <div className="w-8 h-8 bg-cyan-500 rounded-lg flex items-center justify-center">
                            <Compass className="text-white w-5 h-5" />
                        </div>
                        <span className="text-xl font-bold tracking-tighter text-white">
                            TOUR<span className="text-cyan-400">HUB</span>
                        </span>
                    </Link>
                    <p className="text-gray-400 text-sm leading-relaxed mb-6">
                        Connecting Pakistani travelers with extraordinary adventures. Our mission is to make every journey unforgettable.
                    </p>
                    <div className="flex items-center gap-3">
                        {/* Instagram */}
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-full hover:bg-pink-500 transition-colors group" aria-label="Instagram">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-gray-400 group-hover:text-white">
                                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                            </svg>
                        </a>
                        {/* Twitter / X */}
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-full hover:bg-sky-500 transition-colors group" aria-label="Twitter">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-white">
                                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                            </svg>
                        </a>
                        {/* Facebook */}
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"
                            className="p-2 bg-white/5 rounded-full hover:bg-blue-600 transition-colors group" aria-label="Facebook">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 text-gray-400 group-hover:text-white">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Quick Links */}
                <div>
                    <h4 className="text-white font-bold mb-6 italic">Quick Links</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/trips" className="hover:text-cyan-400 transition-colors">Browse Trips</Link></li>
                        <li><Link href="/ai-planner" className="hover:text-cyan-400 transition-colors">AI Trip Planner</Link></li>
                        <li><Link href="/login" className="hover:text-cyan-400 transition-colors">Login</Link></li>
                        <li><Link href="/signup" className="hover:text-cyan-400 transition-colors">Become a Member</Link></li>
                    </ul>
                </div>

                {/* Categories — now link to filtered trips */}
                <div>
                    <h4 className="text-white font-bold mb-6 italic">Destinations</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li><Link href="/trips?destination=Hunza" className="hover:text-cyan-400 transition-colors">Hunza Valley</Link></li>
                        <li><Link href="/trips?destination=Skardu" className="hover:text-cyan-400 transition-colors">Skardu & Baltistan</Link></li>
                        <li><Link href="/trips?destination=Swat" className="hover:text-cyan-400 transition-colors">Swat Valley</Link></li>
                        <li><Link href="/trips?destination=Naran" className="hover:text-cyan-400 transition-colors">Naran & Kaghan</Link></li>
                        <li><Link href="/trips?destination=Kashmir" className="hover:text-cyan-400 transition-colors">Azad Kashmir</Link></li>
                    </ul>
                </div>

                {/* Contact info — now clickable */}
                <div>
                    <h4 className="text-white font-bold mb-6 italic">Get in Touch</h4>
                    <ul className="space-y-4 text-sm text-gray-400">
                        <li className="flex items-start gap-3">
                            <MapPin className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                            <span>DHA Phase 6, Karachi, Pakistan</span>
                        </li>
                        <li className="flex items-center gap-3">
                            <Phone className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <a href="tel:+923001234567" className="hover:text-cyan-400 transition-colors">
                                +92 300 1234567
                            </a>
                        </li>
                        <li className="flex items-center gap-3">
                            <Mail className="w-5 h-5 text-cyan-400 flex-shrink-0" />
                            <a href="mailto:hello@tourhub.pk" className="hover:text-cyan-400 transition-colors">
                                hello@tourhub.pk
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 border-t border-white/5 pt-10 flex flex-col md:flex-row justify-between items-center gap-4">
                <p className="text-xs text-gray-500">
                    © 2026 TourHub. All rights reserved. Made with ❤️ for adventurous souls.
                </p>
                <div className="flex gap-6 text-xs text-gray-500">
                    <Link href="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link>
                    <Link href="/terms" className="hover:text-white transition-colors">Terms of Service</Link>
                </div>
            </div>
        </footer>
    );
}
