import type { Metadata } from "next";
import { org } from "@content/site";
import WalkScene from "@/components/walk/WalkScene";
import ProblemSection from "@/components/home/ProblemSection";
import WhatWeDo from "@/components/home/WhatWeDo";
import MoneyToLab from "@/components/home/MoneyToLab";
import ImpactStats from "@/components/home/ImpactStats";
import TrustSeal from "@/components/home/TrustSeal";
import PreviewStrips from "@/components/home/PreviewStrips";
import GetInvolved from "@/components/home/GetInvolved";

export const metadata: Metadata = {
  description: `${org.mission} ${org.name} is a ${org.taxStatus} nonprofit building computer labs in rural Indian schools.`,
};

export default function HomePage() {
  return (
    <>
      <WalkScene />
      <ProblemSection />
      <WhatWeDo />
      <MoneyToLab />
      <ImpactStats />
      <TrustSeal />
      <PreviewStrips />
      <GetInvolved />
    </>
  );
}
