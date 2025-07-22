
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useUserStore } from "@/store/user-store";
import type { StoryMapTemplate } from "@/types/template";
import { BlockPreview } from "./block-preview";


interface TemplatePreviewProps {
  templateJson: StoryMapTemplate;
  closeDrawer: () => void;
}

export const TemplatePreview = ({ templateJson, closeDrawer }: TemplatePreviewProps) => {

    const { setSelectedTemplate, selectedTemplate } = useUserStore();

    const handleTemplateClick = () => {
        setSelectedTemplate({ id: templateJson.template_name, template: templateJson });
        closeDrawer();
    }

  return (
    <div 
      className="w-full bg-white rounded-sm border border-border/20 transition-all duration-300 cursor-pointer group overflow-hidden"
      onClick={handleTemplateClick}
    >

      {/* Template Preview */}
      <div className="w-full p-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 ">
          {templateJson.story_blocks.map((block) => (
              <BlockPreview block={block} />
          ))}
      </div>

      {/* Template Footer */}
      <div className="p-2 bg-gray-100 border-t border-gray-100">
        <div className="w-full flex items-center justify-between">
          <RadioGroup 
            value={selectedTemplate?.id || ""} 
            onValueChange={(value) => {
              if (value === templateJson.template_name) {
                 handleTemplateClick();
              }
            }}
          >
            <div className="flex items-center gap-2">
              <RadioGroupItem 
                value={templateJson.template_name} 
                id={`template-${templateJson.template_name}`} 
                className="w-3 h-3 shadow-sm border-border bg-white" 
              />
              <Label 
                htmlFor={`template-${templateJson.template_name}`} 
                className="text-xs font-light text-graphite cursor-pointer"
              >
                Use This Template
              </Label>
            </div>
          </RadioGroup>
          <span className="text-xs font-normal px-1 py-0.5 border-none text-graphite">
            {templateJson.story_blocks.length} blocks
          </span>
        </div>
      </div>
    </div>
  );
};
