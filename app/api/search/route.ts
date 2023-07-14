import { PageResult, SearchParams } from "@/typings";
import { NextResponse } from "next/server";

export async function POST(request: Request) {

    // getting the body of the post inside of next.js 13 apis's is as follows:
    const {searchTerm, pages, ...params} = await request.json();
    const searchParams: SearchParams = params;

    if(!searchTerm) {
        return NextResponse.next (
            new Response("Missing search term", {
                status: 400,
            })
        );
        // return 400 server error if one can't get the desired search term
    }

    const filters: any = [];

    Object.entries(searchParams).forEach(([key,value]) => {
        if(value) {
            if(key == "max_price") {
                if((value = "1000+")) return;
            }

            filters.push({
                key,
                value: key === "sort_by" ? value: Number(value),
                // here either we choose price or convert a given String value of sortBy to Number
            });
        }
    });

    const response = await fetch('https://realtime.oxylabs.io/v1/queries', {
        method:'POST',
        headers: {
            'Content-Type':'application/json',
            Authorization: `Basic ${Buffer.from(process.env.OXYLABS_USERNAME + ':' + process.env.OXYLABS_PASSWORD)
        .toString("base64")}`,
        },

        // don't use cache to fetch value
        cache: 'no-store',
        body: JSON.stringify({
            source: "google_shopping_search",
            domain: "com",
            query: searchTerm,
            pages: Number(pages) || 1,
            parse: true,
            context: filters,

        }),
    });

    const data = await response.json();
    console.log(data)

    const pageResults: PageResult[] = data.results;

    return NextResponse.json(pageResults)
}