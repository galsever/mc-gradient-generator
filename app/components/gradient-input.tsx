import {DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Flex, Flex2, FlexCol2, Input} from "next-util-cmps";
import {HexColorPicker} from "react-colorful";

export function GradientInput({color, setColor}: {color: string, setColor: (color: string) => void}) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Flex className="p-2 rounded border w-72 border-zinc-700 hover:cursor-pointer transition-all duration-300">
                    <Flex2 className="items-center">
                        <div className="h-5 w-5 rounded" style={{backgroundColor: color}} />
                        <p className="font-medium">{color}</p>
                    </Flex2>
                </Flex>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <FlexCol2 className="p-3">
                    <HexColorPicker color={color} onChange={setColor} />
                    <Input value={color} onChange={e => {
                        setColor(e.target.value);
                    }} />
                </FlexCol2>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}