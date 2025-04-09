import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import generateLesson from "../functions/generateLesson";
import { Pencil } from "lucide-react";
import MarkDown_Preview from "./MarkDown_Preview";
import MDEditor from "@uiw/react-md-editor";

export default function CourseForm() {
  const [LessonDetails, setLessonDetails] = useState({
    topic: "",
    target_audience: "",
    difficulty: "",
    duration: "",
  });

  const [editorVisible, setEditorVisible] = useState(false);
  const [editorContent, setEditorContent] = useState("");
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const text = await generateLesson(LessonDetails);
      setEditorContent(text);
      localStorage.setItem("lessonModules", JSON.stringify([text]));
      setEditorVisible(false);
    } catch (error) {
      console.error("Error generating lesson:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = () => {
    const storedModules =
      JSON.parse(localStorage.getItem("lessonModules")) || [];
    storedModules.push(editorContent);
    localStorage.setItem("lessonModules", JSON.stringify(storedModules));
    setEditorVisible(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
        {/* LEFT SIDE: FORM */}
        <div className="bg-white p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-6 text-blue-600">
            Course Lesson Planner
          </h2>

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Topic
            </label>
            <InputText
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
              value={LessonDetails.duration}
              onChange={(e) => handleChange("duration", e.target.value)}
              className="w-full"
              placeholder="e.g. 1 Day, 2 Weeks"
            />
          </div>

          <Button
            label="Generate Lesson"
            onClick={handleSubmit}
            className="w-full"
            loading={loading}
          />
        </div>

        {/* RIGHT SIDE: OUTPUT */}
        <div className="bg-white p-6 rounded-2xl shadow-xl overflow-auto max-h-[90vh]">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-bold mb-4 text-green-600">
              Lesson Output
            </h2>
            <Pencil
              className={`cursor-pointer ${
                !editorContent ? "opacity-30 cursor-not-allowed" : ""
              }`}
              onClick={() => {
                if (editorContent) setEditorVisible(true);
              }}
            />
          </div>

          {editorVisible ? (
            <>
              <div data-color-mode="light" className="mb-4">
                <MDEditor
                  value={editorContent}
                  onChange={setEditorContent}
                  height={300}
                />
              </div>
              <Button
                label="Save Lesson"
                onClick={handleSave}
                className="w-full"
              />
            </>
          ) : editorContent ? (
            <MarkDown_Preview markdown={editorContent} />
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
