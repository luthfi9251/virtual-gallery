export default function HTMLInjector({ children, content }) {
    return (
        <div
            dangerouslySetInnerHTML={{ __html: content }}
            className="px-2 rounded prose-h1:text-4xl prose-h2:text-2xl prose-h3:text-xl prose-h4:text-lg prose-headings:font-bold"
        >
            {children}
        </div>
    );
}
