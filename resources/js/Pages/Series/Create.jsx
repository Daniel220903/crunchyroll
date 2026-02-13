import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';

export default function Create({ genres, auth }) {
  const { data, setData, post, processing, errors } = useForm({
    title: '',
    description: '',
    cover_image: null,
    release_year: '',
    status: '',
    genre_ids: []
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('series.store'));
  };

  const toggleGenre = (id) => {
    setData(
      'genre_ids',
      data.genre_ids.includes(id)
        ? data.genre_ids.filter(g => g !== id)
        : [...data.genre_ids, id]
    );
  };

  return (
    <>
      <Head title="Crear Serie - Crunchyroll Clone" />

      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Header auth={auth} />

        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8">
              <h1 className="text-4xl font-black">Crear nueva serie</h1>
              <p className="text-gray-400 mt-2">
                Completa los datos para añadir una serie al catálogo.
              </p>
            </div>

            <form
              onSubmit={submit}
              className="space-y-6 bg-[#0F0F0F] p-6 rounded-lg border border-white/10"
            >
              <div>
                <label className="block text-sm mb-2">Título</label>
                <input
                  type="text"
                  value={data.title}
                  onChange={e => setData('title', e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded text-white"
                />
                {errors.title && (
                  <div className="text-red-500 text-sm mt-1">{errors.title}</div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Descripción</label>
                <textarea
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded text-white h-36"
                />
                {errors.description && (
                  <div className="text-red-500 text-sm mt-1">{errors.description}</div>
                )}
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm mb-2">Imagen de portada</label>
                  <input
                    type="file"
                    onChange={e => setData('cover_image', e.target.files[0])}
                    className="w-full text-sm"
                  />
                  {errors.cover_image && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.cover_image}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-2">Año de estreno</label>
                  <input
                    type="number"
                    value={data.release_year}
                    onChange={e => setData('release_year', e.target.value)}
                    className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded text-white"
                  />
                  {errors.release_year && (
                    <div className="text-red-500 text-sm mt-1">
                      {errors.release_year}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-sm mb-2">Estado</label>
                  <select
                    value={data.status}
                    onChange={e => setData('status', e.target.value)}
                    className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded text-white"
                  >
                    <option value="">Selecciona estado</option>
                    <option value="ongoing">En emisión</option>
                    <option value="finished">Finalizada</option>
                    <option value="canceled">Cancelada</option>
                  </select>
                  {errors.status && (
                    <div className="text-red-500 text-sm mt-1">{errors.status}</div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm mb-3">Géneros</label>
                <div className="flex flex-wrap gap-3">
                  {genres.map(genre => (
                    <button
                      type="button"
                      key={genre.id}
                      onClick={() => toggleGenre(genre.id)}
                      className={`px-4 py-2 rounded text-sm border ${
                        data.genre_ids.includes(genre.id)
                          ? 'bg-[#F47521] border-[#F47521]'
                          : 'bg-[#121212] border-white/10'
                      }`}
                    >
                      {genre.name}
                    </button>
                  ))}
                </div>
                {errors.genre_ids && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.genre_ids}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-3 bg-[#F47521] rounded font-semibold disabled:opacity-50"
                >
                  Crear serie
                </button>

                <Link
                  href={route('series.index')}
                  className="px-6 py-3 bg-white/5 rounded border border-white/10"
                >
                  Cancelar
                </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
