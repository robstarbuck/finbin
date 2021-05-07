import React, { useEffect, useState } from "react";
import { Hand } from "./hand";
import produce from "immer";
import "./hands.css";

type Fingers = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

const pointingDefault: Fingers = [true, true, true, true, true, true, true, true, true, true];

const Hands = () => {
    const [pointing, setPointing] = useState<Fingers>(pointingDefault);

    const onClick = (fingerIndex: number) => setPointing(previous => {
        return produce(previous, values => {
            values[fingerIndex] = !values[fingerIndex];
        })
    });

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const binaryValue = Number(e.target.value).toString(2);

        const values = String(binaryValue).split('').map(v => v === "1");
        const padding = Array<boolean>(10 - values.length).fill(false);
        const fingers = [...padding, ...values] as Fingers;
        setPointing(fingers);
    }

    const leftFingers = [
        pointing[0], // Thumb
        pointing[1],
        pointing[2],
        pointing[3],
        pointing[4],
    ] as const;

    const rightFingers = [
        pointing[5],
        pointing[6],
        pointing[7],
        pointing[8],
        pointing[9], // Thumb
    ] as const;

    const value = parseInt(pointing.map(Number).join(''), 2);

    return (
        <>
            <article>
                <div>
                    <Hand left pointing={leftFingers} onClick={onClick} />
                </div>
                <div>
                    <Hand right pointing={rightFingers} onClick={onClick} />
                </div>
                <footer>
                    <input type="range" value={value} min="0" max={1023} onChange={setValue} />
                    <label>
                        <input type="number" value={value} onChange={setValue} max={1023} />
                    </label>
                </footer>
            </article>
        </>
    );
}

export {Hands}