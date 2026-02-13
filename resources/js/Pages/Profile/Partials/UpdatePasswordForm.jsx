import { useRef } from 'react';
import { useForm } from '@inertiajs/react';
import InputError from '@/Components/InputError';

export default function UpdatePasswordForm() {
    const passwordInput = useRef();
    const currentPasswordInput = useRef();

    const { data, setData, errors, put, reset, processing } = useForm({
        current_password: '',
        password: '',
        password_confirmation: '',
    });

    const updatePassword = (e) => {
        e.preventDefault();
        put(route('password.update'), {
            preserveScroll: true,
            onSuccess: () => reset(),
            onError: (errors) => {
                if (errors.password) {
                    reset('password', 'password_confirmation');
                    passwordInput.current.focus();
                }
                if (errors.current_password) {
                    reset('current_password');
                    currentPasswordInput.current.focus();
                }
            },
        });
    };

    return (
        <section>
            <header className="mb-6">
                <h2 className="text-lg font-bold text-[#F47521] uppercase">Cambiar Contraseña</h2>
                <p className="text-sm text-gray-500">Asegúrate de usar una contraseña larga y aleatoria para mantenerte seguro.</p>
            </header>

            <form onSubmit={updatePassword} className="space-y-6 max-w-xl">
                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Contraseña Actual</label>
                    <input
                        ref={currentPasswordInput}
                        value={data.current_password}
                        onChange={(e) => setData('current_password', e.target.value)}
                        type="password"
                        className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        autoComplete="current-password"
                    />
                    <InputError message={errors.current_password} className="mt-2" />
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Nueva Contraseña</label>
                    <input
                        ref={passwordInput}
                        value={data.password}
                        onChange={(e) => setData('password', e.target.value)}
                        type="password"
                        className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div>
                    <label className="text-[10px] font-bold text-gray-500 uppercase">Confirmar Contraseña</label>
                    <input
                        value={data.password_confirmation}
                        onChange={(e) => setData('password_confirmation', e.target.value)}
                        type="password"
                        className="w-full bg-[#0B0B0B] border-white/10 rounded-lg text-white focus:ring-[#F47521]"
                        autoComplete="new-password"
                    />
                    <InputError message={errors.password_confirmation} className="mt-2" />
                </div>

                <button
                    disabled={processing}
                    className="bg-[#F47521] text-black px-6 py-2 rounded font-black uppercase text-xs hover:bg-[#ff8533] transition disabled:opacity-50"
                >
                    Actualizar Contraseña
                </button>
            </form>
        </section>
    );
}
