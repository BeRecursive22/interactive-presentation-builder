import { ALL_TEMPLATES } from "@/templates/all-templates";
import { X } from "lucide-react";
import { TemplatePreview } from "./template-preview";

interface TemplateSelectorProps {
  isOpen: boolean;
  onClose: () => void;
}

export const TemplateSelector = ({ isOpen, onClose }: TemplateSelectorProps) => {
  if (!isOpen) return null;
  
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50 flex-shrink-0">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Choose Your StoryMap Template</h2>
          <p className="text-gray-600 mt-1">Select a template that matches your storytelling needs</p>
        </div>
        <button
          onClick={onClose}
          className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
        >
          <X className="w-6 h-6 text-gray-500" />
        </button>
      </div>

      {/* Template Grid */}
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ALL_TEMPLATES.map((template) => (
            <TemplatePreview
              key={template.id}
              templateJson={template.template}
              closeDrawer={onClose}
            />
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 border-t border-gray-200 bg-gray-50 flex justify-between items-center flex-shrink-0">
        <div className="text-sm text-gray-500">
          {ALL_TEMPLATES.length} templates available
        </div>
        <button
          onClick={onClose}
          className="px-4 py-2 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};