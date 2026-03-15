import { auth } from "@/auth";
import { redirect } from "next/navigation";
import SpeakingSimulator from "@/components/features/SpeakingSimulator";

export default async function SpeakingLabPage() {
    const session = await auth();
    if (!session?.user?.id) redirect("/login");

    return (
        <div className="h-[80vh] w-full max-w-4xl mx-auto py-6">
            <SpeakingSimulator />
        </div>
    );
}
