import { Job } from 'src/types';
import { t } from 'i18next';

export const getJobText = (job: Job) => {
  return `${t(`JOB_${job.jobCategory}`)}, ${job.jobName}`;
};
