import type { ReactNode } from "react";
import styles from "./Panel.module.css";

type PanelProps = {
  children: ReactNode;
};

function Panel({ children }: PanelProps) {
  return <section className={styles.panel}>{children}</section>;
}

export default Panel;