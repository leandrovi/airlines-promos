"use client";

import React from "react";
import { endOfDay, isSameDay, isWithinInterval, parseISO } from "date-fns";
import { Tweet } from "react-tweet";

import { TweetResult } from "@/types";
import { ScrollArea } from "./ui/scroll-area";
import { DatePickerWithRange } from "./date-range";
import { DateRange } from "react-day-picker";
import { components } from "./tweet-components";
import { Separator } from "./ui/separator";

interface PromotionsProps {
  promotions: TweetResult[];
}

export function Promotions({ promotions }: PromotionsProps) {
  const [filteredPromotions, setFilteredPromotions] =
    React.useState<TweetResult[]>(promotions);

  function handleDateChange(range: DateRange | undefined) {
    if (!range) return;

    const dateRange = {
      start: range.from ?? new Date(),
      end: endOfDay(range.to ?? new Date()),
    };

    setFilteredPromotions(
      promotions.filter((promotion) =>
        isWithinInterval(
          parseISO(promotion.publishedDate ?? new Date().toString()),
          dateRange
        )
      )
    );
  }

  return (
    <div className="w-full">
      <div className="pt-2 pb-4 flex flex-col items-left md:items-center md:flex-row gap-2">
        <p>Select a range:</p>
        <DatePickerWithRange onDateChange={handleDateChange} />
      </div>

      <ScrollArea className="h-screen max-h-[78.5vh]">
        {filteredPromotions.length > 0 ? (
          <div className="w-full max-w-4xl mx-auto">
            {filteredPromotions.map((promotion) => (
              <div key={promotion.id}>
                <div className="pt-10 pb-4 flex flex-col items-start justify-center w-full max-w-xl mx-auto">
                  <h6 className="mb-2 text-2xl font-medium leading-none text-primary">
                    <a href={promotion.url} target="_blank">
                      {promotion.tweetContent.title}
                    </a>
                  </h6>
                  <p className="mb-2 font-light text-md">
                    <a href={promotion.url} target="_blank">
                      {promotion.tweetContent.extract}
                    </a>
                  </p>
                  <Tweet
                    id={extractTweetId(promotion.url) ?? ""}
                    components={components}
                  />
                </div>

                <Separator />
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col h-full">
            <p className="text-2xl font-bold text-left">
              No promotions found for this date range 😢
            </p>
            <p className="text-left text-muted-foreground">
              Try selecting a different date range.
            </p>
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

function extractTweetId(url: string) {
  const regex = /\/status\/(\d+)/;
  const match = url.match(regex);

  if (match && match[1]) {
    return match[1];
  } else {
    return null;
  }
}
