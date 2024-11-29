import React from 'react';

export function ColoredText({ text }: { text: string }) {
    const parseColoredText = (text: string) => {
        const regex = /&#([0-9A-F]{6})(.)(?:&l)?/g;
        const matches = [];
        let match;

        while ((match = regex.exec(text)) !== null) {
            matches.push({
                color: `#${match[1]}`,
                char: match[2],
                bold: text.slice(match.index + match[0].length - 2, match.index + match[0].length) === "&l",
            });
        }

        return matches;
    };

    const coloredChars = parseColoredText(text);

    return (
        <div style={{ display: 'flex', gap: '2px' }}>
            {coloredChars.map((item, index) => (
                <span
                    key={index}
                    style={{
                        color: item.color,
                        fontSize: 'xx-large',
                        fontWeight: item.bold ? 'bold' : 'normal',
                    }}
                >
                    {item.char}
                </span>
            ))}
        </div>
    );
}
