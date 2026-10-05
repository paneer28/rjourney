// Figures on "The bigger picture" page (/why-we-exist/the-bigger-picture).
// Update these when new data is published: the figure, the line beneath it,
// the source, and the source's URL. The blocks show in this order, colored
// orange, yellow, orange. Only use figures from a published source.

export interface Statistic {
  figure: string; // shown large, exactly as written
  text: string; // one line beneath the figure
  source: string;
  url: string;
}

export const statistics: Statistic[] = [
  {
    figure: '1 in 31',
    text: 'children aged 8 in the United States has been identified with ASD.',
    source: 'CDC, Autism and Developmental Disabilities Monitoring Network. 2022 data, published 2025.',
    url: 'https://www.cdc.gov/autism/data-research/',
  },
  {
    figure: '61.8 million',
    text: 'people worldwide are estimated to be on the autism spectrum. That is about 1 in every 127.',
    source: 'Global Burden of Disease Study 2021, published in The Lancet Psychiatry.',
    url: 'https://healthdata.org/research-analysis/library/global-epidemiology-and-health-burden-autism-spectrum-findings-global',
  },
  {
    figure: '1 in 150',
    text: 'was the United States figure when the CDC began counting in 2000.',
    source: 'CDC, Autism and Developmental Disabilities Monitoring Network.',
    // TODO: confirm with owner: the brief gave no URL for this figure; this is
    // the same CDC data page as the first figure, which covers the network's reports.
    url: 'https://www.cdc.gov/autism/data-research/',
  },
];
