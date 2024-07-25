export default function CardWrapper({ children }) {
    return (
        <div className="w-full rounded-lg shadow-lg p-3 md:p-10">
            {children}
        </div>
    );
}
