"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";
import { ALL_TEMPLATES } from "@/templates/all-templates";
import { PanelRight } from "lucide-react";
import { useState } from "react";
import { TemplatePreview } from "./template-preview";

export function TemplatesDrawer() {
    // 2. Add state to control the sheet's visibility
    const [isOpen, setIsOpen] = useState(false);
    const CloseDrawer = () => {
        setIsOpen(false);
    }

    return (
      // 4. Control the Sheet with the `open` and `onOpenChange` props
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            onClick={() => setIsOpen(true)} // Manually trigger open
            variant="outline"
            className="w-fit h-fit bg-orange-600/90 text-white p-0 py-1 border border-orange-500 text-xs rounded-[6px] hover:bg-orange-600/80 hover:text-white font-normal cursor-pointer"
          >
            <PanelRight className="w-4 h-4" />
            Templates
          </Button>
        </SheetTrigger>
  
        <SheetContent side="right" className="w-[400px] sm:max-w-[1000px] bg-input backdrop-blur-sm border-none px-2 rounded-l-sm pb-4">
          <div className="h-full flex flex-col gap-2">
            <SheetHeader className="w-full flex items-center justify-start">
              <div className="w-full flex flex-col border-b border-border/30 pb-2">
                <SheetTitle className="text-lg text-midnight-black font-normal">Templates</SheetTitle>
                <SheetDescription className="text-graphite font-light text-xs">
                  Select a template to get started.
                </SheetDescription>
              </div>
            </SheetHeader>
  
            <div className="w-full flex flex-1 flex-wrap px-5 text-zinc-300 overflow-scroll gap-4">
              {ALL_TEMPLATES.map((template, index) => (
                <div key={template.id} className="w-full flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-obsidian-black font-normal">{`${index + 1}. ${template.name}`}</p>
                  </div>
                  {/* 5. Pass the handler down as a prop */}
                  <TemplatePreview
                    templateJson={template.template}
                    closeDrawer={() => CloseDrawer()}
                  />
                </div>
              ))}
            </div>
          </div>
        </SheetContent>
      </Sheet>
    );
}