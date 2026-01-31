export default function Button({ text, style = '', smd = false, rounded = false }) {
    return (
        <button
            className={`btn btn-primary ${style} ${smd ? '' : 'hidden md:block'} ${rounded ? 'rounded-full' : 'rounded-md'}`}
        >
            {text}
        </button>
    );
}
