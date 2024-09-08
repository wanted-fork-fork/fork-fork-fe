import { PropsWithChildren } from 'react';
import styles from './Accordion.module.css';
import { ArrowRight } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';

type AccordionProps = PropsWithChildren<{
  summary: string;
  initialOpen?: boolean;
}>;

export const Accordion = ({ summary, initialOpen = false, children }: AccordionProps) => (
  <details open={initialOpen}>
    <summary className={styles.Summary}>
      {summary}
      <span className={styles.SummaryMarker}>
        <ArrowRight color={Theme.color.neutral50} />
      </span>
    </summary>
    {children}
  </details>
);
