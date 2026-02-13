import { Head, Link } from '@inertiajs/react';

export default function Welcome({ auth }) {
    return (
        <>
            <Head title="Bienvenido - Crunchyroll Clone" />
            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <header className="absolute top-0 left-0 right-0 z-50 px-8 py-6">
                    <div className="max-w-7xl mx-auto flex items-center justify-between">
                        <div className="flex items-center">
                            <svg className="w-40 h-10" viewBox="0 0 200 50" fill="none">
                                <text x="0" y="35" className="text-3xl font-black fill-[#F47521]">
                                    CRUNCHYROLL
                                </text>
                            </svg>
                        </div>

                        <nav className="flex items-center gap-4">
                            {auth.user ? (
                                <Link
                                    href={route('series.index')}
                                    className="px-6 py-2 bg-[#F47521] hover:bg-[#E56717] text-white font-semibold rounded transition-colors"
                                >
                                    Ir al Inicio
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route('login')}
                                        className="px-6 py-2 text-white hover:text-[#F47521] font-semibold transition-colors"
                                    >
                                        Iniciar Sesión
                                    </Link>
                                    <Link
                                        href={route('register')}
                                        className="px-6 py-2 bg-[#F47521] hover:bg-[#E56717] text-white font-semibold rounded transition-colors"
                                    >
                                        Crear Cuenta
                                    </Link>
                                </>
                            )}
                        </nav>
                    </div>
                </header>

                <section className="relative h-screen flex items-center justify-center overflow-hidden">
                    <div className="absolute inset-0 z-0">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10"></div>
                        <img
                            src="https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop"
                            alt="Anime background"
                            className="w-full h-full object-cover opacity-50"
                        />
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto px-8 text-left">
                        <div className="max-w-2xl">
                            <h1 className="text-6xl md:text-7xl font-black mb-6 leading-tight">
                                El Hogar del
                                <span className="block text-[#F47521]">Anime</span>
                            </h1>
                            <p className="text-xl md:text-2xl text-gray-300 mb-8 leading-relaxed">
                                Miles de episodios y películas de anime. Simulcasts desde Japón. 
                                Todo en un solo lugar.
                            </p>
                            
                            {!auth.user && (
                                <div className="flex gap-4">
                                    <Link
                                        href={route('register')}
                                        className="px-8 py-4 bg-[#F47521] hover:bg-[#E56717] text-white text-lg font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                                    >
                                        Comienza Gratis
                                    </Link>
                                    <Link
                                        href={route('series.index')}
                                        className="px-8 py-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white text-lg font-bold rounded-lg transition-all border border-white/20"
                                    >
                                        Explorar Catálogo
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                        <svg className="w-6 h-6 text-white/50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                        </svg>
                    </div>
                </section>

                <section className="py-20 px-8 bg-gradient-to-b from-[#0B0B0B] to-[#1A1A1A]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl md:text-5xl font-black text-center mb-16">
                            ¿Por Qué <span className="text-[#F47521]">Crunchyroll</span>?
                        </h2>

                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#F47521]/20 hover:border-[#F47521] transition-all">
                                <div className="w-16 h-16 bg-[#F47521]/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#F47521]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Biblioteca Masiva</h3>
                                <p className="text-gray-400">
                                    Accede a miles de episodios de anime, desde clásicos hasta los últimos estrenos.
                                </p>
                            </div>

                            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#F47521]/20 hover:border-[#F47521] transition-all">
                                <div className="w-16 h-16 bg-[#F47521]/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#F47521]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Simulcasts</h3>
                                <p className="text-gray-400">
                                    Disfruta de nuevos episodios una hora después de su emisión en Japón.
                                </p>
                            </div>

                            <div className="bg-[#1A1A1A] p-8 rounded-xl border border-[#F47521]/20 hover:border-[#F47521] transition-all">
                                <div className="w-16 h-16 bg-[#F47521]/10 rounded-full flex items-center justify-center mb-6">
                                    <svg className="w-8 h-8 text-[#F47521]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">Sin Anuncios</h3>
                                <p className="text-gray-400">
                                    Experiencia premium sin interrupciones para una inmersión total.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 px-8 bg-[#1A1A1A]">
                    <div className="max-w-7xl mx-auto text-center">
                        <h2 className="text-4xl md:text-5xl font-black mb-8">
                            Únete a la Comunidad
                        </h2>
                        <p className="text-xl text-gray-300 mb-12 max-w-2xl mx-auto">
                            Millones de fans de anime en todo el mundo ya están disfrutando. 
                            ¿A qué esperas?
                        </p>
                        {!auth.user && (
                            <Link
                                href={route('register')}
                                className="inline-block px-12 py-5 bg-[#F47521] hover:bg-[#E56717] text-white text-xl font-bold rounded-lg transition-all transform hover:scale-105 shadow-2xl"
                            >
                                Empieza Ahora Gratis
                            </Link>
                        )}
                    </div>
                </section>

                <footer className="py-8 px-8 bg-[#0B0B0B] border-t border-white/10">
                    <div className="max-w-7xl mx-auto text-center text-gray-500">
                        <p>&copy; lalalalalallalalalalalalalalalalalalalaalalallala.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}
