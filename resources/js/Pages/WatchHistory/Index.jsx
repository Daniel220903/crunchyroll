import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ history, auth }) {
    const { delete: destroy } = useForm();

    const removeOne = (id) => {
        if (confirm('¿Eliminar este episodio del historial?')) {
            destroy(route('watch-history.destroy', id));
        }
    };

    const clearAll = () => {
        if (confirm('¿Estás seguro de que quieres borrar TODO tu historial?')) {
            destroy(route('watch-history.clear'));
        }
    };

    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Historial de Visualización" />
            <Header auth={auth} />

            <main className="max-w-6xl mx-auto px-6 py-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h1 className="text-4xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4">
                            Historial
                        </h1>
                        <p className="text-gray-500 mt-2 text-xs font-bold uppercase tracking-widest">
                            Tus episodios vistos recientemente
                        </p>
                    </div>
                    {history.length > 0 && (
                        <button 
                            onClick={clearAll}
                            className="text-xs font-black uppercase text-red-500 hover:text-white transition border border-red-500/30 px-4 py-2 rounded"
                        >
                            Borrar todo el historial
                        </button>
                    )}
                </div>

                {history.length === 0 ? (
                    <div className="bg-[#121212] rounded-2xl p-20 text-center border border-white/5">
                        <p className="text-gray-400 mb-6">Aún no has visto ningún episodio.</p>
                        <Link href={route('series.index')} className="bg-[#F47521] text-black px-8 py-3 rounded font-black uppercase text-xs">
                            Empezar a ver
                        </Link>
                    </div>
                ) : (
                    <div className="grid gap-4">
                        {history.map((item) => (
                            <div key={item.id} className="bg-[#121212] group rounded-xl border border-white/5 overflow-hidden flex flex-col md:flex-row items-center transition hover:border-[#F47521]/50">
                                <div className="relative w-full md:w-64 aspect-video overflow-hidden">
                                    <img 
                                        src={item.episode?.thumbnail_url || '/default-ep.jpg'} 
                                        className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                                    />
                                    <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
                                        <div 
                                            className="h-full bg-[#F47521]" 
                                            style={{ width: `${item.completed ? 100 : (item.progress_seconds / 1440) * 100}%` }}
                                        />
                                    </div>
                                </div>

                                <div className="flex-1 p-6">
                                    <div className="flex justify-between items-start">
                                        <div>
                                            <Link href={route('series.show', item.episode.season.series.id)} className="text-[10px] font-black text-[#F47521] uppercase tracking-tighter hover:underline">
                                                {item.episode.season.series.title}
                                            </Link>
                                            <h3 className="text-lg font-bold mt-1">
                                                T{item.episode.season.number} E{item.episode.number}: {item.episode.title}
                                            </h3>
                                            <p className="text-xs text-gray-500 mt-2 uppercase font-bold tracking-tighter">
                                                Visto el {new Date(item.last_watched_at).toLocaleDateString()}
                                            </p>
                                        </div>
                                        <button 
                                            onClick={() => removeOne(item.episode_id)}
                                            className="text-gray-600 hover:text-red-500 transition p-2"
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
}
