import { PageHeader } from "@/components/shared/page-header";
import { VotingLocationFinder } from "@/components/shared/voting-location-finder";
import { MesaFinder } from "@/components/shared/mesa-finder";
import { BallotInstructions } from "@/components/shared/ballot-instructions";
import { SafetyChecklist } from "@/components/shared/safety-checklist";
import { LegalFramework } from "@/components/shared/legal-framework";

export default function ElectoresPage() {
  return (
    <div className="space-y-6 sm:space-y-8">
      <PageHeader
        title="Información para electores"
        description="Encuentra toda la información que necesitas para ejercer tu derecho al voto de manera informada y segura."
      />

      <div className="space-y-6 sm:space-y-8">
        <VotingLocationFinder />

        <MesaFinder />

        <BallotInstructions />

        <SafetyChecklist />

        <LegalFramework />
      </div>
    </div>
  );
}
