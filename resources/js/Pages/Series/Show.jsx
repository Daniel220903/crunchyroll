import { Head, Link, useForm, router } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';

export default function Show({ series, isFavorite, reviews, auth, userReview }) {
    const { delete: destroy, processing: deleting } = useForm();
    
    const { data, setData, post, processing: savingReview, errors, reset } = useForm({
        series_id: series.id,
        rating: userReview?.rating || 5,
        comment: userReview?.comment || '',
    });

    const handleDeleteSeries = () => {
        if (confirm('¿Seguro que quieres eliminar esta serie?')) {
            destroy(route('series.destroy', series.id));
        }
    };

    const toggleFavorite = () => {
        router.post(route('favorites.toggle', series.id), {}, {
            preserveScroll: true,
        });
    };

    const submitReview = (e) => {
        e.preventDefault();
        post(route('reviews.store'), {
            preserveScroll: true,
            onSuccess: () => !userReview && reset('comment'),
        });
    };

    const backdrop = series?.backdrop_url || 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop';

    return (
        <>
            <Head title={`${series.title} - Crunchyroll Clone`} />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="relative h-[60vh] flex items-end overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
                        <img src={backdrop} alt={series.title} className="w-full h-full object-cover opacity-60" />
                    </div>

                    <div className="relative z-20 max-w-7xl mx-auto px-6 pb-12 flex gap-8">
                        <img 
                            src={series.poster_url || 'https://via.placeholder.com/300x450?text=No+Image'} 
                            alt={series.title} 
                            className="w-48 h-72 object-cover rounded-lg border border-white/10 shadow-2xl" 
                        />
                        <div className="max-w-2xl">
                            <h1 className="text-4xl md:text-5xl font-black mb-4 uppercase italic tracking-tighter">{series.title}</h1>
                            <div className="flex flex-wrap gap-2 mb-4">
                                {series.genres?.map(g => (
                                    <span key={g.id} className="text-[10px] font-bold px-3 py-1 rounded-full bg-[#F47521] text-black uppercase">{g.name}</span>
                                ))}
                            </div>
                            <p className="text-gray-300 mb-6 leading-relaxed line-clamp-3">{series.description}</p>
                            
                            <div className="flex gap-4 items-center">
                                <button 
                                    onClick={toggleFavorite}
                                    className={`p-3 rounded-full border transition ${isFavorite ? 'bg-[#F47521] border-[#F47521] text-black' : 'bg-transparent border-white/20 text-white hover:bg-white/10'}`}
                                    title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                                    </svg>
                                </button>

                                <Link href={route('series.edit', series.id)} className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded font-bold text-xs uppercase transition">Editar</Link>
                                
                                <button onClick={handleDeleteSeries} disabled={deleting} className="px-6 py-3 bg-red-600/20 text-red-500 rounded font-bold text-xs uppercase transition">
                                    {deleting ? '...' : 'Eliminar'}
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-12 px-6 bg-[#0F0F0F]">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-2xl font-black mb-8 uppercase italic border-l-4 border-[#F47521] pl-4">Temporadas</h2>
                        <div className="space-y-12">
                            {series.seasons?.map(season => (
                                <div key={season.id}>
                                    <h3 className="text-lg font-bold mb-4 text-gray-400">Temporada {season.season_number}</h3>
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {season.episodes?.map(episode => (
                                            <Link key={episode.id} href={route('episodes.show', episode.id)} className="bg-[#121212] border border-white/5 rounded-lg p-4 hover:border-[#F47521]/50 transition group">
                                                <div className="flex justify-between items-center">
                                                    <div>
                                                        <h4 className="font-bold group-hover:text-[#F47521]">E{episode.episode_number}: {episode.title}</h4>
                                                        <p className="text-xs text-gray-500 uppercase tracking-tighter">Ver ahora</p>
                                                    </div>
                                                    <span className="text-xl">▶</span>
                                                </div>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-16 px-6 bg-[#0B0B0B] border-t border-white/10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12">
                        
                        <div className="lg:col-span-4">
                            <div className="sticky top-8 bg-[#121212] p-6 rounded-xl border border-white/5">
                                <h2 className="text-xl font-black mb-6 uppercase tracking-tighter text-[#F47521]">
                                    {userReview ? 'Tu Reseña' : 'Danos tu opinión'}
                                </h2>
                                <form onSubmit={submitReview} className="space-y-4">
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Calificación (1-5)</label>
                                        <select 
                                            value={data.rating} 
                                            onChange={e => setData('rating', e.target.value)}
                                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-[#F47521] font-bold focus:ring-[#F47521]"
                                        >
                                            {[5,4,3,2,1].map(n => <option key={n} value={n}>{n} Estrellas</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-bold text-gray-500 uppercase">Comentario</label>
                                        <textarea 
                                            value={data.comment}
                                            onChange={e => setData('comment', e.target.value)}
                                            className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-sm min-h-[100px] focus:ring-[#F47521]"
                                            placeholder="¿Qué te pareció la serie?"
                                        />
                                        <InputError message={errors.comment} className="mt-1" />
                                    </div>
                                    <button 
                                        type="submit" 
                                        disabled={savingReview}
                                        className="w-full py-3 bg-[#F47521] text-black font-black uppercase text-xs rounded hover:bg-[#ff8533] transition disabled:opacity-50"
                                    >
                                        {userReview ? 'Actualizar Comentario' : 'Publicar Reseña'}
                                    </button>
                                </form>
                            </div>
                        </div>

                        <div className="lg:col-span-8 space-y-6">
                            <h2 className="text-2xl font-black mb-8 uppercase italic">Comentarios de la comunidad</h2>
                            {reviews.length === 0 ? (
                                <p className="text-gray-500 italic">Nadie ha comentado todavía. ¡Sé el primero!</p>
                            ) : (
                                reviews.map(review => (
                                    <div key={review.id} className="bg-[#121212] border border-white/5 rounded-xl p-6 transition hover:border-white/10">
                                        <div className="flex items-center justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center font-bold text-[#F47521]">
                                                    {review.user?.name.charAt(0)}
                                                </div>
                                                <div>
                                                    <span className="block font-bold text-sm">{review.user?.name}</span>
                                                    <span className="text-[10px] text-gray-600 uppercase font-bold">{new Date(review.created_at).toLocaleDateString()}</span>
                                                </div>
                                            </div>
                                            <div className="text-[#F47521] font-black italic">★ {review.rating}</div>
                                        </div>
                                        <p className="text-gray-300 italic leading-relaxed">"{review.comment}"</p>
                                    </div>
                                ))
                            )}
                        </div>

                    </div>
                </section>
            </div>
        </>
    );
}
