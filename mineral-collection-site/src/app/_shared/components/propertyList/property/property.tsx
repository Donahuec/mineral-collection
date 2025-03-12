import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface PropertyProps {
  title?: string;
}

export default async function Property({
  title,
  children,
}: PropsWithChildren<PropertyProps>) {
  return (
    <div className={styles.property}>
      <dt className={styles.label}>{title}:</dt>
      <dd>{children}</dd>
    </div>
  );
}
