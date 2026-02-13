import { Head, Link } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Index({ seasons, auth }) {
  return (
    <>
      <Head title="Temporadas - Crunchyroll Clone" />

      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Header auth={auth} />

        <section className="py-12 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center justify-between mb-8">
              <h1 className="text-4xl font-black">Temporadas</h1>

              <Link
                href={route('seasons.create')}
                className="px-6 py-3 bg-[#F47521] rounded-lg font-semibold hover:bg-[#E56717] transition"
              >
                Nueva Temporada
              </Link>
            </div>

            <div className="bg-[#0F0F0F] border border-white/10 rounded-lg overflow-hidden">
              <table className="w-full text-left">
                <thead className="bg-[#121212] border-b border-white/10">
                  <tr>
                    <th className="px-6 py-4 text-sm font-semibold">#</th>
                    <th className="px-6 py-4 text-sm font-semibold">Serie</th>
                    <th className="px-6 py-4 text-sm font-semibold">Temporada</th>
                    <th className="px-6 py-4 text-sm font-semibold">Creado</th>
                    <th className="px-6 py-4 text-sm font-semibold text-right">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {seasons.data.map((season) => (
                    <tr
                      key={season.id}
                      className="border-b border-white/5 hover:bg-white/5 transition"
                    >
                      <td className="px-6 py-4 text-sm text-gray-400">
                        {season.id}
                      </td>

                      <td className="px-6 py-4">
                        <Link
                          href={route('series.show', season.series?.id)}
                          className="font-semibold hover:text-[#F47521] transition"
                        >
                          {season.series?.title}
                        </Link>
                      </td>

                      <td className="px-6 py-4 text-sm">
                        Temporada {season.season_number}
                      </td>

                      <td className="px-6 py-4 text-sm text-gray-400">
                        {new Date(season.created_at).toLocaleDateString()}
                      </td>

                      <td className="px-6 py-4 text-right space-x-2">
                        <Link
                          href={route('seasons.edit', season.id)}
                          className="px-4 py-2 bg-blue-600 rounded text-sm hover:bg-blue-700 transition"
                        >
                          Editar
                        </Link>

                        <Link
                          href={route('seasons.show', season.id)}
                          className="px-4 py-2 bg-white/10 border border-white/10 rounded text-sm hover:bg-white/20 transition"
                        >
                          Ver
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <nav className="mt-8 flex items-center justify-center">
              <ul className="inline-flex items-center -space-x-px">
                {seasons.links.map((link, idx) => (
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
      </div>
    </>
  );
}
