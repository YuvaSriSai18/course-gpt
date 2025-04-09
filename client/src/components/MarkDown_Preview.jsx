import React from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function MarkDown_Preview({ markdown }) {
  return (
    <>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1: ({ node, ...props }) => (
            <h1
              className="text-3xl font-bold mt-4 mb-2 text-gray-800"
              {...props}
            />
          ),
          h2: ({ node, ...props }) => (
            <h2
              className="text-2xl font-semibold mt-4 mb-2 text-gray-700"
              {...props}
            />
          ),
          p: ({ node, ...props }) => (
            <p className="mb-3 text-gray-800 leading-relaxed" {...props} />
          ),
          ul: ({ node, ...props }) => (
            <ul
              className="list-disc list-inside ml-5 mb-3 text-gray-700"
              {...props}
            />
          ),
          ol: ({ node, ...props }) => (
            <ol
              className="list-decimal list-inside ml-5 mb-3 text-gray-700"
              {...props}
            />
          ),
          li: ({ node, ...props }) => <li className="mb-1" {...props} />,
          img: ({ node, ...props }) => (
            <img className="my-4 rounded shadow-md max-w-full" {...props} />
          ),
          table: ({ node, ...props }) => (
            <table
              className="table-auto border-collapse border border-gray-300 w-full my-4"
              {...props}
            />
          ),
          thead: ({ node, ...props }) => (
            <thead className="bg-gray-100" {...props} />
          ),
          th: ({ node, ...props }) => (
            <th
              className="border border-gray-300 px-4 py-2 text-left"
              {...props}
            />
          ),
          td: ({ node, ...props }) => (
            <td className="border border-gray-300 px-4 py-2" {...props} />
          ),
          code: ({ node, inline, className, children, ...props }) =>
            inline ? (
              <code
                className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
                {...props}
              >
                {children}
              </code>
            ) : (
              <pre className="bg-gray-900 text-white p-3 rounded overflow-auto my-4">
                <code {...props}>{children}</code>
              </pre>
            ),
        }}
      >
        {markdown}
      </ReactMarkdown>
    </>
  );
}
