import { Head, Link, useForm } from '@inertiajs/react'
import Header from '@/Components/Header'

export default function Edit({ series, genres, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    title: series.title || '',
    description: series.description || '',
    cover_image: null,
    status: series.status || '',
    genre_ids: series.genres?.map(g => g.id) || []
  })

  const submit = e => {
    e.preventDefault()
    put(route('series.update', series.id))
  }

  const toggleGenre = id => {
    setData(
      'genre_ids',
      data.genre_ids.includes(id)
        ? data.genre_ids.filter(g => g !== id)
        : [...data.genre_ids, id]
    )
  }

  return (
    <>
      <Head title={`Editar ${series.title}`} />

      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Header auth={auth} />

        <section className="py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-black mb-8">Editar serie</h1>

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
                  className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded"
                />
                {errors.title && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.title}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Descripción</label>
                <textarea
                  value={data.description}
                  onChange={e => setData('description', e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded h-36"
                />
                {errors.description && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.description}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm mb-2">Estado</label>
                <select
                  value={data.status}
                  onChange={e => setData('status', e.target.value)}
                  className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded"
                >
                  <option value="">Selecciona estado</option>
                  <option value="ongoing">En emisión</option>
                  <option value="finished">Finalizada</option>
                  <option value="canceled">Cancelada</option>
                </select>
                {errors.status && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.status}
                  </div>
                )}
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

              <div className="flex gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-3 bg-[#F47521] rounded font-semibold disabled:opacity-50"
                >
                  Actualizar serie
                </button>

                <Link
                  href={route('series.show', series.id)}
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
  )
}
