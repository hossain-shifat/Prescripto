import Link from 'next/link';

export default function Button({ text, style = '', smd = false, rounded = false, href }) {
    const classes = `btn bg-[#5F6FFF] text-base-content ${style} ${smd ? '' : 'hidden md:block'} ${rounded ? 'rounded-full' : 'rounded-md'}`;

    if (href) {
        return (
            <Link href={href} className={classes}>
                {text}
            </Link>
        );
    }

    return (
        <button className={classes}>
            {text}
        </button>
    );
}
