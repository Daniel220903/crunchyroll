import { Head, Link, useForm } from '@inertiajs/react';
import Header from '@/Components/Header';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import TextInput from '@/Components/TextInput';

export default function Edit({ auth, episode, seasons, voiceActors }) {
    const { data, setData, put, processing, errors } = useForm({
        season_id: episode.season_id || '',
        number: episode.number || '',
        title: episode.title || '',
        voice_actor_ids: episode.voice_actors.map(va => va.id) || [],
        character_names: episode.voice_actors.map(va => va.pivot.character_name) || []
    });

    const addVoiceActor = () => {
        setData({
            ...data,
            voice_actor_ids: [...data.voice_actor_ids, ''],
            character_names: [...data.character_names, '']
        });
    };

    const removeVoiceActor = (index) => {
        const newIds = [...data.voice_actor_ids];
        const newNames = [...data.character_names];
        newIds.splice(index, 1);
        newNames.splice(index, 1);
        setData({ ...data, voice_actor_ids: newIds, character_names: newNames });
    };

    const handleVoiceActorChange = (index, value) => {
        const newIds = [...data.voice_actor_ids];
        newIds[index] = value;
        setData('voice_actor_ids', newIds);
    };

    const handleCharacterNameChange = (index, value) => {
        const newNames = [...data.character_names];
        newNames[index] = value;
        setData('character_names', newNames);
    };

    const submit = (e) => {
        e.preventDefault();
        put(route('episodes.update', episode.id));
    };

    return (
        <>
            <Head title={`Editar Episodio ${episode.number}`} />

            <div className="min-h-screen bg-[#0B0B0B] text-white">
                <Header auth={auth} />

                <section className="py-12 px-6">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-between mb-8">
                            <h1 className="text-4xl font-black uppercase tracking-tighter">Editar Episodio</h1>
                            <Link href={route('episodes.index')} className="text-sm font-bold text-gray-500 hover:text-white transition uppercase">
                                Cancelar
                            </Link>
                        </div>

                        <form onSubmit={submit} className="space-y-8">
                            <div className="bg-[#0F0F0F] border border-white/10 rounded-lg p-8 space-y-6">
                                <h3 className="text-[#F47521] font-black uppercase tracking-widest text-sm border-b border-white/5 pb-2">Datos del Episodio</h3>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="md:col-span-2">
                                        <InputLabel htmlFor="season_id" value="Serie y Temporada" className="text-gray-400 text-xs uppercase font-bold mb-2" />
                                        <select
                                            id="season_id"
                                            value={data.season_id}
                                            className="w-full bg-[#121212] border-white/10 text-white rounded-lg focus:ring-[#F47521] focus:border-[#F47521]"
                                            onChange={(e) => setData('season_id', e.target.value)}
                                            required
                                        >
                                            <option value="">Selecciona una temporada</option>
                                            {seasons.map((s) => (
                                                <option key={s.id} value={s.id}>{s.label}</option>
                                            ))}
                                        </select>
                                        <InputError message={errors.season_id} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="number" value="Número" className="text-gray-400 text-xs uppercase font-bold mb-2" />
                                        <TextInput
                                            id="number"
                                            type="number"
                                            value={data.number}
                                            className="w-full bg-[#121212] border-white/10 text-white rounded-lg"
                                            onChange={(e) => setData('number', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.number} className="mt-2" />
                                    </div>

                                    <div>
                                        <InputLabel htmlFor="title" value="Título" className="text-gray-400 text-xs uppercase font-bold mb-2" />
                                        <TextInput
                                            id="title"
                                            value={data.title}
                                            className="w-full bg-[#121212] border-white/10 text-white rounded-lg"
                                            onChange={(e) => setData('title', e.target.value)}
                                            required
                                        />
                                        <InputError message={errors.title} className="mt-2" />
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[#0F0F0F] border border-white/10 rounded-lg p-8 space-y-6">
                                <div className="flex justify-between items-center border-b border-white/5 pb-2">
                                    <h3 className="text-[#F47521] font-black uppercase tracking-widest text-sm">Editar Reparto</h3>
                                    <button 
                                        type="button"
                                        onClick={addVoiceActor}
                                        className="text-[10px] bg-white/5 hover:bg-white/10 border border-white/10 px-3 py-1 rounded uppercase font-black transition"
                                    >
                                        + Añadir Actor
                                    </button>
                                </div>

                                {data.voice_actor_ids.map((actorId, index) => (
                                    <div key={index} className="flex gap-4 items-end bg-white/5 p-4 rounded-lg group">
                                        <div className="flex-1">
                                            <InputLabel value="Actor de Voz" className="text-[10px] text-gray-500 uppercase mb-1" />
                                            <select
                                                value={actorId}
                                                className="w-full bg-[#0B0B0B] border-white/10 text-sm text-white rounded-lg"
                                                onChange={(e) => handleVoiceActorChange(index, e.target.value)}
                                                required
                                            >
                                                <option value="">Seleccionar Actor</option>
                                                {voiceActors.map((va) => (
                                                    <option key={va.id} value={va.id}>{va.name}</option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="flex-1">
                                            <InputLabel value="Personaje" className="text-[10px] text-gray-500 uppercase mb-1" />
                                            <TextInput
                                                value={data.character_names[index]}
                                                className="w-full bg-[#0B0B0B] border-white/10 text-sm text-white rounded-lg"
                                                onChange={(e) => handleCharacterNameChange(index, e.target.value)}
                                                placeholder="Nombre del personaje"
                                                required
                                            />
                                        </div>
                                        <button 
                                            type="button"
                                            onClick={() => removeVoiceActor(index)}
                                            className="bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white p-2 rounded-lg transition"
                                        >
                                            ✕
                                        </button>
                                    </div>
                                ))}
                            </div>

                            <div className="flex justify-end gap-4">
                                <button
                                    type="submit"
                                    disabled={processing}
                                    className="px-12 py-4 bg-[#F47521] rounded-lg font-black text-black uppercase tracking-widest hover:bg-[#E56717] transition-all shadow-[0_4px_0_0_#d4621a] active:shadow-none active:translate-y-[2px]"
                                >
                                    Actualizar Episodio
                                </button>
                            </div>
                        </form>
                    </div>
                </section>
            </div>
        </>
    );
}
