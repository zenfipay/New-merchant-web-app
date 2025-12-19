'use client'

import React, { useState, useRef, useEffect, createContext, useContext } from 'react';
import { ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';



interface SelectContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  onValueChange?: (value: string) => void;
}

const SelectContext = createContext<SelectContextType | undefined>(undefined);

const useSelectContext = () => {
  const context = useContext(SelectContext);
  if (!context) {
    throw new Error('Select components must be used within a Select provider');
  }
  return context;
};


interface SelectProps {
  children: React.ReactNode;
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
}

function MajiSelect({ children, value, onValueChange, defaultValue = '' }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);

  return (
    <SelectContext.Provider value={{ isOpen, setIsOpen, selectedValue, setSelectedValue, onValueChange }}>
      <div className="relative">
        {children}
      </div>
    </SelectContext.Provider>
  );
}


interface SelectTriggerProps {
  children: React.ReactNode;
  className?: string;
}

function MajiSelectTrigger({ children, className = '' }: SelectTriggerProps) {
  const { isOpen, setIsOpen } = useSelectContext();

  return (
    <button
      onClick={() => setIsOpen(!isOpen)}
      className={className}
    >
      {children}
      <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>
  );
}


interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

function MajiSelectValue({ placeholder = 'Select an option', className = '' }: SelectValueProps) {
  const { selectedValue } = useSelectContext();

  return (
    <span className={className}>
      {selectedValue || placeholder}
    </span>
  );
}


interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

function MajiSelectContent({ children, className = '' }: SelectContentProps) {
  const { isOpen, setIsOpen } = useSelectContext();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (dropdownRef.current && !dropdownRef.current.contains(target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, setIsOpen]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          ref={dropdownRef}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
}

function MajiSelectItem({ children, value, className = '' }: SelectItemProps) {
  const { setSelectedValue, setIsOpen, onValueChange } = useSelectContext();

  const handleSelect = () => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <button
      onClick={handleSelect}
      className={className}
    >
      {children}
    </button>
  );
}

export { MajiSelect, MajiSelectTrigger, MajiSelectValue, MajiSelectContent, MajiSelectItem}


// "use client"

// import * as React from "react"
// import * as SelectPrimitive from "@radix-ui/react-select"
// import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from "lucide-react"
// import { motion, AnimatePresence } from 'framer-motion';

// import { cn } from "@/lib/utils"

// function MajiSelect({
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Root>) {
//   return <SelectPrimitive.Root data-slot="select" {...props} />
// }

// function MajiSelectGroup({
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Group>) {
//   return <SelectPrimitive.Group data-slot="select-group" {...props} />
// }

// function MajiSelectValue({
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Value>) {
//   return <SelectPrimitive.Value data-slot="select-value" {...props} />
// }

// function MajiSelectTrigger({
//   className,
//   size = "default",
//   children,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
//   size?: "sm" | "default"
// }) {
//   return (
//     <SelectPrimitive.Trigger
//       data-slot="select-trigger"
//       data-size={size}
//       className={cn(
//         " cursor-pointer",
//         className
//       )}
//       {...props}
//     >
//       {children}
//       <SelectPrimitive.Icon asChild>
//         <ChevronDownIcon className="size-4 opacity-50" />
//       </SelectPrimitive.Icon>
//     </SelectPrimitive.Trigger>
//   )
// }

// function MajiSelectContent({
//   className,
//   children,
//   position = "popper",
//   align = "center",
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Content>) {
//   return (
//     <SelectPrimitive.Portal>
//       <SelectPrimitive.Content
//         data-slot="select-content"
//         className={cn(
//           "",
//           position === "popper" &&
//             "",
//           className
//         )}
//         position={position}
//         align={align}
//         {...props}
//       >
//         <MajiSelectScrollUpButton />
//         <SelectPrimitive.Viewport
//           className={cn(
//             "p-1",
//             position === "popper" &&
//               ""
//           )}
//         >
//           {children}
//         </SelectPrimitive.Viewport>
//         <MajiSelectScrollDownButton />
//       </SelectPrimitive.Content>
//     </SelectPrimitive.Portal>
//   )
// }

// function MajiSelectLabel({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Label>) {
//   return (
//     <SelectPrimitive.Label
//       data-slot="select-label"
//       className={cn("", className)}
//       {...props}
//     />
//   )
// }

// function MajiSelectItem({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Item>) {
//   return (
//     <SelectPrimitive.Item
//       data-slot="select-item"
//       className={cn(
//         "",
//         className
//       )}
//       {...props}
//     >
//       <span className="">
//         <SelectPrimitive.ItemIndicator>
//           <CheckIcon className="size-4" />
//         </SelectPrimitive.ItemIndicator>
//       </span>
//       <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
//     </SelectPrimitive.Item>
//   )
// }

// function MajiSelectSeparator({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.Separator>) {
//   return (
//     <SelectPrimitive.Separator
//       data-slot="select-separator"
//       className={cn("", className)}
//       {...props}
//     />
//   )
// }

// function MajiSelectScrollUpButton({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
//   return (
//     <SelectPrimitive.ScrollUpButton
//       data-slot="select-scroll-up-button"
//       className={cn(
//         "",
//         className
//       )}
//       {...props}
//     >
//       <ChevronUpIcon className="size-4" />
//     </SelectPrimitive.ScrollUpButton>
//   )
// }

// function MajiSelectScrollDownButton({
//   className,
//   ...props
// }: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
//   return (
//     <SelectPrimitive.ScrollDownButton
//       data-slot="select-scroll-down-button"
//       className={cn(
//         "",
//         className
//       )}
//       {...props}
//     >
//       <ChevronDownIcon className="size-4" />
//     </SelectPrimitive.ScrollDownButton>
//   )
// }

// export {
//   MajiSelect,
//   MajiSelectContent,
//   MajiSelectGroup,
//   MajiSelectItem,
//   MajiSelectLabel,
//   MajiSelectScrollDownButton,
//   MajiSelectScrollUpButton,
//   MajiSelectSeparator,
//   MajiSelectTrigger,
//   MajiSelectValue,
// }
