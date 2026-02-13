import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ series, auth }) {
  const firstBackdrop =
    series?.data?.[0]?.backdrop_url ||
    'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=1920&h=1080&fit=crop';

  return (
    <>
      <Head title="Series - Crunchyroll Clone" />

      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Header auth={auth} active="index" />

        <section className="relative h-[48vh] md:h-[60vh] flex items-center justify-center overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-transparent z-10" />
            <img
              src={firstBackdrop}
              alt="Backdrop"
              className="w-full h-full object-cover opacity-60"
            />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-6 text-left">
            <div className="max-w-2xl">
              <h1 className="text-5xl md:text-6xl font-black mb-4 leading-tight">
                Explora
                <span className="block text-[#F47521]">Nuestro Catálogo</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-300 mb-6 leading-relaxed">
                Miles de series y episodios. Filtra por género, descubre
                novedades y guarda tus favoritos.
              </p>

              <div className="flex gap-4">
                <Link
                  href={route('series.index')}
                  className="px-6 py-3 bg-[#F47521] hover:bg-[#E56717] text-white font-bold rounded-lg shadow-lg"
                >
                  Explorar Catálogo
                </Link>

                {!auth?.user && (
                  <Link
                    href={route('register')}
                    className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-bold rounded-lg border border-white/10"
                  >
                    Regístrate Gratis
                  </Link>
                )}
              </div>
            </div>
          </div>
        </section>

        <section className="py-12 px-6 bg-gradient-to-b from-[#0B0B0B] to-[#0F0F0F]">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black">Nuevas y Populares</h2>
              <div className="text-sm text-gray-400">
                Mostrando {series?.meta?.from || 1} -{' '}
                {series?.meta?.to || series?.data?.length} de{' '}
                {series?.meta?.total || series?.data?.length}
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {series?.data?.map((s) => (
                <article
                  key={s.id}
                  className="group bg-[#121212] rounded-lg overflow-hidden border border-white/5 hover:scale-105 transition-transform"
                >
                  <Link
                    href={route('series.show', s.id)}
                    className="block relative"
                  >
                    <img
                      src={
                        s.poster_url ||
                        s.thumbnail ||
                        'https://via.placeholder.com/300x450?text=No+Image'
                      }
                      alt={s.title}
                      className="w-full h-56 object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Link>

                  <div className="p-3">
                    <h3 className="text-sm font-semibold truncate">
                      {s.title}
                    </h3>

                    <div className="mt-2 flex flex-wrap gap-2">
                      {s.genres?.slice(0, 3).map((g) => (
                        <span
                          key={g.id}
                          className="text-xs px-2 py-1 rounded-full bg-white/5 border border-white/5"
                        >
                          {g.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <nav
              className="mt-8 flex items-center justify-center"
              aria-label="Pagination"
            >
              <ul className="inline-flex items-center -space-x-px">
                {series?.links?.map((link, idx) => (
                  <li key={idx}>
                    <Link
                      as="a"
                      href={link.url || '#'}
                      preserveState
                      className={`px-4 py-2 mx-1 rounded ${
                        link.active
                          ? 'bg-[#F47521] text-white'
                          : 'bg-[#0B0B0B] border border-white/5 text-gray-300 hover:bg-white/5'
                      }`}
                      dangerouslySetInnerHTML={{ __html: link.label }}
                    />
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </section>

        <footer className="py-8 px-6 bg-[#0B0B0B] border-t border-white/10">
          <div className="max-w-7xl mx-auto text-center text-gray-500">
            <p>&copy; {new Date().getFullYear()} - Crunchyroll Clone</p>
          </div>
        </footer>
      </div>
    </>
  );
}
