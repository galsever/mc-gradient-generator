import { safeParse } from "next-utils-sever";
import {specialCharacters} from "@/app/logic/characters";

export const base16To10Map = new Map(
    [..."ABCDEF"].map((char, index) => [char, 10 + index])
);

function convertToBase10(base16: string): number[] {
    return [...base16].map(char => {
        const parsed = safeParse(char) ?? parseInt(char, 16);
        if (!isNaN(parsed)) return parsed;

        const value = base16To10Map.get(char.toUpperCase());
        if (value === undefined) throw new Error(`Invalid hex character: ${char}`);
        return value;
    });
}

function toRGB(hex: string): { red: number; green: number; blue: number } {
    const [r1, r2, g1, g2, b1, b2] = convertToBase10(hex);
    return {
        red: r1 * 16 + r2,
        green: g1 * 16 + g2,
        blue: b1 * 16 + b2,
    };
}

function toGradient(fakeSteps: number, firstHex: string, secondHex: string): {
    red: number;
    green: number;
    blue: number;
}[] {
    const steps = fakeSteps - 1;
    const firstRGB = toRGB(firstHex);
    const secondRGB = toRGB(secondHex);

    const stepPerColor = {
        red: (secondRGB.red - firstRGB.red) / steps,
        green: (secondRGB.green - firstRGB.green) / steps,
        blue: (secondRGB.blue - firstRGB.blue) / steps,
    };

    const gradient: {
        red: number;
        green: number;
        blue: number;
    }[] = [];
    for (let i = 0; i < fakeSteps; i++) {
        const newRgb = {
            red: Math.round(firstRGB.red + stepPerColor.red * i),
            green: Math.round(firstRGB.green + stepPerColor.green * i),
            blue: Math.round(firstRGB.blue + stepPerColor.blue * i),
        };
        gradient.push(newRgb);
    }
    return gradient;
}


function toHex(rgb: {
    red: number,
    green: number,
    blue: number,
}) {
    const toHexComponent = (value: number) =>
        value.toString(16).padStart(2, "0").toUpperCase();

    return `${toHexComponent(rgb.red)}${toHexComponent(rgb.green)}${toHexComponent(rgb.blue)}`;
}

export function convert(text: string, firstHex: string, secondHex: string): string {
    const steps = text.length

    const gradientAsRGB = toGradient(steps, firstHex.replaceAll("#", ""), secondHex.replaceAll("#", ""));
    const gradient = gradientAsRGB.map(rgb => toHex(rgb))

    const list = Array.from({ length: steps }, (_, i) => {
        const hex = gradient[i]
        const char = text.charAt(i)

        return `&#${hex}${specialCharacters.get(char.toLowerCase()) ?? char}`
    });
    return list.join("")
}