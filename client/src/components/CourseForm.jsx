import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import generateLesson from "../functions/generateLesson";

export default function CourseForm() {
  const [LessonDetails, setLessonDetails] = useState({
    topic: "",
    target_audience: "",
    difficulty: "",
    duration: "",
  });

  const [Response, setResponse] = useState("");
  const [loading, setLoading] = useState(false); // Loader state

  const difficultyLevels = [
    { label: "Beginner", value: "Beginner" },
    { label: "Intermediate", value: "Intermediate" },
    { label: "Advanced", value: "Advanced" },
  ];

  const handleChange = (field, value) => {
    setLessonDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("Submitted Course Details:", LessonDetails);
    setLoading(true);
    setResponse("");
    try {
      const text = await generateLesson(LessonDetails);
      setResponse(text);
    } catch (error) {
      console.error("Error generating lesson:", error);
      setResponse("Error generating lesson.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <style>
        {`
        .loader {
          border: 4px solid #e5e7eb;
          border-top: 4px solid #10b981;
          border-radius: 50%;
          width: 2.5rem;
          height: 2.5rem;
          animation: spin 0.8s linear infinite;
        }
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        `}
      </style>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* Form Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">
            Course Lesson Planner
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Topic
            </label>
            <InputText
              id="topic"
              value={LessonDetails.topic}
              onChange={(e) => handleChange("topic", e.target.value)}
              className="w-full"
              placeholder="Enter course topic"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Target Audience
            </label>
            <InputText
              id="audience"
              value={LessonDetails.target_audience}
              onChange={(e) => handleChange("target_audience", e.target.value)}
              className="w-full"
              placeholder="e.g. CSE Students, Grade 9 Students"
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Difficulty
            </label>
            <Dropdown
              id="difficulty"
              value={LessonDetails.difficulty}
              options={difficultyLevels}
              onChange={(e) => handleChange("difficulty", e.value)}
              className="w-full"
              placeholder="Select difficulty"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Duration
            </label>
            <InputText
              id="duration"
              value={LessonDetails.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="w-full"
              placeholder="e.g. 1 Day, 2 Weeks"
            />
          </div>

          <Button
            label="Generate Lesson"
            onClick={handleSubmit}
            className="w-full p-button-lg"
          />
        </div>

        {/* Markdown Preview Section */}
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-auto max-h-[90vh]">
          <h2 className="text-2xl font-bold mb-4 text-green-600">
            Lesson Output
          </h2>

          {loading ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-500">
              <span className="loader mb-4"></span>
              Generating lesson, please wait...
            </div>
          ) : Response ? (
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
                  <p
                    className="mb-3 text-gray-800 leading-relaxed"
                    {...props}
                  />
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
                  <img
                    className="my-4 rounded shadow-md max-w-full"
                    {...props}
                  />
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
              {Response}
            </ReactMarkdown>
          ) : (
            <p className="text-gray-500">
              Your generated lesson will appear here...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
