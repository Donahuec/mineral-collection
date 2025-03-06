
import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface ResultGridProps {
    size?: number;
}

export default async function ResultGrid(props: PropsWithChildren<ResultGridProps>) {
    let size = props.size;
    return <ul className={styles.grid}>
        {props.children}
    </ul>
};

