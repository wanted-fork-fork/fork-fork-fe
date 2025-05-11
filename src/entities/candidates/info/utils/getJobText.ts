import { Job } from 'src/types';
import { TFunction } from 'i18next';

export const getJobText = (job: Job, t: TFunction) => {
  return `${t(`JOB_${job.jobCategory}`)}, ${job.jobName}`;
};
