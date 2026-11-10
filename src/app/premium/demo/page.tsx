import { localizeMetadata } from "@/lib/localization/metadata.server";
import type {Metadata} from 'next';
import PremiumScenarioDemo from '@/components/premium/PremiumScenarioDemo';

const sourceMetadata:Metadata={title:'Scenario comparison demo — TGPI',description:'Explore the Premium scenario comparison with clearly labelled fictional examples. No account data is used.'};

/** Public product demonstration. Personal scenario data remains behind the Premium API guard. */
export default function PremiumDemoPage(){return <PremiumScenarioDemo/>;}

export async function generateMetadata() { return localizeMetadata(sourceMetadata); }
