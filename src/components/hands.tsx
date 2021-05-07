import React, { useEffect, useState } from "react";
import { Hand } from "./hand";
import produce from "immer";
import "./hands.css";

type Fingers = [boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean, boolean];

const pointingDefault: Fingers = [false, false, false, false, false, false, false, false, false, false];

const keyboardValues: Record<string, number> = {
    "a": 0,
    "s": 1,
    "d": 2,
    "f": 3,
    "g": 4,
    "h": 5,
    "j": 6,
    "k": 7,
    "l": 8,
    ";": 9
}

const Hands = () => {
    const [pointing, setPointing] = useState(pointingDefault.map(v => !v));

    const onClick = (fIndex: number) => setPointing(p => {
        return produce(p, values => {
            values[fIndex] = !values[fIndex];
        })
    });

    const setValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        const binaryValue = Number(e.target.value).toString(2);
        const rightValues = String(binaryValue).split('').map(v => v === "1");
        const leftValues = Array(10 - rightValues.length).fill(false);

        setPointing([...leftValues, ...rightValues]);
    }

    useEffect(() => {
        document.addEventListener('keypress', e => {
            if (e.key in keyboardValues) {
                onClick(keyboardValues[e.key])
            }
        });
    }, []);

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
                    <Hand left extended={leftFingers} onClick={onClick} />
                </div>
                <div>
                    <Hand right extended={rightFingers} onClick={onClick} />
                </div>
            </article>
            <footer>
                <label>
                    Total
                    <input type="number" value={value} onChange={setValue} max={1023} />
                </label>
                <input type="range" value={value} min="0" max={1023} onChange={setValue} />
                <div className="keys">
                    {Object.keys(keyboardValues).map((v, i) => <span key={i}><b>{v}</b> {2 ** (9 - i)}</span>)}
                </div>
            </footer>
        </>
    );
}

export {Hands}