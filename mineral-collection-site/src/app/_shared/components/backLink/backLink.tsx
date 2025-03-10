
import Link from "next/link";
import styles from "./styles.module.css";

interface BackLinkProps {
    title?: string;
    href: string;
}

export default async function BackLink({ title, href }: BackLinkProps) {
    return <Link className={styles.backLink} href={href}>← {title}</Link>;
};

