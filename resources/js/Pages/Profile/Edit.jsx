import { Head } from '@inertiajs/react';
import Header from '@/Components/Header';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import DeleteUserForm from './Partials/DeleteUserForm';

export default function Edit({ auth, mustVerifyEmail, status }) {
    return (
        <div className="min-h-screen bg-[#0B0B0B] text-white">
            <Head title="Ajustes de Perfil" />
            <Header auth={auth} />

            <main className="max-w-4xl mx-auto px-6 py-12">
                <h1 className="text-3xl font-black uppercase italic tracking-tighter border-l-4 border-[#F47521] pl-4 mb-10">
                    Ajustes de Cuenta
                </h1>

                <div className="space-y-10">
                    <div className="bg-[#121212] p-8 rounded-xl border border-white/5 shadow-xl">
                        <UpdateProfileInformationForm 
                            mustVerifyEmail={mustVerifyEmail} 
                            status={status} 
                        />
                    </div>

                    <div className="bg-[#121212] p-8 rounded-xl border border-white/5 shadow-xl">
                        <UpdatePasswordForm />
                    </div>

                    <div className="bg-[#121212] p-8 rounded-xl border border-red-900/20 shadow-xl">
                        <DeleteUserForm />
                    </div>
                </div>
            </main>
        </div>
    );
}
