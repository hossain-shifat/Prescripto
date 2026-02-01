export default function Button({ text, style = '', smd = false, rounded = false }) {
    return (
        <button
            className={`btn bg-[#5F6FFF] text-base-content ${style} ${smd ? '' : 'hidden md:block'} ${rounded ? 'rounded-full' : 'rounded-md'}`}
        >
            {text}
        </button>
    );
}
