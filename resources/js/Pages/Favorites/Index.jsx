import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ favorites, auth }) {
    return (
        <>
            <Head title="Mi Lista - Crunchyroll Clone" />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <main className="max-w-7xl mx-auto px-6 py-12">
                    <header className="mb-10">
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4">
                            Mi Lista
                        </h1>
                        <p className="text-gray-500 mt-2 uppercase text-xs font-bold tracking-widest">
                            {favorites.length} Series guardadas
                        </p>
                    </header>

                    {favorites.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 bg-[#121212] rounded-2xl border border-white/5">
                            <p className="text-gray-400 mb-6">No tienes nada guardado aún.</p>
                            <Link 
                                href={route('series.index')} 
                                className="bg-[#F47521] text-black px-8 py-3 rounded font-black uppercase text-xs"
                            >
                                Explorar Series
                            </Link>
                        </div>
                    ) : (
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                            {favorites.map((series) => (
                                <Link 
                                    key={series.id} 
                                    href={route('series.show', series.id)}
                                    className="group relative transition-transform duration-300 hover:-translate-y-2"
                                >
                                    <div className="aspect-[2/3] overflow-hidden rounded-lg border border-white/10 shadow-lg">
                                        <img 
                                            src={series.poster_url || 'https://via.placeholder.com/300x450'} 
                                            alt={series.title}
                                            className="w-full h-full object-cover transition-scale duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80" />
                                    </div>
                                    <div className="mt-3">
                                        <h3 className="font-bold text-sm line-clamp-1 group-hover:text-[#F47521] transition">
                                            {series.title}
                                        </h3>
                                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-tighter">
                                            Serie
                                        </span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
        </>
    );
}
