import axios from "axios";

import { PromotionsResponse } from "@/types";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { Promotions } from "@/components/promotions";

const baseUrl = process.env.NEXT_PUBLIC_API_URL as string;

export default async function Home() {
  const { data } = await axios.get<PromotionsResponse>(`${baseUrl}/promotions`);
  const promotions = data.data;

  return (
    <main className="h-full flex-1 flex-col gap-4 p-8 flex">
      <div className="flex items-center justify-between space-y-2 gap-x-2">
        <div className="flex flex-col gap-y-2 sm:gap-y-0">
          <h2 className="text-2xl font-bold tracking-tight">
            Welcome to the Airlines Promos ✈️
          </h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of the top promotions found on X (a.k.a. Twitter)
            during the past 7 days:
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <ModeToggle />
        </div>
      </div>

      <Promotions promotions={promotions} />

      <div className="fixed right-8 bottom-6">
        <p className="text-xs text-gray-400">
          Made with ❤️ by{" "}
          <a
            className="underline"
            href="https://github.com/leandrovi"
            target="_blank"
          >
            leandrovi
          </a>
        </p>
      </div>
    </main>
  );
}
