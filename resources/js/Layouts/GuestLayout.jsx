export default function GuestLayout({ children }) {
    return (
        <div className="flex min-h-screen flex-col items-center bg-[#0B0B0B] pt-6 sm:justify-center sm:pt-0">
            <div className="mt-6 w-full overflow-hidden bg-[#23252b] px-10 py-12 shadow-2xl sm:max-w-md sm:rounded-none border border-white/5">
                {children}
            </div>
        </div>
    );
}
