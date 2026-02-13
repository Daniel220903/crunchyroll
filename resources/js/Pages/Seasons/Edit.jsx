import { Head, Link, useForm } from '@inertiajs/react'
import Header from '@/Components/Header'

export default function Edit({ season, auth }) {
  const { data, setData, put, processing, errors } = useForm({
    season_number: season.season_number || ''
  })

  const submit = (e) => {
    e.preventDefault()
    put(route('seasons.update', season.id))
  }

  return (
    <>
      <Head title={`Editar Temporada ${season.season_number}`} />

      <div className="min-h-screen bg-[#0B0B0B] text-white">
        <Header auth={auth} />

        <section className="py-12 px-6">
          <div className="max-w-3xl mx-auto">
            <div className="mb-8">
              <Link
                href={route('seasons.show', season.id)}
                className="text-sm text-gray-400 hover:text-[#F47521]"
              >
                ← Volver a la temporada
              </Link>

              <h1 className="text-4xl font-black mt-4">
                Editar Temporada {season.season_number}
              </h1>

              <p className="text-gray-400 mt-2">
                Serie: {season.series.title}
              </p>
            </div>

            <form
              onSubmit={submit}
              className="space-y-6 bg-[#0F0F0F] p-6 rounded-lg border border-white/10"
            >
              <div>
                <label className="block text-sm mb-2">
                  Número de temporada
                </label>

                <input
                  type="number"
                  min="1"
                  value={data.season_number}
                  onChange={(e) =>
                    setData('season_number', e.target.value)
                  }
                  className="w-full px-4 py-3 bg-[#121212] border border-white/10 rounded text-white"
                />

                {errors.season_number && (
                  <div className="text-red-500 text-sm mt-1">
                    {errors.season_number}
                  </div>
                )}
              </div>

              <div className="flex items-center gap-4">
                <button
                  type="submit"
                  disabled={processing}
                  className="px-6 py-3 bg-[#F47521] rounded font-semibold disabled:opacity-50"
                >
                  Actualizar temporada
                </button>

                <Link
                  href={route('seasons.show', season.id)}
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
