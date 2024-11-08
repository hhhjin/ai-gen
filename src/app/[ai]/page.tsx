import { Ideogram } from "@/components/ideogram/ideogram";
import { OpenAi } from "@/components/openai/openai";
import { Recraft } from "@/components/recraft/recraft";
import { redirect } from "next/navigation";

export default function AiPage({ params }: { params: { ai: string } }) {
  if (params.ai === "openai") {
    return <OpenAi />;
  }
  if (params.ai === "recraft") {
    return <Recraft />;
  }
  if (params.ai === "ideogram") {
    return <Ideogram />;
  }
  return redirect("/");
}
