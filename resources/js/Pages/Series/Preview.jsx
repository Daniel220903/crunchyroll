import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function SeriesPreview({ series, auth }) {
  const backdrop =
    series.backdrop_url ||
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop';

  return (
    <>
      <Head title={`${series.title} - Preview`} />

      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Header auth={auth} />

        <section className="relative h-[55vh] flex items-end overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent z-10" />
            <img src={backdrop} className="w-full h-full object-cover opacity-70" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 pb-10">
            <h1 className="text-5xl md:text-6xl font-black mb-4">{series.title}</h1>

            <div className="flex flex-wrap gap-2 mb-6">
              {series.genres.map((g) => (
                <span
                  key={g.id}
                  className="px-3 py-1 text-sm rounded-full bg-white/10 border border-white/10"
                >
                  {g.name}
                </span>
              ))}
            </div>

            <div className="flex gap-4">
              <Link
                href={route('series.show', series.id)}
                className="px-6 py-3 bg-white/10 hover:bg-white/20 rounded-lg border border-white/10"
              >
                Ver Detalles
              </Link>
            </div>
          </div>
        </section>

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10">
            <div className="md:col-span-2">
              <h2 className="text-2xl font-black mb-4">Sinopsis</h2>
              <p className="text-gray-300 leading-relaxed">
                {series.description || 'Sin descripción disponible.'}
              </p>
            </div>

            <div>
              <h2 className="text-2xl font-black mb-4">Temporadas</h2>

              <div className="space-y-6">
                {series.seasons.map((season) => (
                  <div
                    key={season.id}
                    className="bg-[#121212] rounded-lg border border-white/10 p-4"
                  >
                    <h3 className="font-bold mb-3">{season.title}</h3>

                    <ul className="space-y-2">
                      {season.episodes.map((ep) => (
                        <li
                          key={ep.id}
                          className="flex items-center justify-between text-sm text-gray-300"
                        >
                          <span>
                            Episodio {ep.episode_number}: {ep.title}
                          </span>

                          <Link
                            href={route('episodes.watch', ep.id)}
                            className="text-[#F47521] hover:underline"
                          >
                            Ver
                          </Link>
                        </li>
                      ))}
                    </ul>

                    {season.episodes.length === 3 && (
                      <div className="mt-3 text-sm text-gray-400">
                        Ver más episodios en la serie
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <footer className="py-8 px-6 border-t border-white/10 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} Crunchyroll Clone</p>
        </footer>
      </div>
    </>
  );
}
