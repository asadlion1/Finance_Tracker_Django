import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';
interface DrawerProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}
export function Drawer({
  isOpen,
  onClose,
  title,
  children,
  className
}: DrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  return <AnimatePresence>
      {isOpen && <>
          <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} exit={{
        opacity: 0
      }} onClick={onClose} className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
          <motion.div initial={{
        x: '100%'
      }} animate={{
        x: 0
      }} exit={{
        x: '100%'
      }} transition={{
        type: 'spring',
        damping: 20,
        stiffness: 300
      }} className={cn('fixed inset-y-0 right-0 z-50 w-full max-w-md border-l bg-background shadow-xl', className)}>
            <div className="flex h-full flex-col">
              <div className="flex items-center justify-between border-b px-6 py-4">
                <h2 className="text-lg font-semibold">{title}</h2>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto p-6">{children}</div>
            </div>
          </motion.div>
        </>}
    </AnimatePresence>;
}