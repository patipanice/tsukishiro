import React from "react";

interface QuoteProps {
  quote: string;
  author: string;
  id: string;
}

const BlockQuote: React.FC<QuoteProps> = ({ quote, author, id }) => {
  return (
    <blockquote className="text-center font-mono font-light">
      <p className="text-base">{quote}</p>
      <footer className="text-sm mt-3 text-gray-500">- {author}</footer>
      <footer className="text-[10px] mt-3 text-right text-gray-400">
        id : {id.substring(0, 5)}
      </footer>
    </blockquote>
  );
};

export default BlockQuote;
