"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import ListCard from "./ListCard";
import InputForm from "./InputForm";

const PRList = () => {
  const [url, setUrl] = useState("");
  const [apiLink, setApiLink] = useState("");
  const [prjson, setPRjson] = useState([]);
  const [prState, setPrState] = useState("open");
  const [sort, setSort] = useState("created");

  // validate GitHub url
  const isValidUrl = (urlString) => {
    let urlPattern = new RegExp(
      "((git|ssh|http(s)?)|(git@[w.]+))(:(//)?)([w.@:/-~]+)(.git)(/)?"
    ); 
    return !!urlPattern.test(urlString);
  };

  // Handles submit button
  const handleSubmit = (e) => {
    e.preventDefault();
    let api = "";
    // checks and formats the GitHub URL to API URL
    if ( url && isValidUrl(url) && (url.substring(0, 5) === "https" || url.substring(0, 4) === "http"))  {
      if (url.substring(8, 11) === "www") {
        api = url.replace("www", "api");
        api = api.substring(0, 23) + "repos/" + api.substring(23);
      } else if (url.substring(7, 10) === "www") {
        api = url.replace("www", "api");
        api = api.substring(0, 22) + "repos/" + api.substring(22);
      } else {
        if (url.substring(0, 5) === "https") {
          api =
            url.substring(0, 8) +
            "api." +
            url.substring(8, 19) +
            "repos/" +
            url.substring(19);
        } else {
          api =
            url.substring(0, 7) +
            "api." +
            url.substring(7, 18) +
            "repos/" +
            url.substring(18);
        }
      }
      if (api.substring(api.length - 5) !== "pulls") {
        if (api.substring(api.length - 1) === "/") {
          api = api + "pulls";
        } else {
          api = api + "/pulls";
        }
      }
    } else {
      console.log("error");
      setPRjson({ error: "Please enter GitHub Repo link only" });
    }
    setApiLink(api);
  };

  // Fetches API
  useEffect(() => {
    const fetchPR = async () => {
      try {
        if (apiLink) {
          const response = await fetch(
            `${apiLink}?per_page=5&sort=${sort}&state=${prState}`
          );
          if (response.ok) {
            const responseBody = await response.json();
            const commentCounts = {};

            // To get Comments count
            await Promise.all(
              responseBody.map(async (pr) => {
                try {
                  const commentsResponse = await fetch(`${pr.comments_url}`);
                  if (commentsResponse.ok) {
                    const commentsBody = await commentsResponse.json();
                    commentCounts[pr.id] = commentsBody.length;
                  } else {
                    commentCounts[pr.id] = 0;
                  }
                } catch (error) {
                  commentCounts[pr.id] = 0;
                }
              })
            );
            const updatedPRjson = responseBody.map((pr) => ({
              ...pr,
              comment_count: commentCounts[pr.id],
            }));

            setPRjson(updatedPRjson);
          } else if (response.status === 403) {
            setPRjson({
              error:
                "Sorry! The current IP Location has exhausted the rate limit of 30 API requests per hour. Please try again later!",
            });
          }
        }
      } catch (error) {
        setPRjson({ error: "Something went wrong!" });
      }
    };
    fetchPR();
  }, [apiLink, sort, prState]);

  // To handle Sort filter
  const handleChangeFilter = (event) => {
    setSort(event.target.value);
  };
  // To handle Status filter
  const handlePRStateFilter = (event) => {
    setPrState(event.target.value);
  };

  return (
    <div className="w-full mobile:w-11/12 h-auto  flex flex-col justify-center items-center ">

      <InputForm
        setUrl={setUrl}
        sort={sort}
        prState={prState}
        prjson={prjson}
        handleChangeFilter={handleChangeFilter}
        handleSubmit={handleSubmit}
        handlePRStateFilter={handlePRStateFilter}
      />

      {Array.isArray(prjson) && prjson.length === 0 ? (
        <div> </div>
      ) : Array.isArray(prjson) ? (
        prjson.map((pr, key) => <ListCard pr={pr} key={key} />)
      ) : (
        <div className="text-center m-3 text-red-600">{prjson.error}</div>
      )}

    </div>
  );
};

export default PRList;
