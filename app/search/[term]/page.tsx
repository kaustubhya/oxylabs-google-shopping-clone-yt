// see search/[item] -> [item] means it is a wildcard i.e. it can be any value

import ResultsList from "@/components/ResultsList";
import { getFetchUrl } from "@/lib/getFetchUrl";
import { PageResult, SearchParams } from "@/typings";
import { redirect } from "next/navigation";

export const revalidate = 300;
// revalidate the cache after every some time

// this page is a server component

// to get min price max price and sort by params, use Props

type Props = {
    // any = type definition
    searchParams: SearchParams;
    params: {
        term: string; // [term]
    }
}
 
async function SearchPage({searchParams, params: {term} }: Props) {  // doing destructure and double destructure via {}
    // if no term, redirect user to home screen
    if(!term) {
        redirect("/")
    } 


    // fetch from API, Scrape from OxyLabs...
    const response = await fetch(getFetchUrl('api/search'), {
        method: "POST",
        body: JSON.stringify({ searchTerm: term, ...searchParams }),

    })

    const results = await response.json() as PageResult[];
    console.log(results);

    return <div>
     {/* ResultsList */}
     <ResultsList results = {results} term={term} />
    </div>;
  }
  
  export default SearchPage;