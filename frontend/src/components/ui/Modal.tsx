import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { Button } from './Button';
import { cn } from '../../lib/utils';
interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}
export function Modal({
  isOpen,
  onClose,
  title,
  description,
  children,
  className
}: ModalProps) {
  // Lock body scroll when modal is open
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
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div initial={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} animate={{
          opacity: 1,
          scale: 1,
          y: 0
        }} exit={{
          opacity: 0,
          scale: 0.95,
          y: 20
        }} transition={{
          duration: 0.2
        }} className={cn('w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg pointer-events-auto', className)}>
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold">{title}</h2>
                  {description && <p className="text-sm text-muted-foreground">
                      {description}
                    </p>}
                </div>
                <Button variant="ghost" size="icon" onClick={onClose}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <div>{children}</div>
            </motion.div>
          </div>
        </>}
    </AnimatePresence>;
}