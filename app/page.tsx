'use client'

import {useState} from "react";
import {Center, Flex, FlexCol, FlexCol3, Input, Xl4} from "next-util-cmps";
import {GradientInput} from "@/app/components/gradient-input";
import {convert} from "@/app/logic/gradient";
import clsx from "clsx";
import {ColoredText} from "@/app/components/colored-text";

export default function Home() {
    const [first, setFirst] = useState('#ff0000');
    const [second, setSecond] = useState('#ffffff');
    const [input, setInput] = useState("")
    const [copied, setCopied] = useState<boolean>(false)

    return (
        <Center>
            <FlexCol className="gap-10 w-[60rem]">
                <Xl4 className="font-bold">MC-Gradient Creator</Xl4>
                <Flex className="gap-10">
                    <FlexCol3>
                        <GradientInput color={first} setColor={setFirst} />
                        <GradientInput color={second} setColor={setSecond} />
                        <Input onKeyDown={async e => {
                            if (e.key === "Enter") {
                                await copy()
                            }
                        }} placeholder={"Input..."} value={input} onChange={e => {
                            setInput(e.target.value);
                        }} />
                    </FlexCol3>
                    <FlexCol>
                        <ColoredText text={convert(input, first, second)} />
                        <div onClick={async () => {
                            await copy()
                        }} className={clsx("w-[45rem] hover:bg-zinc-600/5 duration-150 transition-all cursor-pointer rounded-lg border border-zinc-800 p-2 h-24 break-words whitespace-pre-wrap overflow-auto", {
                            "border-green-500/50": copied
                        })}>
                            {convert(input, first, second)}
                        </div>
                    </FlexCol>
                </Flex>
            </FlexCol>
        </Center>
    );

    async function copy() {
        await navigator.clipboard.writeText(convert(input, first, second).replaceAll("\n", ""))
        setCopied(true)
        setTimeout(() => {
            setCopied(false)
        }, 1000)
    }
}
