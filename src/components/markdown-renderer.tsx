import React, { FC } from "react";
import ReactMarkdown from "react-markdown/with-html";
import { APP_URL } from "../env";

interface Props {
  text: string;
}

const Markdown: FC<Props> = ({ text }) => {
  // turn /r/subreddit to link
  text = text.replace(
    new RegExp(/\/r\/[A-Za-z0-9_-]+/, "g"),
    `<a href="${APP_URL + "$&"}">$&</a>`
  );

  // turn /u/subreddit to link
  text = text.replace(
    new RegExp(/\/u\/[A-Za-z0-9_-]+/, "g"),
    `<a href="${"reddit.com" + "$&"}" target="_blank">$&</a>`
  );
  return <ReactMarkdown source={text} escapeHtml={false} />;
};

export default Markdown;
