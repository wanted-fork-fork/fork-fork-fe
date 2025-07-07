import { PropsWithChildren, ReactNode } from 'react';
import styles from './Accordion.module.css';
import { ArrowRight } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';

type AccordionProps = PropsWithChildren<{
  summary: ReactNode;
  initialOpen?: boolean;
  summaryClassName?: string;
}>;

export const Accordion = ({ summary, initialOpen = false, summaryClassName = '', children }: AccordionProps) => (
  <details open={initialOpen}>
    <summary className={`${styles.Summary} ${summaryClassName}`}>
      {summary}
      <span className={styles.SummaryMarker}>
        <ArrowRight color={Theme.color.neutral50} />
      </span>
    </summary>
    {children}
  </details>
);
