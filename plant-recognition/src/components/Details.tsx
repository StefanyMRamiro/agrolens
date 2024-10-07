
interface Props {
    title: string;
    content: string;
    open?: boolean;
}

function Details({content, title, open = false}: Props) {
    return (
        <div className="container mx-auto">
            <details className="p-4 [&_svg]:open:-rotate-180" open={open}>
                <summary className="flex cursor-pointer list-none items-center gap-4">
                <div>
                    <svg className="rotate-0 transform text-green-800 transition-all duration-300" fill="none" height="20" width="20" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24">
                        <polyline points="6 9 12 15 18 9"></polyline>
                    </svg>
                </div>
                <div><b>{title}</b></div>
                </summary>

                <p className="text-justify">{content}</p>
            </details>
        </div>
    )
}

export default Details;