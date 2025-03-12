import { PropsWithChildren } from "react";
import styles from "./styles.module.css";

interface PropertyListProps {
  spacing?: number;
}

export default async function Property({
  spacing = 1,
  children,
}: PropsWithChildren<PropertyListProps>) {
  return (
    <dl
      className={styles.propertyList}
      style={{ "--spacing": `${spacing}em` } as React.CSSProperties}>
      {children}
    </dl>
  );
}
