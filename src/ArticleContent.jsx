import ReactMarkdown from 'react-markdown';

const headingComponents = {
    h1: ({ children, ...props }) => <h2 {...props}>{children}</h2>,
    h2: ({ children, ...props }) => <h3 {...props}>{children}</h3>,
    h3: ({ children, ...props }) => <h4 {...props}>{children}</h4>,
    h4: ({ children, ...props }) => <h5 {...props}>{children}</h5>,
    h5: ({ children, ...props }) => <h6 {...props}>{children}</h6>,
    h6: ({ children, ...props }) => <h6 {...props}>{children}</h6>
};

function normalizeLegacyNumberedSections(content) {
    const lines = content.split(/\r?\n/);
    const normalizedLines = [];

    for (let index = 0; index < lines.length; index += 1) {
        const numberedHeading = lines[index].trim().match(/^\*\*(\d+)\.\s+(.+)\*\*$/);
        if (!numberedHeading) {
            normalizedLines.push(lines[index]);
            continue;
        }

        normalizedLines.push(`${numberedHeading[1]}. **${numberedHeading[2]}**`);
        const descriptionLines = [];
        index += 1;

        while (index < lines.length) {
            if (/^\*\*\d+\.\s+.+\*\*$/.test(lines[index].trim()) || /^#{1,6}\s/.test(lines[index].trim())) {
                index -= 1;
                break;
            }
            descriptionLines.push(lines[index].trim());
            index += 1;
        }

        while (descriptionLines.length && !descriptionLines[descriptionLines.length - 1]) {
            descriptionLines.pop();
        }

        normalizedLines.push(...descriptionLines.map((line) => line ? `   ${line}` : '   '));
    }

    return normalizedLines.join('\n');
}

export default function ArticleContent({ content = '', className = 'article-body' }) {
    return (
        <div className={className}>
            <ReactMarkdown components={headingComponents}>
                {normalizeLegacyNumberedSections(content)}
            </ReactMarkdown>
        </div>
    );
}
