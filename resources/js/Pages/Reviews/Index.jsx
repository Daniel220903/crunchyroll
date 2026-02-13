import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ auth, myReviews }) {
    const { delete: destroy } = useForm();

    return (
        <>
            <Head title="Mis Opiniones - Crunchyroll" />
            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />
                
                <section className="py-12 px-6 max-w-6xl mx-auto">
                    <header className="mb-12">
                        <h1 className="text-4xl font-black uppercase tracking-tighter italic">Mis Reseñas</h1>
                        <p className="text-gray-500 uppercase text-xs font-bold tracking-widest mt-2">
                            Gestiona tus {myReviews.length} opiniones publicadas
                        </p>
                    </header>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {myReviews.map((review) => (
                            <div key={review.id} className="bg-[#0F0F0F] border border-white/5 rounded-2xl p-6 flex gap-6 hover:border-[#F47521]/30 transition group">
                                <div className="w-24 h-32 flex-shrink-0">
                                    <img 
                                        src={review.series?.cover_image} 
                                        className="w-full h-full object-cover rounded-lg shadow-lg" 
                                        alt={review.series?.title} 
                                    />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <Link href={route('series.show', review.series_id)} className="font-black uppercase text-sm group-hover:text-[#F47521] transition">
                                                {review.series?.title}
                                            </Link>
                                            <div className="text-[#F47521] font-bold text-xs">
                                                ★ {review.rating}
                                            </div>
                                        </div>
                                        <p className="text-gray-400 text-sm mt-3 italic line-clamp-3 leading-relaxed">
                                            "{review.comment}"
                                        </p>
                                    </div>
                                    <div className="flex justify-between items-center mt-4 border-t border-white/5 pt-4">
                                        <span className="text-[10px] text-gray-600 font-bold uppercase">
                                            {new Date(review.created_at).toLocaleDateString()}
                                        </span>
                                        <button 
                                            onClick={() => confirm('¿Borrar reseña?') && destroy(route('reviews.destroy', review.id))}
                                            className="text-[10px] text-red-500/50 hover:text-red-500 font-bold uppercase tracking-widest transition"
                                        >
                                            Eliminar
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>
            </div>
        </>
    );
}
