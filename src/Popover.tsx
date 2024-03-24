import * as React from 'react';
import {useState, useEffect, useRef, FC} from 'react';
import styles from './Popover.module.css';
import { createPortal } from "react-dom";
import {PopoverProps} from "./types";

const popoverOffset = 10;

const Popover: FC<PopoverProps> = ({
                                     triggerElement,
                                     content,
                                     position,
                                     onClick,
                                     onHover,
                                     onClosed,
                                     closeOnClickOutside = true,
                                         }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [popoverPosition, setPopoverPosition] = useState<{ top: number; left: number, opacity: number }>({
        top: 0,
        left: 0,
        opacity: 0
    });
    const popoverRef = useRef<HTMLDivElement | null>(null);

    const calculatePopoverPosition = () => {
        const triggerRect = (triggerElement as unknown as HTMLElement).getBoundingClientRect();
        const popoverRect = popoverRef.current?.getBoundingClientRect();


        if (triggerRect && popoverRect) {
            let top = triggerRect.bottom;
            let left = triggerRect.left;

            if (position === 'top') {
                top = triggerRect.top - popoverRect.height - popoverOffset;
            } else if (position === 'bottom') {
                top = triggerRect.bottom;
            } else if (position === 'left') {
                left = triggerRect.left - popoverRect.width - popoverOffset;
            } else if (position === 'right') {
                left = triggerRect.right;
            }

            setPopoverPosition({top, left, opacity: 1});
        }
    };

    useEffect(() => {
        if (isOpen) {
            calculatePopoverPosition();
        }
    }, [isOpen]);

    useEffect(() => {

        const handleOutsideClick = (event: Event) => {
            if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                if (onClosed) {
                    onClosed();
                }
            }
        };

        const onScroll = () => {
            setIsOpen(false);
        }

        const openPopover = (event: Event) => {
            event.preventDefault();
            event.stopImmediatePropagation();
            setIsOpen(!isOpen);
        }

        if (!isOpen && onClick) {
            triggerElement?.addEventListener('click', openPopover);
        }

        if (!isOpen && onHover) {
            triggerElement?.addEventListener('hover', openPopover);
        }

        if (isOpen) {
            if (closeOnClickOutside) {
                document.addEventListener('click', handleOutsideClick);
            }
            document.addEventListener('scroll', onScroll, true);
        }

        return () => {
            document.removeEventListener('click', handleOutsideClick);
            document.removeEventListener('scroll', onScroll, true);
            triggerElement?.removeEventListener('click', openPopover);
            triggerElement?.removeEventListener('hover', openPopover)
        };
    }, [isOpen, closeOnClickOutside, triggerElement]);


    return createPortal(<>
        {isOpen && (
            <div className={styles.popoverOverlay}>
                <div
                    ref={popoverRef}
                    className={`${styles.popover} popover-container`}
                    style={{
                        top: popoverPosition.top,
                        left: popoverPosition.left,
                        opacity: popoverPosition.opacity
                    }}>
                    {content}
                </div>
            </div>
        )}
    </>, document.body);
};


export default Popover;