
export default function Button({ text, style, smd, rounded }) {
    return (
        <div>
            <button className={`${style} btn btn-primary ${smd === true ? '' : 'hidden md:block'} ${rounded === true ? 'rounded-full' : 'rounded-md'}`}>{text}</button>
        </div>
    );
}
