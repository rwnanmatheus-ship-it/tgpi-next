import type {Metadata} from 'next';
import PremiumScenarioDemo from '@/components/premium/PremiumScenarioDemo';

export const metadata:Metadata={title:'Scenario comparison demo — TGPI',description:'Explore the Premium scenario comparison with clearly labelled fictional examples. No account data is used.'};

/** Public product demonstration. Personal scenario data remains behind the Premium API guard. */
export default function PremiumDemoPage(){return <PremiumScenarioDemo/>;}
