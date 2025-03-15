import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface ResultGridProps {
  size?: number;
}

export default function ResultGrid(
  props: PropsWithChildren<ResultGridProps>
) {
  return <ul className={styles.grid}>{props.children}</ul>;
}
