import { useForm, usePage } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function UpdateProfileInformation({ mustVerifyEmail, status }) {
    const user = usePage().props.auth.user;
    const { data, setData, patch, errors, processing } = useForm({
        name: user.name,
        email: user.email,
    });

    const submit = (e) => {
        e.preventDefault();
        patch(route('profile.update'));
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-[#F47521] uppercase">Información del Perfil</h2>
                <p className="text-sm text-gray-500">Actualiza tu nombre de usuario y correo electrónico.</p>
            </header>

            <form onSubmit={submit} className="space-y-6 max-w-xl">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Nombre</label>
                    <input
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        required
                    />
                    <InputError message={errors.name} className="mt-2" />
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Email</label>
                    <input
                        type="email"
                        value={data.email}
                        onChange={(e) => setData('email', e.target.value)}
                        className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        required
                    />
                    <InputError message={errors.email} className="mt-2" />
                </div>

                <button
                    disabled={processing}
                    className="bg-[#F47521] text-black px-6 py-2 rounded font-black uppercase text-xs hover:bg-[#ff8533] transition disabled:opacity-50"
                >
                    Guardar Cambios
                </button>
            </form>
        </section>
    );
}
